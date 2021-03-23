import AutomaticMovePhase from '../types/AutomaticMovePhase'
import Element from '../types/Element'
import GameState from '../types/GameState'
import GameView from '../types/GameView'
import MoveType from '../types/MoveType'

type CountGoals = { type: typeof MoveType.CountGoals }

export default CountGoals

export function countGoals(state: GameState | GameView) {
  for (let i = 0; i < state.twoGoals.length; i++) {
    for (let j = 0; j < state.players.length; j++) {
      const understandings = state.players[j].understanding

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
            if (maxsUnderstandings[0] < state.players[k].understanding[Element.Void]) {
              maxsUnderstandings[0] = state.players[k].understanding[Element.Void]
            }
            if (maxsUnderstandings[1] < state.players[k].understanding[Element.Wind]) {
              maxsUnderstandings[1] = state.players[k].understanding[Element.Wind]
            }
            if (maxsUnderstandings[2] < state.players[k].understanding[Element.Fire]) {
              maxsUnderstandings[2] = state.players[k].understanding[Element.Fire]
            }
            if (maxsUnderstandings[3] < state.players[k].understanding[Element.Water]) {
              maxsUnderstandings[3] = state.players[k].understanding[Element.Water]
            }
            if (maxsUnderstandings[4] < state.players[k].understanding[Element.Earth]) {
              maxsUnderstandings[4] = state.players[k].understanding[Element.Earth]
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
            if ((minsUnderstandings[0] > state.players[k].understanding[Element.Void]) && (state.players[k].understanding[Element.Void] !== 0)) {
              minsUnderstandings[0] = state.players[k].understanding[Element.Void]
            }
            if ((minsUnderstandings[1] > state.players[k].understanding[Element.Wind]) && (state.players[k].understanding[Element.Wind] !== 0)) {
              minsUnderstandings[1] = state.players[k].understanding[Element.Wind]
            }
            if ((minsUnderstandings[2] > state.players[k].understanding[Element.Fire]) && (state.players[k].understanding[Element.Fire] !== 0)) {
              minsUnderstandings[2] = state.players[k].understanding[Element.Fire]
            }
            if ((minsUnderstandings[3] > state.players[k].understanding[Element.Water]) && (state.players[k].understanding[Element.Water] !== 0)) {
              minsUnderstandings[3] = state.players[k].understanding[Element.Water]
            }
            if ((minsUnderstandings[4] > state.players[k].understanding[Element.Earth]) && (state.players[k].understanding[Element.Earth] !== 0)) {
              minsUnderstandings[4] = state.players[k].understanding[Element.Earth]
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