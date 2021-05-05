import GameState from '../types/GameState'
import GameView from '../types/GameView'
import MoveType from '../types/MoveType'
import Player from '../types/Player'
import PlayerColor from '../types/PlayerColor'

type ChangeActivePlayer = { type: typeof MoveType.ChangeActivePlayer }

export default ChangeActivePlayer

export function changeActivePlayer(state: GameState | GameView) {
  delete state.tilesToTake
  state.isCompassionRoundOrder !== true ? state.activePlayer = getNextPlayer(state) : state.activePlayer = getNextPlayerWithCompassion(state)
}

export function getNextPlayer(state: GameState | GameView) {
  const activePlayer = state.players.findIndex(player => player.color === state.activePlayer)!
  const nextPlayerIndex = (activePlayer + 1) % state.players.length
  return state.players[nextPlayerIndex].color
}

export function getNextPlayerWithCompassion(state:GameState | GameView):PlayerColor {
  let activePlayerNumberOrder:number = state.players.find(player => player.color === state.activePlayer)!.compassionOrder!
  activePlayerNumberOrder === state.players.length ? activePlayerNumberOrder = 1 : activePlayerNumberOrder += 1
  return state.players.find(p => p.compassionOrder === activePlayerNumberOrder)!.color

}