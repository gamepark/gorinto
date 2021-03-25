import Coordinates from '../types/Coordinates'
import {getElementPattern} from '../types/Element'
import GameState from '../types/GameState'
import GameView from '../types/GameView'
import Move from '../types/Move'
import MoveType from '../types/MoveType'
import {MoveView} from '../types/MoveView'
import {takeElementFromPath} from '../types/Path'
import PathType from '../types/PathType'

type MoveTile = {
  type: typeof MoveType.MoveTile
  path: PathType
} & Coordinates

export default MoveTile

export function moveTile(state: GameState | GameView, move: MoveTile) {
  const player = state.players.find(player => player.color === state.activePlayer)
  if (!player) return console.error('Cannot move tile: no active player!')

  const element = move.path === PathType.Horizontal ? takeElementFromPath(state.horizontalPath, move.x) : takeElementFromPath(state.verticalPath, move.y)
  if (element === null) return console.error('Cannot move tile: there is no tile there')

  state.tilesToTake = {
    quantity: player.understanding[element] + 1,
    coordinates: getElementPattern(element, move).filter(({x, y}) => state.mountainBoard[x][y].length > 0),
    element: element
  }

  state.mountainBoard[move.x][move.y].push(element)
}

export function isMoveTile(move: Move | MoveView): move is MoveTile {
  return move.type === MoveType.MoveTile
}