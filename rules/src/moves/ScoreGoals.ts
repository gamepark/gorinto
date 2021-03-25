import {Goals} from '../cards/Goals'
import GameState from '../types/GameState'
import GameView from '../types/GameView'
import MoveType from '../types/MoveType'

type ScoreGoals = { type: typeof MoveType.ScoreGoals }

export default ScoreGoals

export function scoreGoals(state: GameState | GameView) {
  const goals = state.goals.map(goalIndex => Goals[goalIndex])
  for (const player of state.players) {
    player.score += goals[0].score(player, state) + goals[1].score(player, state)
  }
  state.endOfSeasonStep = MoveType.MoveSeasonMarker
}