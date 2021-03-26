import GameState from '../types/GameState'
import GameView from '../types/GameView'
import MoveType from '../types/MoveType'

type ScoreKeyElements = { type: typeof MoveType.ScoreKeyElements }

export default ScoreKeyElements

export function scoreKeyElements(state: GameState | GameView) {
  for (const player of state.players) {
    player.score += 2 * (player.understanding[state.keyElements[0]] + player.understanding[state.keyElements[1]])
  }
  delete state.tilesToTake
  delete state.activePlayer
}