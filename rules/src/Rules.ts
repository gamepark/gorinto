import {IncompleteInformation, SequentialGame} from '@gamepark/rules-api'
import shuffle from 'lodash.shuffle'
import {Goals} from './cards/Goals'
import {GorintoOptions, GorintoPlayerOptions, isGameOptions} from './GorintoOptions'
import {changeActivePlayer} from './moves/ChangeActivePlayer'
import {countGoals} from './moves/CountGoals'
import {countKeys} from './moves/CountKeys'
import {determineWinner} from './moves/DetermineWinner'
import {moveSeasonMarker} from './moves/MoveSeasonMarker'
import MoveTile, {moveTile} from './moves/MoveTile'
import {refillPath} from './moves/RefillPaths'
import {removeTileOnPath} from './moves/RemoveTileOnPath'
import {switchFirstPlayer} from './moves/SwitchFirstPlayer'
import TakeTile, {takeTile} from './moves/TakeTile'
import AutomaticMovePhase from './types/AutomaticMovePhase'
import Element, {elements, numberOfEachElement} from './types/Element'
import GameState from './types/GameState'
import GameView from './types/GameView'
import Move from './types/Move'
import MoveType from './types/MoveType'
import {MoveView} from './types/MoveView'
import Player from './types/Player'
import PlayerColor from './types/PlayerColor'
import TilesToTake from './types/TilesToTake'

export default class Gorinto extends SequentialGame<GameState, Move, PlayerColor>
  implements IncompleteInformation<GameState, GameView, Move, MoveView, PlayerColor> {

  constructor(state: GameState)
  constructor(options: GorintoOptions)
  constructor(arg: GameState | GorintoOptions) {
    if (isGameOptions(arg)) {
      const game: GameState = {
        season: 1,                 // Don't start at 4, even for debug
        players: setupPlayers(arg.players),
        activePlayer: arg.players[0].id,
        twoKeyElementCards: setupTwoKeyElementCards(),
        twoGoals: setupTwoGoals(),
        elementTilesBag: setupElementTilesBag(),
        horizontalPath: [],
        verticalPath: [],
        mountainBoard: [],
        automaticMovePhase: undefined
      }

      game.players = setupIsFirstPlayer(game)
      game.mountainBoard = setupMountain(game)

      super(game)
    } else {
      super(arg)
    }
  }

  getActivePlayer() {
    return this.state.activePlayer
  }

  getAutomaticMove(): Move | void {    // (game start and we have to setup the paths) | (there's not enough tiles on the paths to make a whole game turn)
    if (this.state.tilesToTake === undefined) {

      if (((this.state.horizontalPath.length === 0 && this.state.verticalPath.length === 0)
        || ((filledSpacesinPaths(this.state) === 0) && (this.state.players.length === 2))
        || ((filledSpacesinPaths(this.state) === 1) && (this.state.players.length === 3))
        || ((filledSpacesinPaths(this.state) === 2) && (this.state.players.length === 4)))
        && (this.state.automaticMovePhase === undefined) && (this.state.activePlayer)) {
        return {type: MoveType.RefillPaths}
      }

      if (this.state.players.length === 2 && [2, 4, 6, 8].includes(filledSpacesinPaths(this.state))) {           // Adaptation for 2 players
        let twoPaths = this.state.horizontalPath.concat(this.state.verticalPath)
        let randomSpaceToRemove: number = getRandomInt(10)
        while (twoPaths[randomSpaceToRemove] === null) {
          randomSpaceToRemove = getRandomInt(10)
        }
        return {type: MoveType.RemoveTileOnPath, index: randomSpaceToRemove}
      }

      if (this.state.automaticMovePhase === AutomaticMovePhase.movingSeasonMarker) {
        return {type: MoveType.MoveSeasonMarker}
      } else if (this.state.automaticMovePhase === AutomaticMovePhase.countingGoals) {
        return {type: MoveType.CountGoals}
      } else if (this.state.automaticMovePhase === AutomaticMovePhase.switchingFirstPlayer) {
        return {type: MoveType.SwitchFirstPlayer}
      } else if (this.state.automaticMovePhase === AutomaticMovePhase.countingKeys) {
        return {type: MoveType.CountKeys}
      } else if (this.state.automaticMovePhase === AutomaticMovePhase.determiningWinner) {
        return {type: MoveType.DetermineWinner}
      }

    }

    return getPredictableAutomaticMoves(this.state)
  }

  getLegalMoves(): Move[] {
    console.log(this.state)

    if (this.state.tilesToTake === undefined) {
      const moves: MoveTile[] = []
      for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
          if (this.state.horizontalPath[x]) {
            moves.push({type: MoveType.MoveTile, path: 'horizontal', x, y})
          }
          if (this.state.verticalPath[y]) {
            moves.push({type: MoveType.MoveTile, path: 'vertical', x, y})
          }
        }
      }
      return moves
    } else {

      const takes: TakeTile[] = []
      for (let i = 0; i < this.state.tilesToTake.coordinates.length; i++) {

        if (this.state.tilesToTake.element !== Element.Earth) {
          takes.push({type: MoveType.TakeTile, coordinates: {x: this.state.tilesToTake.coordinates[i].x, y: this.state.tilesToTake.coordinates[i].y}})
        } else {
          for (let z = 0; z < this.state.mountainBoard[this.state.tilesToTake.coordinates[i].x][this.state.tilesToTake.coordinates[i].y].length - 1; z++) {
            takes.push({type: MoveType.TakeTile, coordinates: {x: this.state.tilesToTake.coordinates[i].x, y: this.state.tilesToTake.coordinates[i].y, z}})
          }
          console.log(takes)
        }

      }

      return takes

    }
  }

  play(move: Move): void {
    switch (move.type) {
      case MoveType.ChangeActivePlayer:
        return changeActivePlayer(this.state)
      case MoveType.RefillPaths:
        return refillPath(this.state)
      case MoveType.RemoveTileOnPath:
        return removeTileOnPath(this.state, move)
      case MoveType.MoveSeasonMarker:
        return moveSeasonMarker(this.state)
      case MoveType.CountGoals:
        return countGoals(this.state)
      case MoveType.SwitchFirstPlayer:
        return switchFirstPlayer(this.state)
      case MoveType.CountKeys:
        return countKeys(this.state)
      case MoveType.DetermineWinner:
        return determineWinner(this.state)
      case MoveType.MoveTile:
        return moveTile(this.state, move)
      case MoveType.TakeTile:
        return takeTile(this.state, move)
    }
  }

  getView(): GameView {
    const {elementTilesBag, ...view} = this.state
    return view
  }

  getMoveView(move: Move): MoveView {
    if (move.type === MoveType.RefillPaths) {
      return {...move, horizontalPath: this.state.horizontalPath, verticalPath: this.state.verticalPath}
    } else {
      return move
    }

  }
}

