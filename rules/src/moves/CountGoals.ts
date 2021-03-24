import {Goals} from '../cards/Goals'
import AutomaticMovePhase from '../types/AutomaticMovePhase'
import GameState from '../types/GameState'
import GameView from '../types/GameView'
import MoveType from '../types/MoveType'

type CountGoals = { type: typeof MoveType.CountGoals }

export default CountGoals

export function countGoals(state: GameState | GameView) {
  const goals = state.twoGoals.map(goalIndex => Goals[goalIndex])
  for (const player of state.players) {
    player.score += goals[0].score(player, state) + goals[1].score(player, state)
  }

  if (state.season === 4 && state.activePlayer === undefined) {
    state.automaticMovePhase = AutomaticMovePhase.countingKeys
  } else {
    state.automaticMovePhase = AutomaticMovePhase.switchingFirstPlayer
  }
}