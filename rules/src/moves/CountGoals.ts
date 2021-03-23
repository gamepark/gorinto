import AutomaticMovePhase from '../types/AutomaticMovePhase'
import GameState from '../types/GameState'
import GameView from '../types/GameView'
import MoveType from '../types/MoveType'

type CountGoals = { type: typeof MoveType.CountGoals }

export default CountGoals

export function countGoals(state: GameState | GameView) {
  for (let i = 0; i < state.twoGoals.length; i++) {
    for (let j = 0; j < state.players.length; j++) {
      const understandings: number[] = [state.players[j].understanding.void, state.players[j].understanding.wind, state.players[j].understanding.fire, state.players[j].understanding.water, state.players[j].understanding.earth]

      switch (state.twoGoals[i]) {

        case 0 : {

          for (let k = 0; k < 5; k++) {
            const understandingsComparative: number[] = Array.from(understandings)
            understandingsComparative.splice(k, 1)
            if (understandings[k] === understandingsComparative[0]
              || understandings[k] === understandingsComparative[1]
              || understandings[k] === understandingsComparative[2]
              || understandings[k] === understandingsComparative[3]) {
              state.players[j].score = state.players[j].score + understandings[k]
            }
          }

          break
        }
        case 1 : {

          for (let k = 0; k < 5; k++) {
            const understandingsComparative: number[] = Array.from(understandings)
            understandingsComparative.splice(k, 1)
            if (understandings[k] !== understandingsComparative[0]
              && understandings[k] !== understandingsComparative[1]
              && understandings[k] !== understandingsComparative[2]
              && understandings[k] !== understandingsComparative[3]) {
              state.players[j].score = state.players[j].score + understandings[k]
            }
          }

          break
        }
        case 2 : {

          for (let k = 0; k < 5; k++) {
            if (understandings[k] % 2 === 1) {
              state.players[j].score = state.players[j].score + understandings[k]
            }
          }

          break
        }
        case 3 : {

          for (let k = 0; k < 5; k++) {
            if (understandings[k] % 2 === 0) {
              state.players[j].score = state.players[j].score + understandings[k]
            }
          }

          break
        }
        case 4 : {

          const maxsUnderstandings: number[] = [0, 0, 0, 0, 0]
          for (let k = 0; k < state.players.length; k++) {
            if (maxsUnderstandings[0] < state.players[k].understanding.void) {
              maxsUnderstandings[0] = state.players[k].understanding.void
            }
            if (maxsUnderstandings[1] < state.players[k].understanding.wind) {
              maxsUnderstandings[1] = state.players[k].understanding.wind
            }
            if (maxsUnderstandings[2] < state.players[k].understanding.fire) {
              maxsUnderstandings[2] = state.players[k].understanding.fire
            }
            if (maxsUnderstandings[3] < state.players[k].understanding.water) {
              maxsUnderstandings[3] = state.players[k].understanding.water
            }
            if (maxsUnderstandings[4] < state.players[k].understanding.earth) {
              maxsUnderstandings[4] = state.players[k].understanding.earth
            }
          }

          for (let k = 0; k < 5; k++) {
            if (understandings[k] === maxsUnderstandings[k]) {
              state.players[j].score = state.players[j].score + 3
            }
          }

          break
        }
        case 5 : {

          const minsUnderstandings: number[] = [101, 101, 101, 101, 101]       //Maximum of tiles +1
          for (let k = 0; k < state.players.length; k++) {
            if ((minsUnderstandings[0] > state.players[k].understanding.void) && (state.players[k].understanding.void !== 0)) {
              minsUnderstandings[0] = state.players[k].understanding.void
            }
            if ((minsUnderstandings[1] > state.players[k].understanding.wind) && (state.players[k].understanding.wind !== 0)) {
              minsUnderstandings[1] = state.players[k].understanding.wind
            }
            if ((minsUnderstandings[2] > state.players[k].understanding.fire) && (state.players[k].understanding.fire !== 0)) {
              minsUnderstandings[2] = state.players[k].understanding.fire
            }
            if ((minsUnderstandings[3] > state.players[k].understanding.water) && (state.players[k].understanding.water !== 0)) {
              minsUnderstandings[3] = state.players[k].understanding.water
            }
            if ((minsUnderstandings[4] > state.players[k].understanding.earth) && (state.players[k].understanding.earth !== 0)) {
              minsUnderstandings[4] = state.players[k].understanding.earth
            }
          }

          for (let k = 0; k < 5; k++) {
            if (understandings[k] === minsUnderstandings[k]) {
              state.players[j].score = state.players[j].score + 3
            }
          }

          break
        }
        case 6 : {

          const sortedUnderstandings: number[] = (Array.from(understandings)).sort((a, b) => a - b)
          for (let k = 0; k < 5; k++) {
            if (understandings[k] !== sortedUnderstandings[2]) {
              state.players[j].score = state.players[j].score + understandings[k]
            }
          }

          break
        }
        case 7 : {

          const sortedUnderstandings: number[] = (Array.from(understandings)).sort((a, b) => a - b)
          state.players[j].score = state.players[j].score + (sortedUnderstandings[2] * 3)

          break
        }
        case 8 : {

          const sortedUnderstandings: number[] = (Array.from(understandings)).sort((a, b) => a - b)
          const max: number = sortedUnderstandings[4]
          const min: number = sortedUnderstandings[0]

          for (let k = 0; k < 5; k++) {
            if (understandings[k] === min || understandings[k] === max) {
              state.players[j].score = state.players[j].score + understandings[k]
            }
          }


          break
        }
        case 9 : {

          const sortedUnderstandings: number[] = (Array.from(understandings)).sort((a, b) => a - b)
          const max: number = sortedUnderstandings[4]
          let min: number = 101
          for (let k = 0; k < 5; k++) {
            if (sortedUnderstandings[k] > 0 && sortedUnderstandings[k] < min) {
              min = sortedUnderstandings[k]
            }

          }
          state.players[j].score = state.players[j].score + (max + 2 * min)

          break
        }
        case 10 : {

          const sortedUnderstandings: number[] = (Array.from(understandings)).sort((a, b) => a - b)
          const difference: number = sortedUnderstandings[4] - sortedUnderstandings[0]
          state.players[j].score = state.players[j].score + (difference * 2)

          break
        }
        case 11 : {

          const shortestStack: number = (Array.from(understandings)).sort((a, b) => a - b)[0]
          if (shortestStack !== 0) {
            state.players[j].score = state.players[j].score + (shortestStack * 7)
          }

          break
        }
      }

    }

  }

  if (state.season === 4 && state.activePlayer === undefined) {
    state.automaticMovePhase = AutomaticMovePhase.countingKeys
  } else {
    state.automaticMovePhase = AutomaticMovePhase.switchingFirstPlayer
  }
}