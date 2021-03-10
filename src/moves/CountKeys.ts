import MoveType from '../types/MoveType'

type CountKeys = { type: typeof MoveType.CountKeys }

export default CountKeys

export function countKeys(): CountKeys {
    return {type: MoveType.CountKeys}
  }