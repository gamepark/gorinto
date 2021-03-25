import {Competitive, IncompleteInformation, SequentialGame} from '@gamepark/rules-api'
import shuffle from 'lodash.shuffle'
import {Goals} from './cards/Goals'
import {GorintoOptions, GorintoPlayerOptions, isGameOptions} from './GorintoOptions'
import {changeActivePlayer} from './moves/ChangeActivePlayer'
import {scoreGoals} from './moves/ScoreGoals'
import {moveSeasonMarker} from './moves/MoveSeasonMarker'
import MoveTile, {moveTile} from './moves/MoveTile'
import {refillPath} from './moves/RefillPaths'
import {removeTileOnPath} from './moves/RemoveTileOnPath'
import {scoreKeyElements} from './moves/ScoreKeyElements'
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
  implements IncompleteInformation<GameState, GameView, Move, MoveView, PlayerColor>,
    Competitive<GameState, Move, PlayerColor> {

  constructor(state: GameState)
  constructor(options: GorintoOptions)
  constructor(arg: GameState | GorintoOptions) {
    if (isGameOptions(arg)) {
      const game: GameState = {
        season: 1,                 // Don't start at 4, even for debug
        players: setupPlayers(arg.players),
        activePlayer: arg.players[0].id,
        firstPlayer: arg.players[0].id,
        keyElements: getTwoRandomElements(),
        goals: getTwoRandomGoals(),
        elementTilesBag: setupElementTilesBag(),
        horizontalPath: [],
        verticalPath: [],
        mountainBoard: [],
        automaticMovePhase: undefined
      }

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
        || ((filledSpacesInPaths(this.state) === 0) && (this.state.players.length === 2))
        || ((filledSpacesInPaths(this.state) === 1) && (this.state.players.length === 3))
        || ((filledSpacesInPaths(this.state) === 2) && (this.state.players.length === 4)))
        && (this.state.automaticMovePhase === undefined) && (this.state.activePlayer)) {
        return {type: MoveType.RefillPaths}
      }

      if (this.state.players.length === 2 && [2, 4, 6, 8].includes(filledSpacesInPaths(this.state))) {           // Adaptation for 2 players
        let twoPaths = this.state.horizontalPath.concat(this.state.verticalPath)
        let randomSpaceToRemove: number = getRandomInt(10)
        while (twoPaths[randomSpaceToRemove] === null) {
          randomSpaceToRemove = getRandomInt(10)
        }
        return {type: MoveType.RemoveTileOnPath, index: randomSpaceToRemove}
      }

      if (this.state.automaticMovePhase === AutomaticMovePhase.movingSeasonMarker) {
        return {type: MoveType.MoveSeasonMarker}
      } else if (this.state.automaticMovePhase === AutomaticMovePhase.scoreGoals) {
        return {type: MoveType.ScoreGoals}
      } else if (this.state.automaticMovePhase === AutomaticMovePhase.switchingFirstPlayer) {
        return {type: MoveType.SwitchFirstPlayer}
      } else if (this.state.automaticMovePhase === AutomaticMovePhase.scoreKeyElements) {
        return {type: MoveType.ScoreKeyElements}
      }

    }

    return getPredictableAutomaticMoves(this.state)
  }

  getLegalMoves(): Move[] {
    if (this.state.tilesToTake === undefined) {
      const moves: MoveTile[] = []
      for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
          if (this.state.horizontalPath[x] !== null) {
            moves.push({type: MoveType.MoveTile, path: 'horizontal', x, y})
          }
          if (this.state.verticalPath[y] !== null) {
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
      case MoveType.ScoreGoals:
        return scoreGoals(this.state)
      case MoveType.SwitchFirstPlayer:
        return switchFirstPlayer(this.state)
      case MoveType.MoveTile:
        return moveTile(this.state, move)
      case MoveType.TakeTile:
        return takeTile(this.state, move)
      case MoveType.ScoreKeyElements:
        return scoreKeyElements(this.state)
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

  rankPlayers(playerColorA: PlayerColor, playerColorB: PlayerColor): number {
    const playerA = this.state.players.find(player => player.color === playerColorA)
    const playerB = this.state.players.find(player => player.color === playerColorB)
    if (!playerA || !playerB) throw new Error('Cannot rank players which did not play the game!')
    if (playerA.score !== playerB.score) {
      return playerB.score - playerA.score
    } else {
      return playerA.understanding.reduce((sum, tiles) => sum + tiles, 0) - playerB.understanding.reduce((sum, tiles) => sum + tiles, 0)
    }
  }

  getScore(playerId: PlayerColor): number {
    const player = this.state.players.find(player => player.color === playerId)
    if (!player) throw new Error(`Cannot getScore of ${playerId} because he sis not play this game!`)
    return player.score
  }
}

function setupPlayers(players: GorintoPlayerOptions[]): Player[] {
  return players.map((options) => ({
    color: options.id, understanding: [0, 0, 0, 0, 0], score: 0
  }))
}

function getTwoRandomElements(): [Element, Element] {
  const shuffled = shuffle(elements)
  return [shuffled[0], shuffled[1]]
}

function getTwoRandomGoals(): [number, number] {
  const goalIds = shuffle(Array.from(Goals.keys()))
  const firstGoal = Goals[goalIds[0]]
  if (firstGoal.conflictLetter) {
    return [goalIds[0], goalIds.find(goalId => Goals[goalId].conflictLetter !== firstGoal.conflictLetter)!]
  } else {
    return [goalIds[0], goalIds[1]]
  }
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

function filledSpacesInPaths(game: GameState): number {
  return game.horizontalPath.reduce((sum, space) => space !== null ? sum + 1 : sum, 0)! +
    game.verticalPath.reduce((sum, space) => space !== null ? sum + 1 : sum, 0)!
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max))
}

export function getPlayer(game: GameState, color: PlayerColor): Player {
  return game.players.find(player => player.color === color)!
}