import {Action, Competitive, IncompleteInformation, Rules, TimeLimit, Undo} from '@gamepark/rules-api'
import { shuffle } from 'lodash'
import {Goals} from './cards/Goals'
import {GorintoOptions, GorintoPlayerOptions, isGameOptions} from './GorintoOptions'
import Landscape, {getLandscapeDiagram} from './Landscape'
import {changeActivePlayer, getNextPlayer, getNextPlayerWithCompassion} from './moves/ChangeActivePlayer'
import {moveSeasonMarker} from './moves/MoveSeasonMarker'
import MoveTile, {moveTile} from './moves/MoveTile'
import {fillPaths, getRefillPathsView, refillPaths} from './moves/RefillPaths'
import RemoveTileOnPath, {removeTileOnPath} from './moves/RemoveTileOnPath'
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

export default class Gorinto extends Rules<GameState, Move, PlayerColor>
    implements IncompleteInformation<GameView, Move, MoveView>,
        Competitive<GameState, Move, PlayerColor>, Undo<GameState, Move, PlayerColor>,
        TimeLimit<GameState, Move, PlayerColor> {

  constructor(state: GameState)
  constructor(options: GorintoOptions)
  constructor(arg: GameState | GorintoOptions) {
    if (isGameOptions(arg)) {
      const game: GameState = {
        season: 1,
        players: setupPlayers(arg.players),
        activePlayer: arg.players[0].id,
        firstPlayer: arg.players[0].id,
        keyElements: getTwoRandomElements(),
        goals: getTwoRandomGoals(),
        elementTilesBag: setupElementTilesBag(),
        horizontalPath: [null, null, null, null, null],
        verticalPath: [null, null, null, null, null],
        mountainBoard: [],
        isTacticalRemove:arg.isTacticalRemove,
        isCompassionRoundOrder:arg.isCompassionRoundOrder
      }

      fillPaths(game)
      game.mountainBoard = setupMountain(game, arg.landscape)
      setupCompassionOrder(game.players, arg.isCompassionRoundOrder)
      super(game)
    } else {
      super(arg)
    }
  }

  getActivePlayer() {
    return this.state.activePlayer
  }

  getAutomaticMoves(): Move[] {
    const move = this.getAutomaticMove()
    return move ? [move] : []
  }

  getAutomaticMove(): Move | undefined {
    if (this.state.endOfSeasonStep === MoveType.RefillPaths
      && this.state.horizontalPath.every(slot => slot === null)
      && this.state.verticalPath.every(slot => slot === null)) {
      return {type: MoveType.RefillPaths}
    } else if (this.state.tilesToTake && cantPickAnyTile(this.state.tilesToTake) && mustRemoveTileFromPaths(this.state)) {
      
      if (this.state.isTacticalRemove !== true){
        const tiles = this.state.horizontalPath.map((slot, index) => ({path: PathType.Horizontal, index, slot}))
        .concat(this.state.verticalPath.map((slot, index) => ({path: PathType.Vertical, index, slot})))
        .filter(option => option.slot !== null)
        const randomTile = tiles[Math.floor(Math.random() * Math.floor(tiles.length))]
        return {type: MoveType.RemoveTileOnPath, ...randomTile}
      } else {
        return
      }

    } else {
      return getPredictableAutomaticMoves(this.state)
    }
  }

  getLegalMoves(playerId: PlayerColor): Move[] {
    if (playerId !== this.getActivePlayer()) return []
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
      if (this.state.isTacticalRemove === true && cantPickAnyTile(this.state.tilesToTake) && mustRemoveTileFromPaths(this.state)){
        const removes : RemoveTileOnPath[] = []
        for (let i=0;i<5;i++){
          if (this.state.horizontalPath[i] !== null){
            removes.push({type:MoveType.RemoveTileOnPath, path:PathType.Horizontal,index:i})
          }
          if (this.state.verticalPath[i] !== null){
            removes.push({type:MoveType.RemoveTileOnPath, path:PathType.Vertical,index:i})
          }
        }
        return removes
      } else {

        const takes: TakeTile[] = []
        if (this.state.tilesToTake.element !== Element.Earth) {
          for (let item of this.state.tilesToTake.coordinates) {
            takes.push({type: MoveType.TakeTile, coordinates: item})
          }
        } else if (this.state.tilesToTake.coordinates.length > 0) {
          const {y, x} = this.state.tilesToTake.coordinates[0]
          for (let z = 0; z < this.state.mountainBoard[x][y].length - 1; z++) {
            takes.push({type: MoveType.TakeTile, coordinates: {x, y, z}})
          }
        }
        return takes

      }

    }
  }

  play(move: Move): Move[] {
    switch (move.type) {
      case MoveType.MoveTile:
        moveTile(this.state, move)
        break
      case MoveType.TakeTile:
        takeTile(this.state, move)
        break
      case MoveType.ChangeActivePlayer:
        changeActivePlayer(this.state)
        break
      case MoveType.ScoreGoals:
        scoreGoals(this.state)
        break
      case MoveType.MoveSeasonMarker:
        moveSeasonMarker(this.state)
        break
      case MoveType.RemoveTileOnPath:
        removeTileOnPath(this.state, move)
        break
      case MoveType.RefillPaths:
        refillPaths(this.state)
        break
      case MoveType.SwitchFirstPlayer:
        switchFirstPlayer(this.state)
        break
      case MoveType.ScoreKeyElements:
        scoreKeyElements(this.state)
        break
    }
    return []
  }

  getView(): GameView {
    const {elementTilesBag, ...view} = this.state
    return view
  }

  getMoveView(move: Move): MoveView {
    return move.type === MoveType.RefillPaths ? getRefillPathsView(this.state) : move
  }

  giveTime(playerId: PlayerColor): number {
    return 60
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

  canUndo(action: Action<Move, PlayerColor>, consecutiveActions: Action<Move, PlayerColor>[]): boolean {
    return canUndo(action, consecutiveActions)
  }
}

