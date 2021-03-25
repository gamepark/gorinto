import GameState from '../types/GameState'
import GameView from '../types/GameView'
import MoveType from '../types/MoveType'

type CountKeys = { type: typeof MoveType.CountKeys }

export default CountKeys

export function countKeys(state: GameState | GameView) {
  for (let i = 0; i < state.twoKeyElementCards.length; i++) {
    for (let j = 0; j < state.players.length; j++) {
      const understandings: number[] = state.players[j].understanding

      switch (state.twoKeyElementCards[i]) {

        case 0 : {
          state.players[j].score = state.players[j].score + 2 * understandings[0]
          break
        }
        case 1 : {
          state.players[j].score = state.players[j].score + 2 * understandings[1]
          break
        }
        case 2 : {
          state.players[j].score = state.players[j].score + 2 * understandings[2]
          break
        }
        case 3 : {
          state.players[j].score = state.players[j].score + 2 * understandings[3]
          break
        }
        case 4 : {
          state.players[j].score = state.players[j].score + 2 * understandings[4]
          break
        }

      }
    }
  }
}