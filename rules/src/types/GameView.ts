import ElementInPath from './ElementInPath'
import GameState from './GameState'


type GameView = Omit<GameState, 'elementTilesBag'> & {
  selectedTileInPath? : ElementInPath
}

export default GameView

export function isGame(game: GameState | GameView): game is GameState {
    return (game as GameState).elementTilesBag === undefined
  }