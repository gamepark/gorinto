import Move from '../types/Move'
import MoveType from '../types/MoveType'
import { MoveView } from '../types/MoveView'

type RemoveTileOnPath = { type: typeof MoveType.RemoveTileOnPath, index:number }

export default RemoveTileOnPath

export function removeTileOnPath(index:number): RemoveTileOnPath {
    return {type: MoveType.RemoveTileOnPath, index}
  }
  
export function isRemoveTileOnPath(move:Move|MoveView):move is RemoveTileOnPath{
  return move.type === MoveType.RemoveTileOnPath
}