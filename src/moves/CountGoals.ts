import MoveType from '../types/MoveType'

type CountGoals = { type: typeof MoveType.CountGoals }

export default CountGoals

export function countGoals(): CountGoals {
    return {type: MoveType.CountGoals}
  }