import GameState from '../types/GameState'
import GameView from '../types/GameView'
import MoveType from '../types/MoveType'
import Path from '../types/Path'

type RefillPaths = { type: typeof MoveType.RefillPaths }

export default RefillPaths

export type RefillPathsView = RefillPaths & {
  horizontalPath: Path
  verticalPath: Path
}

export function isRefillPathsView(move: RefillPaths | RefillPathsView): move is RefillPathsView {
  return (move as RefillPathsView).horizontalPath !== undefined
}

export function fillPaths(state: GameState) {
  state.horizontalPath = state.elementTilesBag.splice(0, 5) as Path
  state.verticalPath = state.elementTilesBag.splice(0, 5) as Path
}

export function refillPaths(state: GameState) {
  fillPaths(state)
  state.endOfSeasonStep = MoveType.SwitchFirstPlayer
}

export function refillPathsInView(state: GameView, move: RefillPathsView) {
  state.horizontalPath = move.horizontalPath
  state.verticalPath = move.verticalPath
  state.endOfSeasonStep = MoveType.SwitchFirstPlayer
}