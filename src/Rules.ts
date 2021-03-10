import {GameWithIncompleteInformation, SequentialGame, shuffle, WithAutomaticMoves} from '@gamepark/workshop'
import { elementDeck } from './cards/Elements'
import { Goals } from './cards/Goals'
import { Keys } from './cards/KeyElement'
import ElementTile from './types/ElementTile'
import Game from './types/Game'
import GameView, { isGame } from './types/GameView'
import Move from './types/Move'
import MoveType from './types/MoveType'
import { MoveView } from './types/MoveView'
import Player from './types/Player'
import PlayerColor from './types/PlayerColor'
import { isRefillPathsView, refillPaths } from './moves/RefillPaths'
import MoveTile from './moves/MoveTile'
import TakeTile from './moves/TakeTile'
import Element from './types/Element'
import AutomaticMovePhase from './types/AutomaticMovePhase'
import { moveSeasonMarker } from './moves/MoveSeasonMarker'
import { countGoals } from './moves/CountGoals'
import { switchFirstPlayer } from './moves/SwitchFirstPlayer'
import { cantPickAnyTile } from './moves/CantPickAnyTile'
import { determineWinner } from './moves/DetermineWinner'
import { countKeys } from './moves/CountKeys'
import { removeTileOnPath } from './moves/RemoveTileOnPath'


type GameType = SequentialGame<Game, Move, PlayerColor>
  & WithAutomaticMoves<Game, Move>
  & GameWithIncompleteInformation<Game, Move, PlayerColor, GameView, MoveView>

