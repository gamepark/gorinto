import {ElementBag} from '../cards/Elements'
import Element from '../types/Element'
import GameState from '../types/GameState'
import GameView from '../types/GameView'
import Move from '../types/Move'
import MoveType from '../types/MoveType'
import {MoveView} from '../types/MoveView'

type TakeTile = {
  type: typeof MoveType.TakeTile
  coordinates: { x: number, y: number, z?: number }
}

export default TakeTile

export function takeTile(state: GameState | GameView, move: TakeTile) {
  let elem: Element | undefined

  if (move.coordinates.z === undefined) {
    elem = ElementBag[state.mountainBoard[move.coordinates.x][move.coordinates.y][state.mountainBoard[move.coordinates.x][move.coordinates.y].length - 1]]?.element
  } else {
    elem = ElementBag[state.mountainBoard[move.coordinates.x][move.coordinates.y][move.coordinates.z]].element
  }

  let activePlayer: number = state.players.findIndex(player => player.color === state.activePlayer)!

  if (state.tilesToTake?.element !== Element.Earth) {
    state.mountainBoard[move.coordinates.x][move.coordinates.y].pop()
  } else {
    state.mountainBoard[move.coordinates.x][move.coordinates.y].splice(move.coordinates.z!, 1)
  }

  switch (elem) {
    case Element.Void : {
      state.players[activePlayer].understanding.void++
      break
    }
    case Element.Wind : {
      state.players[activePlayer].understanding.wind++
      break
    }
    case Element.Fire : {
      state.players[activePlayer].understanding.fire++
      break
    }
    case Element.Water : {
      state.players[activePlayer].understanding.water++
      break
    }
    case Element.Earth : {
      state.players[activePlayer].understanding.earth++
      break
    }
  }

  state.tilesToTake!.quantity--

  if (state.tilesToTake?.element !== Element.Earth) {
    state.tilesToTake?.coordinates.splice(state.tilesToTake.coordinates.findIndex(coord => (coord.x === move.coordinates.x) && (coord.y === move.coordinates.y)), 1)
  }

  if ((state.tilesToTake!.quantity === 0) || (state.tilesToTake?.coordinates.length === 0) || ((state.tilesToTake?.element === 'earth') && (state.mountainBoard[move.coordinates.x][move.coordinates.y].length === 1))) {
    state.tilesToTake = undefined
    console.log('Fin du tour !')

    const nextPlayerIndex = (activePlayer + 1) % state.players.length
    state.activePlayer = state.players[nextPlayerIndex].color

  }
}

export function isTakeTile(move: Move | MoveView): move is TakeTile {
  return move.type === MoveType.TakeTile
}