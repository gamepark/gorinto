import Move from '../types/Move'
import MoveType from '../types/MoveType'
import { MoveView } from '../types/MoveView'
import PlayerColor from '../types/PlayerColor'

type SwitchFirstPlayer = { 
  type: typeof MoveType.SwitchFirstPlayer
}

export default SwitchFirstPlayer

export function switchFirstPlayer(): SwitchFirstPlayer {
    return {type: MoveType.SwitchFirstPlayer}
  }

export function isSwitchFirstPlayer(move:Move|MoveView):move is SwitchFirstPlayer{
  return move.type === MoveType.SwitchFirstPlayer
}