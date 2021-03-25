import Coordinates from '../types/Coordinates'
import Element from '../types/Element'
import GameState from '../types/GameState'
import GameView from '../types/GameView'
import Move from '../types/Move'
import MoveType from '../types/MoveType'
import {MoveView} from '../types/MoveView'

type TakeTile = {
  type: typeof MoveType.TakeTile
  coordinates: Coordinates & { z?: number }
}

export default TakeTile

export function takeTile(state: GameState | GameView, move: TakeTile) {
  if (!state.tilesToTake) return console.error('Cannot takeTile when tilesToTake is undefined!')
  const player = state.players.find(player => player.color === state.activePlayer)
  if (!player) return console.error('Cannot take tile when no player is active!')
  const {y, x} = move.coordinates
  const z = move.coordinates.z ?? state.mountainBoard[x][y].length - 1
  const element = state.mountainBoard[x][y][z]

  state.mountainBoard[x][y].splice(z, 1)
  player.understanding[element]++
  state.tilesToTake.quantity--

  if (state.tilesToTake.element !== Element.Earth) {
    state.tilesToTake.coordinates.splice(state.tilesToTake.coordinates.findIndex(coordinates => (coordinates.x === x) && (coordinates.y === y)), 1)
  } else if (state.mountainBoard[x][y].length === 1) {
    state.tilesToTake.coordinates = []
  }
}

export function isTakeTile(move: Move | MoveView): move is TakeTile {
  return move.type === MoveType.TakeTile
}