import MoveType from '../types/MoveType'

type MoveSeasonMarker = { type: typeof MoveType.MoveSeasonMarker }

export default MoveSeasonMarker

export function moveSeasonMarker(): MoveSeasonMarker {
    return {type: MoveType.MoveSeasonMarker}
  }