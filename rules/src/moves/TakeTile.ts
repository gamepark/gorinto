import {ElementBag} from '../cards/Elements'
import Element from '../types/Element'
import GameState from '../types/GameState'
import GameView from '../types/GameView'
import Move from '../types/Move'
import MoveType from '../types/MoveType'
import {MoveView} from '../types/MoveView'

type TakeTile = {
  type: typeof MoveType.TakeTile
  coordinates: { x: number, y: number, z?: number }
}

export default TakeTile

export function takeTile(state: GameState | GameView, move: TakeTile) {
  let elem: Element | undefined

  if (move.coordinates.z === undefined) {
    elem = ElementBag[state.mountainBoard[move.coordinates.x][move.coordinates.y][state.mountainBoard[move.coordinates.x][move.coordinates.y].length - 1]]?.element
  } else {
    elem = ElementBag[state.mountainBoard[move.coordinates.x][move.coordinates.y][move.coordinates.z]].element
  }

  let activePlayer: number = state.players.findIndex(player => player.color === state.activePlayer)!

  const tilesToTake = state.tilesToTake
  if (!tilesToTake) return console.error('Cannot takeTile when tilesToTake is undefined!')

  if (tilesToTake.element !== Element.Earth) {
    state.mountainBoard[move.coordinates.x][move.coordinates.y].pop()
  } else {
    state.mountainBoard[move.coordinates.x][move.coordinates.y].splice(move.coordinates.z!, 1)
  }

  state.players[activePlayer].understanding[elem]++

  tilesToTake.quantity--

  if (tilesToTake.element !== Element.Earth) {
    tilesToTake.coordinates.splice(tilesToTake.coordinates.findIndex(coord => (coord.x === move.coordinates.x) && (coord.y === move.coordinates.y)), 1)
  } else if (state.mountainBoard[move.coordinates.x][move.coordinates.y].length === 1) {
    tilesToTake.coordinates = []
  }
}

export function isTakeTile(move: Move | MoveView): move is TakeTile {
  return move.type === MoveType.TakeTile
}