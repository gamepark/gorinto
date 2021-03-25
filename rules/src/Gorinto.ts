import {Competitive, IncompleteInformation, SequentialGame} from '@gamepark/rules-api'
import shuffle from 'lodash.shuffle'
import {Goals} from './cards/Goals'
import {GorintoOptions, GorintoPlayerOptions, isGameOptions} from './GorintoOptions'
import {changeActivePlayer, getNextPlayer} from './moves/ChangeActivePlayer'
import {moveSeasonMarker} from './moves/MoveSeasonMarker'
import MoveTile, {moveTile} from './moves/MoveTile'
import {fillPaths, refillPaths} from './moves/RefillPaths'
import {removeTileOnPath} from './moves/RemoveTileOnPath'
import {scoreGoals} from './moves/ScoreGoals'
import {scoreKeyElements} from './moves/ScoreKeyElements'
import {switchFirstPlayer} from './moves/SwitchFirstPlayer'
import TakeTile, {takeTile} from './moves/TakeTile'
import Element, {elements, numberOfEachElement} from './types/Element'
import GameState from './types/GameState'
import GameView from './types/GameView'
import Move from './types/Move'
import MoveType from './types/MoveType'
import {MoveView} from './types/MoveView'
import Path from './types/Path'
import PathType from './types/PathType'
import Player from './types/Player'
import PlayerColor from './types/PlayerColor'
import TilesToTake from './types/TilesToTake'

const numberOfSeasons = 4

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
        horizontalPath: [null, null, null, null, null],
        verticalPath: [null, null, null, null, null],
        mountainBoard: []
      }

      fillPaths(game)
      game.mountainBoard = setupMountain(game)

      super(game)
    } else {
      super(arg)
    }
  }

  getActivePlayer() {
    return this.state.activePlayer
  }

  getAutomaticMove(): Move | void {
    if (this.state.endOfSeasonStep === MoveType.RefillPaths
      && this.state.horizontalPath.every(slot => slot === null)
      && this.state.verticalPath.every(slot => slot === null)) {
      return {type: MoveType.RefillPaths}
    } else if (this.state.tilesToTake && cantPickAnyTile(this.state.tilesToTake) && mustRemoveTileFromPaths(this.state)) {
      // TODO: option for tactical method, in which case it won't be automatic but chosen
      const tiles = this.state.horizontalPath.map((slot, index) => ({path: PathType.Horizontal, index, slot}))
        .concat(this.state.verticalPath.map((slot, index) => ({path: PathType.Vertical, index, slot})))
        .filter(option => option.slot !== null)
      const randomTile = tiles[getRandomInt(tiles.length)]
      return {type: MoveType.RemoveTileOnPath, ...randomTile}
    } else {
      return getPredictableAutomaticMoves(this.state)
    }
  }

  getLegalMoves(): Move[] {
    if (this.state.tilesToTake === undefined) {
      const moves: MoveTile[] = []
      for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
          if (this.state.horizontalPath[x] !== null) {
            moves.push({type: MoveType.MoveTile, path: PathType.Horizontal, x, y})
          }
          if (this.state.verticalPath[y] !== null) {
            moves.push({type: MoveType.MoveTile, path: PathType.Vertical, x, y})
          }
        }
      }
      return moves
    } else {
      const takes: TakeTile[] = []
      if (this.state.tilesToTake.element !== Element.Earth) {
        for (let i = 0; i < this.state.tilesToTake.coordinates.length; i++) {
          takes.push({type: MoveType.TakeTile, coordinates: {x: this.state.tilesToTake.coordinates[i].x, y: this.state.tilesToTake.coordinates[i].y}})
        }
      } else if (this.state.tilesToTake.coordinates.length > 0) {
        for (let z = 0; z < this.state.mountainBoard[this.state.tilesToTake.coordinates[0].x][this.state.tilesToTake.coordinates[0].y].length - 1; z++) {
          takes.push({type: MoveType.TakeTile, coordinates: {x: this.state.tilesToTake.coordinates[0].x, y: this.state.tilesToTake.coordinates[0].y, z}})
        }
      }
      return takes
    }
  }

  play(move: Move): void {
    switch (move.type) {
      case MoveType.MoveTile:
        return moveTile(this.state, move)
      case MoveType.TakeTile:
        return takeTile(this.state, move)
      case MoveType.ChangeActivePlayer:
        return changeActivePlayer(this.state)
      case MoveType.ScoreGoals:
        return scoreGoals(this.state)
      case MoveType.MoveSeasonMarker:
        return moveSeasonMarker(this.state)
      case MoveType.RemoveTileOnPath:
        return removeTileOnPath(this.state, move)
      case MoveType.RefillPaths:
        return refillPaths(this.state)
      case MoveType.SwitchFirstPlayer:
        return switchFirstPlayer(this.state)
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
  if (state.endOfSeasonStep !== undefined) {
    if (state.endOfSeasonStep === MoveType.MoveSeasonMarker && state.season === numberOfSeasons) {
      if (state.activePlayer !== undefined) {
        return {type: MoveType.ScoreKeyElements}
      }
    } else if (state.endOfSeasonStep === MoveType.RefillPaths) {
      const horizontalPathTileIndex = state.horizontalPath.findIndex(slot => slot !== null)
      if (horizontalPathTileIndex !== -1) {
        return {type: MoveType.RemoveTileOnPath, path: PathType.Horizontal, index: horizontalPathTileIndex}
      }
      const verticalPathTileIndex = state.verticalPath.findIndex(slot => slot !== null)
      if (verticalPathTileIndex !== -1) {
        return {type: MoveType.RemoveTileOnPath, path: PathType.Vertical, index: verticalPathTileIndex}
      }
    } else {
      return {type: state.endOfSeasonStep}
    }
  } else if (state.tilesToTake && cantPickAnyTile(state.tilesToTake) && !mustRemoveTileFromPaths(state)) {
    if (seasonShouldEnd(state)) {
      return {type: MoveType.ScoreGoals}
    } else {
      return {type: MoveType.ChangeActivePlayer}
    }
  }
}

function cantPickAnyTile(tilesToTake: TilesToTake): boolean {
  return tilesToTake.coordinates.length === 0 || tilesToTake.quantity === 0
}

function mustRemoveTileFromPaths(state: GameState | GameView): boolean {
  if (state.players.length !== 2) return false
  const remainingTiles = countElements(state.horizontalPath) + countElements(state.verticalPath)
  return remainingTiles === 7 || remainingTiles === 5 || remainingTiles === 3
}

function seasonShouldEnd(state: GameState | GameView) {
  return getNextPlayer(state) === state.firstPlayer && countElements(state.horizontalPath) + countElements(state.verticalPath) < state.players.length
}

function countElements(path: Path): number {
  return path.reduce((sum, slot) => slot !== null ? sum + 1 : sum, 0)
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max))
}

export function getPlayer(game: GameState, color: PlayerColor): Player {
  return game.players.find(player => player.color === color)!
}