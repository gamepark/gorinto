import MoveType from '../types/MoveType'

type DetermineWinner = { type: typeof MoveType.DetermineWinner }

export default DetermineWinner

export function determineWinner(): DetermineWinner {
    return {type: MoveType.DetermineWinner}
  }