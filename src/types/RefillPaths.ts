import ElementTile from './ElementTile'
import MoveType from './MoveType'

type RefillPaths = { type: typeof MoveType.RefillPaths }

export default RefillPaths

export type RefillPathsView = RefillPaths & { horizontalPath : ElementTile[], verticalPath : ElementTile[] }

export function refillPaths(): RefillPaths {
  return {type: MoveType.RefillPaths}
}

export function isRefillPathsView(move: RefillPaths | RefillPathsView): move is RefillPathsView {
  return (move as RefillPathsView).horizontalPath !== undefined
}