// @ts-ignore
const GorintoRules: GameType = {
  setup(): Game {
    const game:Game = {
      season:1,                 // Don't start at 4, even for debug
      players:setupPlayers(),
      activePlayer:PlayerColor.black,
      twoKeyElementCards : setupTwoKeyElementCards(),
      twoGoals : setupTwoGoals(),
      elementTilesDeck : setupElementTilesDeck(),
      horizontalPath : [],
      verticalPath : [],
      mountainBoard : [],
      automaticMovePhase : undefined
    }

    game.players = setupIsFirstPlayer(game);
    game.mountainBoard = setupMountain(game);

    return game

  },
  getPlayerIds(game: Game): PlayerColor[] {
    console.log(game)
    return game.players.map(player => player.color);
  },
  getPlayerName(playerId: PlayerColor, t: (name: string) => string): string {
    switch (playerId) {
      case PlayerColor.white:
        return t('White Player')
      case PlayerColor.black:
        return t('Black Player')
      case PlayerColor.red:
        return t('Red Player')
      case PlayerColor.yellow:
        return t('Yellow Player')
    }
  },
  getActivePlayer(game: Game): PlayerColor | undefined { 
    return game.activePlayer;
  },

  getAutomaticMove(game : Game){
    
    // (game start and we have to setup the paths) | (there's not enough tiles on the paths to make a whole game turn)
    
    if (isGame(game) && (game.tilesToTake === undefined)){

      if (((game.horizontalPath.length === 0 && game.verticalPath.length === 0) 
      || ((filledSpacesinPaths(game) === 0) && (game.players.length === 2))
      || ((filledSpacesinPaths(game) === 1) && (game.players.length === 3))
      || ((filledSpacesinPaths(game) === 2) && (game.players.length === 4)))
      && (game.automaticMovePhase === undefined) && (game.activePlayer)) {
        return refillPaths() ;
      }
      
      if (game.players.length === 2 && [2,4,6,8].includes(filledSpacesinPaths(game))) {           // Adaptation for 2 players
        let twoPaths : (ElementTile | null) [] = game.horizontalPath.concat(game.verticalPath)
        let randomSpaceToRemove : number = getRandomInt(10);
        while (twoPaths[randomSpaceToRemove] === null){
          randomSpaceToRemove = getRandomInt(10);
        }
        return removeTileOnPath(randomSpaceToRemove) ;
      }

      if (game.automaticMovePhase === AutomaticMovePhase.movingSeasonMarker){
        return moveSeasonMarker() ;
      } else if (game.automaticMovePhase === AutomaticMovePhase.countingGoals){
        return countGoals() ;
      } else if (game.automaticMovePhase === AutomaticMovePhase.switchingFirstPlayer){
        return switchFirstPlayer() ;
      } else if (game.automaticMovePhase === AutomaticMovePhase.countingKeys){
        return countKeys();
      } else if (game.automaticMovePhase === AutomaticMovePhase.determiningWinner){
        return determineWinner();
      }

    }

    if (game.tilesToTake !== undefined && game.tilesToTake.coordinates.length === 0){
      console.log("on CantPickTile");
      return cantPickAnyTile();
    }

    return
    
  },

  getLegalMoves(game: Game): Move[] {
    console.log(game)

    if(game.tilesToTake === undefined){
      const moves : MoveTile[] = [];
      for(let x = 0;x<5;x++){
        for (let y = 0 ; y<5;y++){
          if (game.horizontalPath[x]){
            moves.push({type:MoveType.MoveTile, path:"horizontal", x, y});
          }
          if (game.verticalPath[y]){
            moves.push({type:MoveType.MoveTile, path:"vertical", x, y});
          }
        }
      }
      return moves;
    } else {

      const takes : TakeTile[] = [];
      for (let i = 0 ; i < game.tilesToTake.coordinates.length ; i++){

        if (game.tilesToTake.element !== Element.Earth){
          takes.push({type:MoveType.TakeTile, coordinates:{x:game.tilesToTake.coordinates[i].x,y:game.tilesToTake.coordinates[i].y}});
        } else {
          for (let z = 0 ; z < game.mountainBoard[game.tilesToTake.coordinates[i].x][game.tilesToTake.coordinates[i].y].length-1;z++){
            takes.push({type:MoveType.TakeTile, coordinates:{x:game.tilesToTake.coordinates[i].x,y:game.tilesToTake.coordinates[i].y,z}});
          }
          console.log(takes);
        }        
      
      }
      
      return takes
      
    }
    
  },

  play(move: Move | MoveView, game: Game | GameView, playerId: PlayerColor): void {
    console.log(move)
    console.log(game)
    console.log(playerId)

    switch (move.type){

      case MoveType.CantPickAnyTile : {

        console.log("Il n'y a pas de coup jouable. La main passe au joueur suivant.");

        const activePlayer : number = game.players.findIndex(player => player.color === game.activePlayer)!;
        const nextPlayerIndex :number = (activePlayer + 1) % game.players.length;
        game.activePlayer = game.players[nextPlayerIndex].color;

        game.tilesToTake = undefined ;
        console.log("Fin du tour !");

        break

      }

      case MoveType.RefillPaths : {

        if (game.season === 4){
          game.automaticMovePhase = AutomaticMovePhase.movingSeasonMarker;
        } else {
          if (isGame(game)){

            if (game.horizontalPath.length !== 0){
              game.automaticMovePhase = AutomaticMovePhase.movingSeasonMarker
            }
            game.horizontalPath = game.elementTilesDeck.splice(0,5);
            game.verticalPath = game.elementTilesDeck.splice(0,5);
          } else if (isRefillPathsView(move)) {
  
            game.horizontalPath = move.horizontalPath
            game.verticalPath = move.verticalPath
  
          }
        }
        
        break

      }

      case MoveType.RemoveTileOnPath : {

        console.log("Mode 2 joueurs : une tuile au hasard est retirée des chemins !");

        if (move.index < 5){
          game.horizontalPath[move.index] = null;
        } else {
          game.verticalPath[move.index-5] = null;
        }

        break

      }

      case MoveType.MoveSeasonMarker : {

        if (game.season === 4){
          game.activePlayer = undefined ;
        } else {
          game.season ++ ;
        }

        game.automaticMovePhase = AutomaticMovePhase.countingGoals;

        break

      }

      case MoveType.CountGoals : {

        for (let i = 0; i<game.twoGoals.length;i++){
          for (let j = 0 ; j<game.players.length;j++){
            const understandings : number[] = [game.players[j].understanding.void, game.players[j].understanding.wind, game.players[j].understanding.fire, game.players[j].understanding.water, game.players[j].understanding.earth];
            
            switch (game.twoGoals[i]){
              
              case 0 : {

                for (let k = 0 ; k<5 ; k++){
                  const understandingsComparative : number[] = Array.from(understandings);
                  understandingsComparative.splice(k,1);
                  if (understandings[k] === understandingsComparative[0] 
                    || understandings[k] === understandingsComparative[1] 
                    || understandings[k] === understandingsComparative[2]
                    || understandings[k] === understandingsComparative[3]){
                      game.players[j].score = game.players[j].score + understandings[k];
                  }
                }

                break
              }
              case 1 : {

                for (let k = 0 ; k<5 ; k++){
                  const understandingsComparative : number[] = Array.from(understandings);
                  understandingsComparative.splice(k,1);
                  if (understandings[k] !== understandingsComparative[0] 
                    && understandings[k] !== understandingsComparative[1] 
                    && understandings[k] !== understandingsComparative[2]
                    && understandings[k] !== understandingsComparative[3]){
                      game.players[j].score  = game.players[j].score + understandings[k];
                  }
                }
  
                break
              }
              case 2 : {

                for (let k = 0 ; k<5 ; k++){
                  if (understandings[k] % 2 === 1){
                      game.players[j].score = game.players[j].score + understandings[k];
                  }
                }
  
                break
              }
              case 3 : {

                for (let k = 0 ; k<5 ; k++){
                  if (understandings[k] % 2 === 0){
                      game.players[j].score = game.players[j].score + understandings[k];
                  }
                }
  
                break
              }
              case 4 : {

                const maxsUnderstandings : number[] = [0,0,0,0,0]
                for (let k = 0 ; k < game.players.length;k++){
                  if (maxsUnderstandings[0] < game.players[k].understanding.void){
                    maxsUnderstandings[0] = game.players[k].understanding.void;
                  }
                  if (maxsUnderstandings[1] < game.players[k].understanding.wind){
                    maxsUnderstandings[1] = game.players[k].understanding.wind;
                  }
                  if (maxsUnderstandings[2] < game.players[k].understanding.fire){
                    maxsUnderstandings[2] = game.players[k].understanding.fire;
                  }
                  if (maxsUnderstandings[3] < game.players[k].understanding.water){
                    maxsUnderstandings[3] = game.players[k].understanding.water;
                  }
                  if (maxsUnderstandings[4] < game.players[k].understanding.earth){
                    maxsUnderstandings[4] = game.players[k].understanding.earth;
                  }
                }

                for (let k = 0 ; k<5 ; k++){
                  if (understandings[k] === maxsUnderstandings[k]){
                      game.players[j].score = game.players[j].score + 3;
                  }
                }
  
                break
              }
              case 5 : {

                const minsUnderstandings : number[] = [101,101,101,101,101]       //Maximum of tiles +1
                for (let k = 0 ; k < game.players.length;k++){
                  if ((minsUnderstandings[0] > game.players[k].understanding.void) && (game.players[k].understanding.void !== 0) ){
                    minsUnderstandings[0] = game.players[k].understanding.void;
                  }
                  if ((minsUnderstandings[1] > game.players[k].understanding.wind) && (game.players[k].understanding.wind !== 0) ){
                    minsUnderstandings[1] = game.players[k].understanding.wind;
                  }
                  if ((minsUnderstandings[2] > game.players[k].understanding.fire) && (game.players[k].understanding.fire !== 0) ){
                    minsUnderstandings[2] = game.players[k].understanding.fire;
                  }
                  if ((minsUnderstandings[3] > game.players[k].understanding.water) && (game.players[k].understanding.water !== 0) ){
                    minsUnderstandings[3] = game.players[k].understanding.water;
                  }
                  if ((minsUnderstandings[4] > game.players[k].understanding.earth) && (game.players[k].understanding.earth !== 0) ){
                    minsUnderstandings[4] = game.players[k].understanding.earth;
                  }
                }

                for (let k = 0 ; k<5 ; k++){
                  if (understandings[k] === minsUnderstandings[k]){
                      game.players[j].score = game.players[j].score + 3;
                  }
                }
  
                break
              }
              case 6 : {

                const sortedUnderstandings : number[] = (Array.from(understandings)).sort((a,b) => a-b);
                for (let k = 0 ; k < 5 ; k++){
                  if (understandings[k] !== sortedUnderstandings[2]){
                    game.players[j].score = game.players[j].score + understandings[k];
                  }
                }
  
                break
              }
              case 7 : {

                const sortedUnderstandings : number[] = (Array.from(understandings)).sort((a,b) => a-b);
                game.players[j].score = game.players[j].score + (sortedUnderstandings[2]*3);
  
                break
              }
              case 8 : {

                const sortedUnderstandings : number[] = (Array.from(understandings)).sort((a,b) => a-b);
                const max : number = sortedUnderstandings[4];
                const min : number = sortedUnderstandings[0];

                for (let k = 0 ; k < 5 ; k++){
                  if (understandings[k] === min || understandings[k] === max){
                    game.players[j].score = game.players[j].score + understandings[k];
                  }
                }

  
                break
              }
              case 9 : {

                const sortedUnderstandings : number[] = (Array.from(understandings)).sort((a,b) => a-b);
                const max : number = sortedUnderstandings[4];
                let min : number = 101;
                for (let k = 0 ; k < 5 ; k++){
                  if (sortedUnderstandings[k] > 0 && sortedUnderstandings[k] < min){
                    min = sortedUnderstandings[k];
                  }
 
                }
                game.players[j].score = game.players[j].score + (max + 2*min);
  
                break
              }
              case 10 : {

                const sortedUnderstandings : number[] = (Array.from(understandings)).sort((a,b) => a-b);
                const difference : number = sortedUnderstandings[4] - sortedUnderstandings[0];
                game.players[j].score = game.players[j].score + (difference*2);
  
                break
              }
              case 11 : {

                const shortestStack : number = (Array.from(understandings)).sort((a,b) => a-b)[0];
                if (shortestStack !== 0){
                  game.players[j].score = game.players[j].score + (shortestStack*7);
                }
  
                break
              }
            }
  
          }

          }

        if (game.season === 4 && game.activePlayer === undefined){
          game.automaticMovePhase = AutomaticMovePhase.countingKeys;
        } else {
          game.automaticMovePhase = AutomaticMovePhase.switchingFirstPlayer;
        } 

        break
      }

      case MoveType.SwitchFirstPlayer : {

        let firstPlayerNumber:number = 0;
        let smallestScore:number = 101;
        

        for (let i = 0 ; i<game.players.length ; i++){
          if (game.players[i].isFirst){
            firstPlayerNumber = i;
            game.players[i].isFirst = false;
            break
          }
        }

        for (let i = firstPlayerNumber ; i < firstPlayerNumber + game.players.length ; i++){
          if (game.players[i%game.players.length].score < smallestScore){
            smallestScore = game.players[i%game.players.length].score;
          }
        }

        for (let i = firstPlayerNumber ; i < firstPlayerNumber + game.players.length ; i++){
          if (game.players[i%game.players.length].score === smallestScore){
           game.players[i%game.players.length].isFirst = true;
           game.activePlayer = game.players[i%game.players.length].color;
           break;
          }
        }  

        game.automaticMovePhase = undefined;

        break

      }

      case MoveType.CountKeys : {

        for (let i = 0; i<game.twoKeyElementCards.length;i++){
          for (let j = 0 ; j<game.players.length;j++){
            const understandings : number[] = [game.players[j].understanding.void, game.players[j].understanding.wind, game.players[j].understanding.fire, game.players[j].understanding.water, game.players[j].understanding.earth];
            
            switch (game.twoKeyElementCards[i]){
              
              case 0 : {
                game.players[j].score = game.players[j].score + 2*understandings[0];
                break
              }
              case 1 : {
                game.players[j].score = game.players[j].score + 2*understandings[1];
                break
              }
              case 2 : {
                game.players[j].score = game.players[j].score + 2*understandings[2];
                break
              }
              case 3 : {
                game.players[j].score = game.players[j].score + 2*understandings[3];
                break
              }
              case 4 : {
                game.players[j].score = game.players[j].score + 2*understandings[4];
                break
              }
              
            }
          }
        }

        game.automaticMovePhase = AutomaticMovePhase.determiningWinner;
        
        break

      }

      case MoveType.DetermineWinner : {

        console.log("Fin de la partie !");

        let maxScore : number = 0;
        let minTiles : number = 101;
        let winners : Player[] = [];

        for (let i = 0 ; i < game.players.length ; i++){
          if (game.players[i].score >= maxScore){
            if (game.players[i].score > maxScore){
              maxScore = game.players[i].score;
              minTiles = tilesOwnedByAPlayer(game.players[i]);
            } else {
              if (tilesOwnedByAPlayer(game.players[i]) < minTiles){
                minTiles = tilesOwnedByAPlayer(game.players[i]);
              }
            }
          }
        }

        console.log("MaxScore : ",maxScore, ", minTiles : ",minTiles)

        for (let i = 0 ; i < game.players.length ; i++){

          if(game.players[i].score === maxScore && tilesOwnedByAPlayer(game.players[i]) === minTiles){
            winners.push(game.players[i]);
          }

        }
        console.log(winners)

        if (winners.length === 1){
          console.log(winners[0].color+" remporte la partie avec "+winners[0].score+" points de sagesse !");
        } else {
          console.log("Les joueurs partagent une victoire harmonieuse !");
        }

        game.automaticMovePhase = undefined;

        break

      }

      case MoveType.MoveTile : {

        const element = move.path === "horizontal" ? game.horizontalPath[move.x] : game.verticalPath[move.y];

          game.mountainBoard[move.x][move.y].push(element!);

          if (move.path === "horizontal"){
            game.horizontalPath[move.x] = null;
          } else {
            game.verticalPath[move.y] = null;
          }

          // game.tilesToTakes

          let activePlayer : Player = game.players.find(player => player.color === game.activePlayer)!;

          const elem : Element | undefined = element?.element;

          switch(elem){       // One Pattern is required for each element
            case 'void' : {
              game.tilesToTake = {quantity : activePlayer.understanding.void +1,
                   coordinates : [{x:move.x+1,y:move.y+1}, {x:move.x+1,y:move.y-1}, {x:move.x-1,y:move.y+1}, {x:move.x-1,y:move.y-1}],    // Void Pattern
                   element : elem}

              game.tilesToTake.coordinates = game.tilesToTake.coordinates.filter(coord => ((coord.x>-1 && coord.x<5) && (coord.y>-1 && coord.y<5)));    // Filtering tiles out of the board  

              break
            }
            case 'wind' : {
              game.tilesToTake = {quantity : activePlayer.understanding.wind +1,
                   coordinates : [{x:move.x+1,y:move.y}, {x:move.x-1,y:move.y}, {x:move.x,y:move.y+1}, {x:move.x,y:move.y-1}],      // Wind Pattern
                   element : elem}

              game.tilesToTake.coordinates = game.tilesToTake.coordinates.filter(coord => ((coord.x>-1 && coord.x<5) && (coord.y>-1 && coord.y<5)));    // Filtering tiles out of the board

              break
            }
            case 'fire' : {
              const firePattern : {x:number, y:number}[] = [{x:move.x,y:0},{x:move.x,y:1},{x:move.x,y:2},{x:move.x,y:3},{x:move.x,y:4}];
              firePattern.splice(move.y,1); 
              game.tilesToTake = {quantity : activePlayer.understanding.fire +1,
                coordinates : firePattern,
                element : elem}
                break
            }
            case 'water' : {
              const waterPattern : {x:number, y:number}[] = [{x:0,y:move.y},{x:1,y:move.y},{x:2,y:move.y},{x:3,y:move.y},{x:4,y:move.y}];
              waterPattern.splice(move.x,1);
              game.tilesToTake = {quantity : activePlayer.understanding.water +1,
                coordinates : waterPattern,
                element : elem}
                break
            }
            case 'earth' : {
              game.tilesToTake = {quantity : activePlayer.understanding.earth +1,
                coordinates : [{x:move.x,y:move.y}],
                element : elem}
                break
            }
          }

          game.tilesToTake?.coordinates.forEach(coord => 
            {
              if (game.mountainBoard[coord.x][coord.y].length === 0){
                game.tilesToTake?.coordinates.splice(game.tilesToTake.coordinates.indexOf(coord),1);
              }
            }
          )

          if (game.tilesToTake?.element === Element.Earth){
            if (game.mountainBoard[game.tilesToTake.coordinates[0].x][game.tilesToTake.coordinates[0].y].length === 1){
              game.tilesToTake.coordinates.splice(0,1)
            }
          }

          break

      }

      case MoveType.TakeTile : {

        let elem : Element | undefined = undefined

        if (move.coordinates.z === undefined){
          elem = game.mountainBoard[move.coordinates.x][move.coordinates.y][game.mountainBoard[move.coordinates.x][move.coordinates.y].length-1]?.element;
        } else {
          elem = game.mountainBoard[move.coordinates.x][move.coordinates.y][move.coordinates.z].element;
        }

        let activePlayer : number = game.players.findIndex(player => player.color === game.activePlayer)!;

        if (game.tilesToTake?.element !== Element.Earth){
          game.mountainBoard[move.coordinates.x][move.coordinates.y].pop();
        } else {
          game.mountainBoard[move.coordinates.x][move.coordinates.y].splice(move.coordinates.z!,1);
        }

        switch (elem){
          case 'void' : {
            game.players[activePlayer].understanding.void ++;
            break;
          }
          case 'wind' : {
            game.players[activePlayer].understanding.wind ++;
            break;
          }
          case 'fire' : {
            game.players[activePlayer].understanding.fire ++;
            break;
          }
          case 'water' : {
            game.players[activePlayer].understanding.water ++;
            break;
          }
          case 'earth' : {
            game.players[activePlayer].understanding.earth ++;
            break;
          }
        }

        game.tilesToTake!.quantity -- ;

        if (game.tilesToTake?.element !== 'earth'){
          game.tilesToTake?.coordinates.splice(game.tilesToTake.coordinates.findIndex(coord => (coord.x === move.coordinates.x) && (coord.y === move.coordinates.y)), 1);
        }

        if ((game.tilesToTake!.quantity === 0) || (game.tilesToTake?.coordinates.length === 0) || ((game.tilesToTake?.element === 'earth') && (game.mountainBoard[move.coordinates.x][move.coordinates.y].length === 1)) ){
          game.tilesToTake = undefined ;
          console.log("Fin du tour !");

          const nextPlayerIndex = (activePlayer + 1) % game.players.length
          game.activePlayer = game.players[nextPlayerIndex].color

        }


      }

    }

  },

  getView(game: Game): GameView{

    const {elementTilesDeck, ...view} = game ;
    return view

  },

  getMoveView(move:Move, _:PlayerColor ,game:Game):MoveView {

    switch(move.type){
      case MoveType.RefillPaths:
        return {...move, horizontalPath:game.horizontalPath, verticalPath:game.verticalPath};

      default :
        return move
    }

  }



}