function setupPlayers(players: GorintoPlayerOptions[]): Player[] {
  return players.map((options, index) => ({
    color: options.id, understanding: [0, 0, 0, 0, 0], score: 0, isFirst: index === 0
  }))
}

function setupIsFirstPlayer(game: GameState): Player[] {
  let result: Player[] = game.players
  for (let i = 0; i < game.players.length; i++) {
    result[i].isFirst = result[i].color === game.activePlayer
  }
  return result
}

function setupTwoKeyElementCards(): [Element, Element] {
  const shuffled = shuffle(elements)
  return [shuffled[0], shuffled[1]]
}

function setupTwoGoals(): number[] {
  const arrayGoalCards: number[] = shuffle(Array.from(Goals.keys()))    // Take only the key, not all infos with heavy pictures
  const result: number[] = []
  const conflictLetters: string[] = []
  arrayGoalCards.forEach(element => {
    const goal = Goals[element]

    if (goal.conflictLetter === '') {
      result.push(element)
    } else if (!conflictLetters.includes(goal.conflictLetter)) {
      conflictLetters.push(goal.conflictLetter)
      result.push(element)
    }
  })

  return [result[0], result[1]]

}

function setupElementTilesBag(): number[] {
  return shuffle(elements.flatMap(element => new Array(numberOfEachElement).fill(element)))
}

function setupMountain(game: GameState): number[][][] {
  let i, j: number = 0
  let result: Element[][][] = []
  for (i = 0; i < 5; i++) {
    result[i] = []
    for (j = 0; j < 5; j++) {
      result[i][j] = []
      result[i][j][0] = game.elementTilesBag.pop() !    // Escaped the "pop undefined" issue
      result[i][j][1] = game.elementTilesBag.pop() !    // Same
    }
  }
  for (i = 1; i < 4; i++) {
    for (j = 1; j < 4; j++) {
      result[i][j][2] = game.elementTilesBag.pop() !      // Same
    }
  }
  result[2][2][3] = game.elementTilesBag.pop() !         // Same
  return result
}

export function getPredictableAutomaticMoves(state: GameState | GameView): Move & MoveView | void {
  if (state.tilesToTake !== undefined && cantPickAnyTile(state.tilesToTake)) {
    return {type: MoveType.ChangeActivePlayer}
  }
}

function cantPickAnyTile(tilesToTake: TilesToTake): boolean {
  return tilesToTake.coordinates.length === 0 || tilesToTake.quantity === 0
}

function filledSpacesinPaths(game: GameState): number {

  return game.horizontalPath.reduce((sum, space) => space !== null ? sum! + 1 : sum, 0)! +
    game.verticalPath.reduce((sum, space) => space !== null ? sum! + 1 : sum, 0)!
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max))
}

export function getPlayer(game: GameState, color: PlayerColor): Player {
  return game.players.find(player => player.color === color)!
}