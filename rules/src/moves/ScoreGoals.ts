import {Goals} from '../cards/Goals'
import GameState from '../types/GameState'
import GameView from '../types/GameView'
import Move from '../types/Move'
import MoveType from '../types/MoveType'
import { MoveView } from '../types/MoveView'

type ScoreGoals = { type: typeof MoveType.ScoreGoals }

export default ScoreGoals

export function scoreGoals(state: GameState | GameView) {
  const goals = state.goals.map(goalIndex => Goals[goalIndex])
  for (const player of state.players) {
    player.score += goals[0].score(player, state) + goals[1].score(player, state)
  }
  state.endOfSeasonStep = MoveType.MoveSeasonMarker
}

export function isScoreGoals(move: Move | MoveView): move is ScoreGoals {
  return move.type === MoveType.ScoreGoals
}