import ElementTile from '../types/ElementTile'
import MoveType from '../types/MoveType'

type RefillPaths = { type: typeof MoveType.RefillPaths }

export default RefillPaths

export type RefillPathsView = RefillPaths & { horizontalPath : (number | null)[] , verticalPath : (number | null)[] }

export function refillPaths(): RefillPaths {
  return {type: MoveType.RefillPaths}
}

export function isRefillPathsView(move: RefillPaths | RefillPathsView): move is RefillPathsView {
  return (move as RefillPathsView).horizontalPath !== undefined
}