function setupPlayers():Player[] {
  return[
    {color:PlayerColor.black, understanding:{void:0,wind:0,fire:0,water:0,earth:0}, score:0, isFirst:true},
    {color:PlayerColor.white, understanding:{void:0,wind:0,fire:0,water:0,earth:0}, score:0, isFirst:false} 
  ] 
    
}

function setupIsFirstPlayer(game:Game):Player[] {
  let result : Player[] = game.players;
  for (let i=0;i<game.players.length;i++){
    if (result[i].color === game.activePlayer){
      result[i].isFirst = true;
    } else {
      result[i].isFirst = false;
    }
  }
  return result
}

function setupTwoKeyElementCards():number[] {
  const result : number[] = shuffle(Array.from(Keys.keys()));     // Take only the key, not all infos with heavy pictures
  return[result[0], result[1]];
}

function setupTwoGoals():number[] {
  const arrayGoalCards : number[] = shuffle(Array.from(Goals.keys()));    // Take only the key, not all infos with heavy pictures
  const result : number[] = [];
  const conflictLetters : string[] = [];
  arrayGoalCards.forEach(element => {
    const goal = Goals[element]

    if (goal.conflictLetter === ""){
      result.push(element);
    }
    else if (conflictLetters.includes(goal.conflictLetter) === false){
      result.push(element);
    }
  });

  return [result[0],result[1]]; 

}

