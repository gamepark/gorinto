import {SequentialGame} from '@gamepark/workshop'
import Game from './types/Game'
import Move from './types/Move'
import Player from './types/Player'
import PlayerColor from './types/PlayerColor'

type GameType = SequentialGame<Game, Move, PlayerColor>

// @ts-ignore
const GorintoRules: GameType = {
  setup(): Game {
    return {
      season:1,
      players:setupPlayers(),
      activePlayer:PlayerColor.black
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

export default GorintoRules