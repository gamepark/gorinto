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
  state.tilesToTake = undefined
  const lowestScore = Math.min(...state.players.map(player => player.score))
  let playerIndex = state.players.findIndex(player => player.color === state.firstPlayer)
  do {
    playerIndex = (playerIndex + 1) % state.players.length
  } while (state.players[playerIndex].score !== lowestScore)
  state.firstPlayer = state.players[playerIndex].color
  state.activePlayer = state.firstPlayer
  state.endOfSeasonStep = undefined
}

export function isSwitchFirstPlayer(move: Move | MoveView): move is SwitchFirstPlayer {
  return move.type === MoveType.SwitchFirstPlayer
}