function setupElementTilesDeck():ElementTile[] {
  const result = shuffle(Array.from(elementDeck))           // Modifier ici avec .keys()
  return result;
}

function setupMountain(game:Game):ElementTile[][][] {
  let i, j : number = 0;
  let result : ElementTile[][][] = [];
  for (i = 0 ; i < 5 ; i++){
    result[i] = [];
    for (j = 0 ; j < 5 ; j++){
      result[i][j] = [];
      result[i][j][0] = game.elementTilesDeck.pop() !;    // Escaped the "pop undefined" issue
      result[i][j][1] = game.elementTilesDeck.pop() !;    // Same
    }
  }
  for (i = 1 ; i < 4 ; i++){
    for (j = 1 ; j < 4 ; j++){
      result[i][j][2] = game.elementTilesDeck.pop() !;      // Same
    }
  }
  result[2][2][3] = game.elementTilesDeck.pop() !;         // Same
  return result;
}

function filledSpacesinPaths(game:Game):number {

  return game.horizontalPath.reduce((sum, space) => space ? sum+1 : sum, 0) + 
         game.verticalPath.reduce((sum, space) => space ? sum+1 : sum, 0)
}

function tilesOwnedByAPlayer(player:Player):number{

  return player.understanding.void + player.understanding.wind + player.understanding.fire + player.understanding.water + player.understanding.earth

}

function getRandomInt(max:number):number{
  return Math.floor(Math.random() * Math.floor(max));
}

export default GorintoRules