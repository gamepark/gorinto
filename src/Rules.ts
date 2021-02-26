import {GameWithIncompleteInformation, SequentialGame, shuffle, WithAutomaticMoves} from '@gamepark/workshop'
import { elementDeck } from './cards/Elements'
import { Goals } from './cards/Goals'
import { keyElementCards } from './cards/KeyElement'
// import Element from './types/Element'
import ElementTile from './types/ElementTile'
import Game from './types/Game'
import GameView, { isGame } from './types/GameView'
import KeyElementCard from './types/KeyElementCard'
import Move from './types/Move'
import MoveType from './types/MoveType'
import { MoveView } from './types/MoveView'
import Player from './types/Player'
import PlayerColor from './types/PlayerColor'
import { isRefillPathsView, refillPaths } from './types/RefillPaths'

type GameType = SequentialGame<Game, Move, PlayerColor>
  & WithAutomaticMoves<Game, Move>
  & GameWithIncompleteInformation<Game, Move, PlayerColor, GameView, MoveView>

// @ts-ignore
const GorintoRules: GameType = {
  setup(): Game {
    const game = {
      season:1,
      players:setupPlayers(),
      activePlayer:PlayerColor.black,
      twoKeyElementCards : setupTwoKeyElementCards(),
      twoGoals : setupTwoGoals(),
      elementTilesDeck : setupElementTilesDeck(),
      horizontalPath : [],
      verticalPath : [],
      mountainBoard : []
    }

    // REMPLIR MOUNTAIN

    return game

  },
  getPlayerIds(game: Game): PlayerColor[] {
    console.log(game)
    return [];
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
    if ((game.horizontalPath.length === 0 && game.verticalPath.length === 0)) {
      return refillPaths() ;
      
    }
    // // game start and we have to setup the moutain.
    // if (game.mountainBoard.length === 0){
    //   setupMountain(game);
    // }

    return
    
  },

  getLegalMoves(game: Game): Move[] {
    console.log(game)
    return [];
  },

  play(move: Move | MoveView, game: Game | GameView, playerId: PlayerColor): void {
    console.log(move)
    console.log(game)
    console.log(playerId)

    switch (move.type){
      case 'REFILL_PATHS' : 
        
        if (isGame(game)){
          console.log(game.elementTilesDeck);
          game.horizontalPath = game.elementTilesDeck.splice(0,5);
          game.verticalPath = game.elementTilesDeck.splice(0,5);
          console.log(game.horizontalPath);
        } else if (isRefillPathsView(move)) {

          game.horizontalPath = move.horizontalPath
          game.verticalPath = move.verticalPath

        }
        break    

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
    {color:PlayerColor.black, understanding:{void:0,wind:0,fire:0,water:0,earth:0}, score:0},
    {color:PlayerColor.white, understanding:{void:0,wind:0,fire:0,water:0,earth:0}, score:0}
  ] 
    
}

function setupTwoKeyElementCards():KeyElementCard[] {
  const result = shuffle(keyElementCards);
  return[result[0], result[1]];
}

function setupTwoGoals():number[] {
  const arrayGoalCards : number[] = shuffle(Array.from(Goals.keys()));
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
  const result = shuffle(Array.from(elementDeck))
  return result;
}

// function filledSpacesinPaths(game:Game):number {
//   let countEmpty = 0;
//   for (let i = 0; i < game.horizontalPath.length;i++){
//     if (game.horizontalPath[i].element !== Element.Earth    // Don't know a way to shorten the code here
//       && game.horizontalPath[i].element !==Element.Fire     // === "" return an error
//       && game.horizontalPath[i].element !==Element.Void
//       && game.horizontalPath[i].element !==Element.Water
//       && game.horizontalPath[i].element !==Element.Wind){
//         countEmpty=+1;
//     }
//   }

//   for (let i = 0; i < game.verticalPath.length;i++){
//     if (game.verticalPath[i].element !== Element.Earth      // Same here
//       && game.verticalPath[i].element !==Element.Fire
//       && game.verticalPath[i].element !==Element.Void
//       && game.verticalPath[i].element !==Element.Water
//       && game.verticalPath[i].element !==Element.Wind){
//         countEmpty=+1;
//     }
//   }
//   return countEmpty;
// }

// function refillPaths(game:Game):void {
//   const hResult:ElementTile[] = [];
//   const vResult:ElementTile[] = [];
//   for (let i=0; i<5;i++){
//     if(game.elementTilesDeck.length !== 0){
//       hResult.push(game.elementTilesDeck.pop() !);    // Exclamation point in order to escaped
//     }                                                // the "pop undefined" issue
//     else{
//       console.log("error : Empty Deck ! Can't refill Paths !")
//     }                                                       
//   }                                                  
//   for (let i=0; i<5;i++){
//     if(game.elementTilesDeck.length !== 0){
//       vResult.push(game.elementTilesDeck.pop() !);    // same here
//     } else{
//       console.log("error : Empty Deck ! Can't refill Paths")
//     } 
//   }

//   game.horizontalPath = hResult;
//   game.verticalPath = vResult;

// }

// function setupMountain(game:Game):void {
//   let i, j : number = 0;
//   for (i = 0 ; i < 5 ; i++){
//     game.mountainBoard[i] = [];
//     for (j = 0 ; j < 5 ; j++){
//       game.mountainBoard[i][j] = [];
//       game.mountainBoard[i][j][0] = game.elementTilesDeck.pop() !;    // Escaped the "pop undefined" issue
//       game.mountainBoard[i][j][1] = game.elementTilesDeck.pop() !;    // Same
//     }
//   }
//   for (i = 1 ; i < 4 ; i++){
//     for (j = 1 ; j < 4 ; j++){
//       game.mountainBoard[i][j][2] = game.elementTilesDeck.pop() !;      // Same
//     }
//   }
//   game.mountainBoard[2][2][3] = game.elementTilesDeck.pop() !;         // Same
// }

export default GorintoRules