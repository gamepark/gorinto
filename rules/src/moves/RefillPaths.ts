import AutomaticMovePhase from '../types/AutomaticMovePhase'
import GameState from '../types/GameState'
import GameView, {isGame} from '../types/GameView'
import MoveType from '../types/MoveType'

type RefillPaths = { type: typeof MoveType.RefillPaths }

export default RefillPaths

export type RefillPathsView = RefillPaths & { horizontalPath : (number | null)[] , verticalPath : (number | null)[] }

export function isRefillPathsView(move: RefillPaths | RefillPathsView): move is RefillPathsView {
  return (move as RefillPathsView).horizontalPath !== undefined
}

export function refillPath(state: GameState) {
  if (state.season === 4) {
    state.automaticMovePhase = AutomaticMovePhase.movingSeasonMarker
  } else {
    if (state.horizontalPath.length !== 0) {
      state.automaticMovePhase = AutomaticMovePhase.movingSeasonMarker
    }
    state.horizontalPath = state.elementTilesBag.splice(0, 5)
    state.verticalPath = state.elementTilesBag.splice(0, 5)
  }
}

export function refillPathInView(state: GameView, move: RefillPathsView) {
  if (state.season === 4) {
    state.automaticMovePhase = AutomaticMovePhase.movingSeasonMarker
  } else {
    state.horizontalPath = move.horizontalPath
    state.verticalPath = move.verticalPath
  }
}