import Game from './Game'

type GameView = Omit<Game, 'elementTilesBag'> 

export default GameView

export function isGame(game: Game | GameView): game is Game {
    return typeof (game as Game).elementTilesBag !== 'undefined'
  }