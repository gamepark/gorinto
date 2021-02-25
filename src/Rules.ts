import {SequentialGame, shuffle, WithAutomaticMoves} from '@gamepark/workshop'
import { elementDeck } from './cards/Elements'
import { GoalCards } from './cards/GoalCards'
import { keyElementCards } from './cards/KeyElement'
import Element from './types/Element'
import ElementTile from './types/ElementTile'
import Game from './types/Game'
import GoalCard from './types/GoalCard'
import KeyElementCard from './types/KeyElementCard'
import Move from './types/Move'
import Player from './types/Player'
import PlayerColor from './types/PlayerColor'

type GameType = SequentialGame<Game, Move, PlayerColor>
  & WithAutomaticMoves<Game, Move>

// @ts-ignore
const GorintoRules: GameType = {
  setup(): Game {
    return {
      season:1,
      players:setupPlayers(),
      activePlayer:PlayerColor.black,
      twoKeyElementCards : setupTwoKeyElementCards(),
      twoGoalCards : setupTwoGoalCards(),
      elementTilesDeck : setupElementTilesDeck(),
      HorizontalPath : [],
      VerticalPath : []
    }
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
    
    // (le jeu démarre et on doit setup les paths) | (il n'y a plus assez de tuiles pour un nouveau tour de jeu par rapport au nb de joueurs)
    if ((game.HorizontalPath.length === 0 && game.VerticalPath.length === 0) || (filledSpacesinPaths(game) < game.players.length)) {
      refillPaths(game);
    }
    
  },

  getLegalMoves(game: Game): Move[] {
    console.log(game)
    return [];
  },
  play(move: Move, game: Game, playerId: PlayerColor): void {
    console.log(move)
    console.log(game)
    console.log(playerId)
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

function setupTwoGoalCards():GoalCard[] {
  const arrayGoalCards : GoalCard[] = shuffle(GoalCards);
  const result : GoalCard[] = [];
  const conflictLetters : string[] = [];
  arrayGoalCards.forEach(element => {

    if (element.conflictLetter === ""){
      result.push(element);
    }
    else if (conflictLetters.includes(element.conflictLetter) === false){
      result.push(element);
    }
  });

  return [result[0],result[1]];

}

function setupElementTilesDeck():ElementTile[] {
  const result = shuffle(elementDeck)
  return result;
}

function filledSpacesinPaths(game:Game):number {
  let countEmpty = 0;
  for (let i = 0; i < game.HorizontalPath.length;i++){
    if (game.HorizontalPath[i].element !== Element.Earth    // Don't know a way to shorten the code here
      && game.HorizontalPath[i].element !==Element.Fire     // === "" return an error
      && game.HorizontalPath[i].element !==Element.Void
      && game.HorizontalPath[i].element !==Element.Water
      && game.HorizontalPath[i].element !==Element.Wind){
        countEmpty=+1;
    }
  }

  for (let i = 0; i < game.VerticalPath.length;i++){
    if (game.VerticalPath[i].element !== Element.Earth      // Same here
      && game.VerticalPath[i].element !==Element.Fire
      && game.VerticalPath[i].element !==Element.Void
      && game.VerticalPath[i].element !==Element.Water
      && game.VerticalPath[i].element !==Element.Wind){
        countEmpty=+1;
    }
  }
  return countEmpty;
}

function refillPaths(game:Game):void {
  const hResult:ElementTile[] = [];
  const vResult:ElementTile[] = [];
  for (let i=0; i<5;i++){
    if(game.elementTilesDeck.length !== 0){
      hResult.push(game.elementTilesDeck.pop() !);    // Exclamation point in order to escaped
    }                                                // the "pop undefined" issue
    else{
      console.log("error : Empty Deck ! Can't refill Paths !")
    }                                                       
  }                                                  
  for (let i=0; i<5;i++){
    if(game.elementTilesDeck.length !== 0){
      vResult.push(game.elementTilesDeck.pop() !);    // same here
    } else{
      console.log("error : Empty Deck ! Can't refill Paths")
    } 
  }

  game.HorizontalPath = hResult;
  game.VerticalPath = vResult;

}

export default GorintoRules