export function setupPlayers(players: GorintoPlayerOptions[]): Player[] {
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

function setupMountain(game: GameState, landscape: Landscape = Landscape.Peak): number[][][] {
  return getLandscapeDiagram(landscape).map(row => row.map(height => Array.from(Array(height)).map(() => game.elementTilesBag.pop()!)))
}

export function getPredictableAutomaticMoves(state: GameState | GameView): Move & MoveView | undefined {
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
  return
}

export function cantPickAnyTile(tilesToTake: TilesToTake): boolean {
  return tilesToTake.coordinates.length === 0 || tilesToTake.quantity === 0
}

export function mustRemoveTileFromPaths(state: GameState | GameView): boolean {
  if (state.players.length !== 2) return false
  const remainingTiles = countElements(state.horizontalPath) + countElements(state.verticalPath)
  return remainingTiles === 7 || remainingTiles === 5 || remainingTiles === 3
}

function seasonShouldEnd(state: GameState | GameView) {
  if (state.isCompassionRoundOrder !== true) {
    return getNextPlayer(state) === state.firstPlayer && countElements(state.horizontalPath) + countElements(state.verticalPath) < state.players.length
  } else {
    return getNextPlayerWithCompassion(state) === state.firstPlayer && countElements(state.horizontalPath) + countElements(state.verticalPath) < state.players.length
  }
}

function countElements(path: Path): number {
  return path.reduce((sum, slot) => slot !== null ? sum + 1 : sum, 0)
}

function setupCompassionOrder(players:Player[], isCompassionRoundOrder:boolean):void{
  isCompassionRoundOrder && players.forEach((p, i) => p.compassionOrder = i+1)
}

const immutableConsequences = [MoveType.ChangeActivePlayer, MoveType.ScoreGoals]

export function canUndo(action: Action<Move | MoveView, PlayerColor>, consecutiveActions: Action<Move | MoveView, PlayerColor>[]): boolean {
  return !consecutiveActions.length && !action.consequences.some(consequence => immutableConsequences.includes(consequence.type))
}