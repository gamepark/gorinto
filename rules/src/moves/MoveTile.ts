import {ElementBag} from '../cards/Elements'
import Element from '../types/Element'
import GameState from '../types/GameState'
import GameView from '../types/GameView'
import Move from '../types/Move'
import MoveType from '../types/MoveType'
import {MoveView} from '../types/MoveView'
import Player from '../types/Player'

type MoveTile = {
  type: typeof MoveType.MoveTile
  path: 'horizontal' | 'vertical'
  x: number
  y: number

}

export default MoveTile

export function moveTile(state: GameState | GameView, move: MoveTile) {
  const element = move.path === 'horizontal' ? state.horizontalPath[move.x] : state.verticalPath[move.y]

  state.mountainBoard[move.x][move.y].push(element!)

  if (move.path === 'horizontal') {
    state.horizontalPath[move.x] = null
  } else {
    state.verticalPath[move.y] = null
  }

  // game.tilesToTakes

  let activePlayer: Player = state.players.find(player => player.color === state.activePlayer)!
  const elem: Element | undefined = ElementBag[element!].element

  switch (elem) {       // One Pattern is required for each element
    case Element.Void : {
      state.tilesToTake = {
        quantity: activePlayer.understanding[Element.Void] + 1,
        coordinates: [{x: move.x + 1, y: move.y + 1}, {x: move.x + 1, y: move.y - 1}, {x: move.x - 1, y: move.y + 1}, {x: move.x - 1, y: move.y - 1}],    // Void Pattern
        element: elem
      }

      state.tilesToTake.coordinates = state.tilesToTake.coordinates.filter(coord => ((coord.x > -1 && coord.x < 5) && (coord.y > -1 && coord.y < 5)))    // Filtering tiles out of the board

      break
    }
    case Element.Wind : {
      state.tilesToTake = {
        quantity: activePlayer.understanding[Element.Wind] + 1,
        coordinates: [{x: move.x + 1, y: move.y}, {x: move.x - 1, y: move.y}, {x: move.x, y: move.y + 1}, {x: move.x, y: move.y - 1}],      // Wind Pattern
        element: elem
      }

      state.tilesToTake.coordinates = state.tilesToTake.coordinates.filter(coord => ((coord.x > -1 && coord.x < 5) && (coord.y > -1 && coord.y < 5)))    // Filtering tiles out of the board

      break
    }
    case Element.Fire : {
      const firePattern: { x: number, y: number }[] = [{x: move.x, y: 0}, {x: move.x, y: 1}, {x: move.x, y: 2}, {x: move.x, y: 3}, {x: move.x, y: 4}]
      firePattern.splice(move.y, 1)
      state.tilesToTake = {
        quantity: activePlayer.understanding[Element.Fire] + 1,
        coordinates: firePattern,
        element: elem
      }
      break
    }
    case Element.Water : {
      const waterPattern: { x: number, y: number }[] = [{x: 0, y: move.y}, {x: 1, y: move.y}, {x: 2, y: move.y}, {x: 3, y: move.y}, {x: 4, y: move.y}]
      waterPattern.splice(move.x, 1)
      state.tilesToTake = {
        quantity: activePlayer.understanding[Element.Water] + 1,
        coordinates: waterPattern,
        element: elem
      }
      break
    }
    case Element.Earth : {
      state.tilesToTake = {
        quantity: activePlayer.understanding[Element.Earth] + 1,
        coordinates: [{x: move.x, y: move.y}],
        element: elem
      }
      break
    }
  }

  state.tilesToTake?.coordinates.forEach(coord => {
      if (state.mountainBoard[coord.x][coord.y].length === 0) {
        state.tilesToTake?.coordinates.splice(state.tilesToTake.coordinates.indexOf(coord), 1)
      }
    }
  )

  if (state.tilesToTake?.element === Element.Earth) {
    if (state.mountainBoard[state.tilesToTake.coordinates[0].x][state.tilesToTake.coordinates[0].y].length === 1) {
      state.tilesToTake.coordinates.splice(0, 1)
    }
  }
}

export function isMoveTile(move: Move | MoveView): move is MoveTile {
  return move.type === MoveType.MoveTile
}