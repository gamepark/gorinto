import Move from '../types/Move'
import MoveType from '../types/MoveType'
import { MoveView } from '../types/MoveView'

type MoveSeasonMarker = { type: typeof MoveType.MoveSeasonMarker }

export default MoveSeasonMarker

export function moveSeasonMarker(): MoveSeasonMarker {
    return {type: MoveType.MoveSeasonMarker}
  }

export function isMoveSeasonMarker(move:Move|MoveView):move is MoveSeasonMarker{
  return move.type === MoveType.MoveSeasonMarker
}