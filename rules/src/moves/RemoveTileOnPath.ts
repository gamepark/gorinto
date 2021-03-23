import GameState from '../types/GameState'
import GameView from '../types/GameView'
import Move from '../types/Move'
import MoveType from '../types/MoveType'
import { MoveView } from '../types/MoveView'

type RemoveTileOnPath = { type: typeof MoveType.RemoveTileOnPath, index:number }

export default RemoveTileOnPath

export function removeTileOnPath(state: GameState | GameView, move: RemoveTileOnPath) {
  if (move.index < 5) {
    state.horizontalPath[move.index] = null
  } else {
    state.verticalPath[move.index - 5] = null
  }
}

export function isRemoveTileOnPath(move:Move|MoveView):move is RemoveTileOnPath{
  return move.type === MoveType.RemoveTileOnPath
}