import GameState from '../types/GameState'
import GameView from '../types/GameView'
import Move from '../types/Move'
import MoveType from '../types/MoveType'
import {MoveView} from '../types/MoveView'
import Player from '../types/Player'

type SwitchFirstPlayer = {
  type: typeof MoveType.SwitchFirstPlayer
}

export default SwitchFirstPlayer

export function switchFirstPlayer(state: GameState | GameView) {
  delete state.tilesToTake

  if (state.isCompassionRoundOrder !== true){
    const lowestScore = Math.min(...state.players.map(player => player.score))
    let playerIndex = state.players.findIndex(player => player.color === state.firstPlayer)
    do {
      playerIndex = (playerIndex + 1) % state.players.length
    } while (state.players[playerIndex].score !== lowestScore)
    state.firstPlayer = state.players[playerIndex].color
  } else {
    const playerArraySorted : Player[] = [...state.players]
    playerArraySorted.sort((a,b) => b.compassionOrder! - a.compassionOrder!)
    playerArraySorted.sort((a,b) => a.score - b.score)
    state.players.forEach(p => p.compassionOrder = playerArraySorted.findIndex((ps) => ps.color === p.color)+1)
    state.firstPlayer = playerArraySorted[0].color
  }

  state.activePlayer = state.firstPlayer
  delete state.endOfSeasonStep
}

export function isSwitchFirstPlayer(move: Move | MoveView): move is SwitchFirstPlayer {
  return move.type === MoveType.SwitchFirstPlayer
}