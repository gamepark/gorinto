import GameState from '../types/GameState'
import GameView from '../types/GameView'
import MoveType from '../types/MoveType'

type ChangeActivePlayer = { type: typeof MoveType.ChangeActivePlayer }

export default ChangeActivePlayer

export function changeActivePlayer(state: GameState | GameView) {
  delete state.tilesToTake
  state.activePlayer = getNextPlayer(state)
}

export function getNextPlayer(state: GameState | GameView) {
  const activePlayer = state.players.findIndex(player => player.color === state.activePlayer)!
  const nextPlayerIndex = (activePlayer + 1) % state.players.length
  return state.players[nextPlayerIndex].color
}