import GameState from '../types/GameState'
import GameView from '../types/GameView'
import Move from '../types/Move'
import MoveType from '../types/MoveType'
import {MoveView} from '../types/MoveView'

type MoveSeasonMarker = { type: typeof MoveType.MoveSeasonMarker }

export default MoveSeasonMarker

export function moveSeasonMarker(state: GameState | GameView) {
  state.season++
  state.endOfSeasonStep = MoveType.RefillPaths
}

export function isMoveSeasonMarker(move: Move | MoveView): move is MoveSeasonMarker {
  return move.type === MoveType.MoveSeasonMarker
}