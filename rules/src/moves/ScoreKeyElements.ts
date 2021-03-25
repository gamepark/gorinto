import GameState from '../types/GameState'
import GameView from '../types/GameView'
import MoveType from '../types/MoveType'

type ScoreKeyElements = { type: typeof MoveType.ScoreKeyElements }

export default ScoreKeyElements

export function scoreKeyElements(state: GameState | GameView) {
  for (let i = 0; i < state.keyElements.length; i++) {
    for (let j = 0; j < state.players.length; j++) {
      const understandings: number[] = state.players[j].understanding

      switch (state.keyElements[i]) {

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
  state.tilesToTake = undefined
  state.activePlayer = undefined
}