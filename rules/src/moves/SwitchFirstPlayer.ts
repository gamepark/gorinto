import MoveType from '../types/MoveType'

type SwitchFirstPlayer = { type: typeof MoveType.SwitchFirstPlayer }

export default SwitchFirstPlayer

export function switchFirstPlayer(): SwitchFirstPlayer {
    return {type: MoveType.SwitchFirstPlayer}
  }