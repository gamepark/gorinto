import MoveType from '../types/MoveType'

type RemoveTileOnPath = { type: typeof MoveType.RemoveTileOnPath, index:number }

export default RemoveTileOnPath

export function removeTileOnPath(index:number): RemoveTileOnPath {
    return {type: MoveType.RemoveTileOnPath, index}
  }