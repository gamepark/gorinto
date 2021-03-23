import AutomaticMovePhase from '../types/AutomaticMovePhase'
import GameState from '../types/GameState'
import GameView from '../types/GameView'
import Move from '../types/Move'
import MoveType from '../types/MoveType'
import { MoveView } from '../types/MoveView'

type MoveSeasonMarker = { type: typeof MoveType.MoveSeasonMarker }

export default MoveSeasonMarker

export function moveSeasonMarker(state: GameState | GameView) {
  if (state.season === 4) {
    state.activePlayer = undefined
  } else {
    state.season++
  }

  state.automaticMovePhase = AutomaticMovePhase.countingGoals
}

export function isMoveSeasonMarker(move:Move|MoveView):move is MoveSeasonMarker{
  return move.type === MoveType.MoveSeasonMarker
}