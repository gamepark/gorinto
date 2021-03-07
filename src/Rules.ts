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


type GameType = SequentialGame<Game, Move, PlayerColor>
  & WithAutomaticMoves<Game, Move>
  & GameWithIncompleteInformation<Game, Move, PlayerColor, GameView, MoveView>

// @ts-ignore
const GorintoRules: GameType = {
  setup(): Game {
    const game:Game = {
      season:1,
      players:setupPlayers(),
      activePlayer:PlayerColor.black,                 // The real setup is below, this is a fake
      twoKeyElementCards : setupTwoKeyElementCards(),
      twoGoals : setupTwoGoals(),
      elementTilesDeck : setupElementTilesDeck(),
      horizontalPath : [],
      verticalPath : [],
      mountainBoard : []
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
    if ((game.horizontalPath.length === 0 && game.verticalPath.length === 0) || (filledSpacesinPaths(game) < game.players.length)) {
      return refillPaths() ;
      
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
      case MoveType.RefillPaths : {
        
        if (isGame(game)){
          console.log ("dans le RefillPath : ")
          game.horizontalPath = game.elementTilesDeck.splice(0,5);
          game.verticalPath = game.elementTilesDeck.splice(0,5);
        } else if (isRefillPathsView(move)) {

          game.horizontalPath = move.horizontalPath
          game.verticalPath = move.verticalPath

        }
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

        if ((game.tilesToTake!.quantity === 0) || (game.tilesToTake?.coordinates.length === 0)){
          game.tilesToTake = undefined ;
          console.log("Fin du tour !");
          //game.activePlayer = game.players[activePlayer + 1].color ;

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

export default GorintoRules