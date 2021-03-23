import GameState from '../types/GameState'
import GameView from '../types/GameView'
import MoveType from '../types/MoveType'

type CantPickAnyTile = { type: typeof MoveType.CantPickAnyTile }

export default CantPickAnyTile

export function cantPickAnyTile(state: GameState | GameView) {
  const activePlayer: number = state.players.findIndex(player => player.color === state.activePlayer)!
  const nextPlayerIndex: number = (activePlayer + 1) % state.players.length
  state.activePlayer = state.players[nextPlayerIndex].color
  state.tilesToTake = undefined
}