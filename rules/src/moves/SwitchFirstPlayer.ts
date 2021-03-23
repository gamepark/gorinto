import GameState from '../types/GameState'
import GameView from '../types/GameView'
import Move from '../types/Move'
import MoveType from '../types/MoveType'
import {MoveView} from '../types/MoveView'

type SwitchFirstPlayer = { 
  type: typeof MoveType.SwitchFirstPlayer
}

export default SwitchFirstPlayer

export function switchFirstPlayer(state: GameState | GameView) {

  let firstPlayerNumber: number = 0
  let smallestScore: number = 101


  for (let i = 0; i < state.players.length; i++) {
    if (state.players[i].isFirst) {
      firstPlayerNumber = i
      state.players[i].isFirst = false
      break
    }
  }

  for (let i = firstPlayerNumber; i < firstPlayerNumber + state.players.length; i++) {
    if (state.players[i % state.players.length].score < smallestScore) {
      smallestScore = state.players[i % state.players.length].score
    }
  }

  for (let i = firstPlayerNumber; i < firstPlayerNumber + state.players.length; i++) {
    if (state.players[i % state.players.length].score === smallestScore) {
      state.players[i % state.players.length].isFirst = true
      state.activePlayer = state.players[i % state.players.length].color
      break
    }
  }

  state.automaticMovePhase = undefined
}

export function isSwitchFirstPlayer(move:Move|MoveView):move is SwitchFirstPlayer{
  return move.type === MoveType.SwitchFirstPlayer
}