import MoveType from '../types/MoveType'

type CantPickAnyTile = { type: typeof MoveType.CantPickAnyTile }

export default CantPickAnyTile

export function cantPickAnyTile(): CantPickAnyTile {
    return {type: MoveType.CantPickAnyTile}
  }