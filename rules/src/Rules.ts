import {IncompleteInformation, SequentialGame} from '@gamepark/rules-api'
import shuffle from 'lodash.shuffle'
import {elementDeck} from './cards/Elements'
import {Goals} from './cards/Goals'
import {Keys} from './cards/KeyElement'
import {cantPickAnyTile} from './moves/CantPickAnyTile'
import {countGoals} from './moves/CountGoals'
import {countKeys} from './moves/CountKeys'
import {determineWinner} from './moves/DetermineWinner'
import {moveSeasonMarker} from './moves/MoveSeasonMarker'
import MoveTile from './moves/MoveTile'
import {isRefillPathsView, refillPaths} from './moves/RefillPaths'
import {removeTileOnPath} from './moves/RemoveTileOnPath'
import {switchFirstPlayer} from './moves/SwitchFirstPlayer'
import TakeTile from './moves/TakeTile'
import AutomaticMovePhase from './types/AutomaticMovePhase'
import Element from './types/Element'
import ElementTile from './types/ElementTile'
import Game from './types/Game'
import GameView, {isGame} from './types/GameView'
import Move from './types/Move'
import MoveType from './types/MoveType'
import {MoveView} from './types/MoveView'
import Player from './types/Player'
import PlayerColor from './types/PlayerColor'

export default class Gorinto extends SequentialGame<Game | GameView, Move, PlayerColor>
  implements IncompleteInformation<Move, PlayerColor, GameView, MoveView> {
  constructor() // new game
  constructor(state: Game) // from saved state
  constructor(arg?: Game) {
    if (arg) {
      super(arg)
    } else {
      const game: Game = {
        season: 1,                 // Don't start at 4, even for debug
        players: setupPlayers(),
        activePlayer: PlayerColor.black,
        twoKeyElementCards: setupTwoKeyElementCards(),
        twoGoals: setupTwoGoals(),
        elementTilesDeck: setupElementTilesDeck(),
        horizontalPath: [],
        verticalPath: [],
        mountainBoard: [],
        automaticMovePhase: undefined
      }

      game.players = setupIsFirstPlayer(game)
      game.mountainBoard = setupMountain(game)

      super(game)
    }
  }

  getPlayerIds() {
    return this.state.players.map(player => player.color)
  }

  // noinspection JSUnusedGlobalSymbols
  getPlayerName(playerId: PlayerColor, t: (name: string) => string) {
    switch (playerId) {
      case PlayerColor.white:
        return t('White Player')
      case PlayerColor.black:
        return t('Black Player')
      case PlayerColor.red:
        return t('Red Player')
      case PlayerColor.yellow:
        return t('Yellow Player')
    }
  }

  getActivePlayer() {
    return this.state.activePlayer
  }

  getAutomaticMove() {    // (game start and we have to setup the paths) | (there's not enough tiles on the paths to make a whole game turn)
    if (isGame(this.state) && (this.state.tilesToTake === undefined)) {

      if (((this.state.horizontalPath.length === 0 && this.state.verticalPath.length === 0)
        || ((filledSpacesinPaths(this.state) === 0) && (this.state.players.length === 2))
        || ((filledSpacesinPaths(this.state) === 1) && (this.state.players.length === 3))
        || ((filledSpacesinPaths(this.state) === 2) && (this.state.players.length === 4)))
        && (this.state.automaticMovePhase === undefined) && (this.state.activePlayer)) {
        return refillPaths()
      }

      if (this.state.players.length === 2 && [2, 4, 6, 8].includes(filledSpacesinPaths(this.state))) {           // Adaptation for 2 players
        let twoPaths: (ElementTile | null) [] = this.state.horizontalPath.concat(this.state.verticalPath)
        let randomSpaceToRemove: number = getRandomInt(10)
        while (twoPaths[randomSpaceToRemove] === null) {
          randomSpaceToRemove = getRandomInt(10)
        }
        return removeTileOnPath(randomSpaceToRemove)
      }

      if (this.state.automaticMovePhase === AutomaticMovePhase.movingSeasonMarker) {
        return moveSeasonMarker()
      } else if (this.state.automaticMovePhase === AutomaticMovePhase.countingGoals) {
        return countGoals()
      } else if (this.state.automaticMovePhase === AutomaticMovePhase.switchingFirstPlayer) {
        return switchFirstPlayer()
      } else if (this.state.automaticMovePhase === AutomaticMovePhase.countingKeys) {
        return countKeys()
      } else if (this.state.automaticMovePhase === AutomaticMovePhase.determiningWinner) {
        return determineWinner()
      }

    }

    if (this.state.tilesToTake !== undefined && this.state.tilesToTake.coordinates.length === 0) {
      console.log('on CantPickTile')
      return cantPickAnyTile()
    }

    return
  }

  getLegalMoves(playerId: PlayerColor): Move[] {
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

  play(move: Move | MoveView, playerId: PlayerColor | undefined): void {
    console.log(move)
    console.log(this.state)
    console.log(playerId)

    switch (move.type) {

      case MoveType.CantPickAnyTile : {

        console.log('Il n\'y a pas de coup jouable. La main passe au joueur suivant.')

        const activePlayer: number = this.state.players.findIndex(player => player.color === this.state.activePlayer)!
        const nextPlayerIndex: number = (activePlayer + 1) % this.state.players.length
        this.state.activePlayer = this.state.players[nextPlayerIndex].color

        this.state.tilesToTake = undefined
        console.log('Fin du tour !')

        break

      }

      case MoveType.RefillPaths : {

        console.log("dans le RefillPath")

        if (this.state.season === 4) {
          this.state.automaticMovePhase = AutomaticMovePhase.movingSeasonMarker
        } else {
          if (isGame(this.state)) {

            if (this.state.horizontalPath.length !== 0) {
              this.state.automaticMovePhase = AutomaticMovePhase.movingSeasonMarker
            }
            this.state.horizontalPath = this.state.elementTilesDeck.splice(0, 5)
            this.state.verticalPath = this.state.elementTilesDeck.splice(0, 5)
          } else if (isRefillPathsView(move)) {

            this.state.horizontalPath = move.horizontalPath
            this.state.verticalPath = move.verticalPath

          }
        }

        break

      }

      case MoveType.RemoveTileOnPath : {

        console.log('Mode 2 joueurs : une tuile au hasard est retirée des chemins !')

        if (move.index < 5) {
          this.state.horizontalPath[move.index] = null
        } else {
          this.state.verticalPath[move.index - 5] = null
        }

        break

      }

      case MoveType.MoveSeasonMarker : {

        if (this.state.season === 4) {
          this.state.activePlayer = undefined
        } else {
          this.state.season++
        }

        this.state.automaticMovePhase = AutomaticMovePhase.countingGoals

        break

      }

      case MoveType.CountGoals : {

        for (let i = 0; i < this.state.twoGoals.length; i++) {
          for (let j = 0; j < this.state.players.length; j++) {
            const understandings: number[] = [this.state.players[j].understanding.void, this.state.players[j].understanding.wind, this.state.players[j].understanding.fire, this.state.players[j].understanding.water, this.state.players[j].understanding.earth]

            switch (this.state.twoGoals[i]) {

              case 0 : {

                for (let k = 0; k < 5; k++) {
                  const understandingsComparative: number[] = Array.from(understandings)
                  understandingsComparative.splice(k, 1)
                  if (understandings[k] === understandingsComparative[0]
                    || understandings[k] === understandingsComparative[1]
                    || understandings[k] === understandingsComparative[2]
                    || understandings[k] === understandingsComparative[3]) {
                    this.state.players[j].score = this.state.players[j].score + understandings[k]
                  }
                }

                break
              }
              case 1 : {

                for (let k = 0; k < 5; k++) {
                  const understandingsComparative: number[] = Array.from(understandings)
                  understandingsComparative.splice(k, 1)
                  if (understandings[k] !== understandingsComparative[0]
                    && understandings[k] !== understandingsComparative[1]
                    && understandings[k] !== understandingsComparative[2]
                    && understandings[k] !== understandingsComparative[3]) {
                    this.state.players[j].score = this.state.players[j].score + understandings[k]
                  }
                }

                break
              }
              case 2 : {

                for (let k = 0; k < 5; k++) {
                  if (understandings[k] % 2 === 1) {
                    this.state.players[j].score = this.state.players[j].score + understandings[k]
                  }
                }

                break
              }
              case 3 : {

                for (let k = 0; k < 5; k++) {
                  if (understandings[k] % 2 === 0) {
                    this.state.players[j].score = this.state.players[j].score + understandings[k]
                  }
                }

                break
              }
              case 4 : {

                const maxsUnderstandings: number[] = [0, 0, 0, 0, 0]
                for (let k = 0; k < this.state.players.length; k++) {
                  if (maxsUnderstandings[0] < this.state.players[k].understanding.void) {
                    maxsUnderstandings[0] = this.state.players[k].understanding.void
                  }
                  if (maxsUnderstandings[1] < this.state.players[k].understanding.wind) {
                    maxsUnderstandings[1] = this.state.players[k].understanding.wind
                  }
                  if (maxsUnderstandings[2] < this.state.players[k].understanding.fire) {
                    maxsUnderstandings[2] = this.state.players[k].understanding.fire
                  }
                  if (maxsUnderstandings[3] < this.state.players[k].understanding.water) {
                    maxsUnderstandings[3] = this.state.players[k].understanding.water
                  }
                  if (maxsUnderstandings[4] < this.state.players[k].understanding.earth) {
                    maxsUnderstandings[4] = this.state.players[k].understanding.earth
                  }
                }

                for (let k = 0; k < 5; k++) {
                  if (understandings[k] === maxsUnderstandings[k]) {
                    this.state.players[j].score = this.state.players[j].score + 3
                  }
                }

                break
              }
              case 5 : {

                const minsUnderstandings: number[] = [101, 101, 101, 101, 101]       //Maximum of tiles +1
                for (let k = 0; k < this.state.players.length; k++) {
                  if ((minsUnderstandings[0] > this.state.players[k].understanding.void) && (this.state.players[k].understanding.void !== 0)) {
                    minsUnderstandings[0] = this.state.players[k].understanding.void
                  }
                  if ((minsUnderstandings[1] > this.state.players[k].understanding.wind) && (this.state.players[k].understanding.wind !== 0)) {
                    minsUnderstandings[1] = this.state.players[k].understanding.wind
                  }
                  if ((minsUnderstandings[2] > this.state.players[k].understanding.fire) && (this.state.players[k].understanding.fire !== 0)) {
                    minsUnderstandings[2] = this.state.players[k].understanding.fire
                  }
                  if ((minsUnderstandings[3] > this.state.players[k].understanding.water) && (this.state.players[k].understanding.water !== 0)) {
                    minsUnderstandings[3] = this.state.players[k].understanding.water
                  }
                  if ((minsUnderstandings[4] > this.state.players[k].understanding.earth) && (this.state.players[k].understanding.earth !== 0)) {
                    minsUnderstandings[4] = this.state.players[k].understanding.earth
                  }
                }

                for (let k = 0; k < 5; k++) {
                  if (understandings[k] === minsUnderstandings[k]) {
                    this.state.players[j].score = this.state.players[j].score + 3
                  }
                }

                break
              }
              case 6 : {

                const sortedUnderstandings: number[] = (Array.from(understandings)).sort((a, b) => a - b)
                for (let k = 0; k < 5; k++) {
                  if (understandings[k] !== sortedUnderstandings[2]) {
                    this.state.players[j].score = this.state.players[j].score + understandings[k]
                  }
                }

                break
              }
              case 7 : {

                const sortedUnderstandings: number[] = (Array.from(understandings)).sort((a, b) => a - b)
                this.state.players[j].score = this.state.players[j].score + (sortedUnderstandings[2] * 3)

                break
              }
              case 8 : {

                const sortedUnderstandings: number[] = (Array.from(understandings)).sort((a, b) => a - b)
                const max: number = sortedUnderstandings[4]
                const min: number = sortedUnderstandings[0]

                for (let k = 0; k < 5; k++) {
                  if (understandings[k] === min || understandings[k] === max) {
                    this.state.players[j].score = this.state.players[j].score + understandings[k]
                  }
                }


                break
              }
              case 9 : {

                const sortedUnderstandings: number[] = (Array.from(understandings)).sort((a, b) => a - b)
                const max: number = sortedUnderstandings[4]
                let min: number = 101
                for (let k = 0; k < 5; k++) {
                  if (sortedUnderstandings[k] > 0 && sortedUnderstandings[k] < min) {
                    min = sortedUnderstandings[k]
                  }

                }
                this.state.players[j].score = this.state.players[j].score + (max + 2 * min)

                break
              }
              case 10 : {

                const sortedUnderstandings: number[] = (Array.from(understandings)).sort((a, b) => a - b)
                const difference: number = sortedUnderstandings[4] - sortedUnderstandings[0]
                this.state.players[j].score = this.state.players[j].score + (difference * 2)

                break
              }
              case 11 : {

                const shortestStack: number = (Array.from(understandings)).sort((a, b) => a - b)[0]
                if (shortestStack !== 0) {
                  this.state.players[j].score = this.state.players[j].score + (shortestStack * 7)
                }

                break
              }
            }

          }

        }

        if (this.state.season === 4 && this.state.activePlayer === undefined) {
          this.state.automaticMovePhase = AutomaticMovePhase.countingKeys
        } else {
          this.state.automaticMovePhase = AutomaticMovePhase.switchingFirstPlayer
        }

        break
      }

      case MoveType.SwitchFirstPlayer : {

        let firstPlayerNumber: number = 0
        let smallestScore: number = 101


        for (let i = 0; i < this.state.players.length; i++) {
          if (this.state.players[i].isFirst) {
            firstPlayerNumber = i
            this.state.players[i].isFirst = false
            break
          }
        }

        for (let i = firstPlayerNumber; i < firstPlayerNumber + this.state.players.length; i++) {
          if (this.state.players[i % this.state.players.length].score < smallestScore) {
            smallestScore = this.state.players[i % this.state.players.length].score
          }
        }

        for (let i = firstPlayerNumber; i < firstPlayerNumber + this.state.players.length; i++) {
          if (this.state.players[i % this.state.players.length].score === smallestScore) {
            this.state.players[i % this.state.players.length].isFirst = true
            this.state.activePlayer = this.state.players[i % this.state.players.length].color
            break
          }
        }

        this.state.automaticMovePhase = undefined

        break

      }

      case MoveType.CountKeys : {

        for (let i = 0; i < this.state.twoKeyElementCards.length; i++) {
          for (let j = 0; j < this.state.players.length; j++) {
            const understandings: number[] = [this.state.players[j].understanding.void, this.state.players[j].understanding.wind, this.state.players[j].understanding.fire, this.state.players[j].understanding.water, this.state.players[j].understanding.earth]

            switch (this.state.twoKeyElementCards[i]) {

              case 0 : {
                this.state.players[j].score = this.state.players[j].score + 2 * understandings[0]
                break
              }
              case 1 : {
                this.state.players[j].score = this.state.players[j].score + 2 * understandings[1]
                break
              }
              case 2 : {
                this.state.players[j].score = this.state.players[j].score + 2 * understandings[2]
                break
              }
              case 3 : {
                this.state.players[j].score = this.state.players[j].score + 2 * understandings[3]
                break
              }
              case 4 : {
                this.state.players[j].score = this.state.players[j].score + 2 * understandings[4]
                break
              }

            }
          }
        }

        this.state.automaticMovePhase = AutomaticMovePhase.determiningWinner

        break

      }

      case MoveType.DetermineWinner : {

        console.log('Fin de la partie !')

        let maxScore: number = 0
        let minTiles: number = 101
        let winners: Player[] = []

        for (let i = 0; i < this.state.players.length; i++) {
          if (this.state.players[i].score >= maxScore) {
            if (this.state.players[i].score > maxScore) {
              maxScore = this.state.players[i].score
              minTiles = tilesOwnedByAPlayer(this.state.players[i])
            } else {
              if (tilesOwnedByAPlayer(this.state.players[i]) < minTiles) {
                minTiles = tilesOwnedByAPlayer(this.state.players[i])
              }
            }
          }
        }

        console.log('MaxScore : ', maxScore, ', minTiles : ', minTiles)

        for (let i = 0; i < this.state.players.length; i++) {

          if (this.state.players[i].score === maxScore && tilesOwnedByAPlayer(this.state.players[i]) === minTiles) {
            winners.push(this.state.players[i])
          }

        }
        console.log(winners)

        if (winners.length === 1) {
          console.log(winners[0].color + ' remporte la partie avec ' + winners[0].score + ' points de sagesse !')
        } else {
          console.log('Les joueurs partagent une victoire harmonieuse !')
        }

        this.state.automaticMovePhase = undefined

        break

      }

      case MoveType.MoveTile : {

        const element = move.path === 'horizontal' ? this.state.horizontalPath[move.x] : this.state.verticalPath[move.y]

        this.state.mountainBoard[move.x][move.y].push(element!)

        if (move.path === 'horizontal') {
          this.state.horizontalPath[move.x] = null
        } else {
          this.state.verticalPath[move.y] = null
        }

        // game.tilesToTakes

        let activePlayer: Player = this.state.players.find(player => player.color === this.state.activePlayer)!

        const elem: Element | undefined = element?.element

        switch (elem) {       // One Pattern is required for each element
          case 'void' : {
            this.state.tilesToTake = {
              quantity: activePlayer.understanding.void + 1,
              coordinates: [{x: move.x + 1, y: move.y + 1}, {x: move.x + 1, y: move.y - 1}, {x: move.x - 1, y: move.y + 1}, {x: move.x - 1, y: move.y - 1}],    // Void Pattern
              element: elem
            }

            this.state.tilesToTake.coordinates = this.state.tilesToTake.coordinates.filter(coord => ((coord.x > -1 && coord.x < 5) && (coord.y > -1 && coord.y < 5)))    // Filtering tiles out of the board

            break
          }
          case 'wind' : {
            this.state.tilesToTake = {
              quantity: activePlayer.understanding.wind + 1,
              coordinates: [{x: move.x + 1, y: move.y}, {x: move.x - 1, y: move.y}, {x: move.x, y: move.y + 1}, {x: move.x, y: move.y - 1}],      // Wind Pattern
              element: elem
            }

            this.state.tilesToTake.coordinates = this.state.tilesToTake.coordinates.filter(coord => ((coord.x > -1 && coord.x < 5) && (coord.y > -1 && coord.y < 5)))    // Filtering tiles out of the board

            break
          }
          case 'fire' : {
            const firePattern: { x: number, y: number }[] = [{x: move.x, y: 0}, {x: move.x, y: 1}, {x: move.x, y: 2}, {x: move.x, y: 3}, {x: move.x, y: 4}]
            firePattern.splice(move.y, 1)
            this.state.tilesToTake = {
              quantity: activePlayer.understanding.fire + 1,
              coordinates: firePattern,
              element: elem
            }
            break
          }
          case 'water' : {
            const waterPattern: { x: number, y: number }[] = [{x: 0, y: move.y}, {x: 1, y: move.y}, {x: 2, y: move.y}, {x: 3, y: move.y}, {x: 4, y: move.y}]
            waterPattern.splice(move.x, 1)
            this.state.tilesToTake = {
              quantity: activePlayer.understanding.water + 1,
              coordinates: waterPattern,
              element: elem
            }
            break
          }
          case 'earth' : {
            this.state.tilesToTake = {
              quantity: activePlayer.understanding.earth + 1,
              coordinates: [{x: move.x, y: move.y}],
              element: elem
            }
            break
          }
        }

        this.state.tilesToTake?.coordinates.forEach(coord => {
            if (this.state.mountainBoard[coord.x][coord.y].length === 0) {
              this.state.tilesToTake?.coordinates.splice(this.state.tilesToTake.coordinates.indexOf(coord), 1)
            }
          }
        )

        if (this.state.tilesToTake?.element === Element.Earth) {
          if (this.state.mountainBoard[this.state.tilesToTake.coordinates[0].x][this.state.tilesToTake.coordinates[0].y].length === 1) {
            this.state.tilesToTake.coordinates.splice(0, 1)
          }
        }

        break

      }

      case MoveType.TakeTile : {

        let elem: Element | undefined = undefined

        if (move.coordinates.z === undefined) {
          elem = this.state.mountainBoard[move.coordinates.x][move.coordinates.y][this.state.mountainBoard[move.coordinates.x][move.coordinates.y].length - 1]?.element
        } else {
          elem = this.state.mountainBoard[move.coordinates.x][move.coordinates.y][move.coordinates.z].element
        }

        let activePlayer: number = this.state.players.findIndex(player => player.color === this.state.activePlayer)!

        if (this.state.tilesToTake?.element !== Element.Earth) {
          this.state.mountainBoard[move.coordinates.x][move.coordinates.y].pop()
        } else {
          this.state.mountainBoard[move.coordinates.x][move.coordinates.y].splice(move.coordinates.z!, 1)
        }

        switch (elem) {
          case 'void' : {
            this.state.players[activePlayer].understanding.void++
            break
          }
          case 'wind' : {
            this.state.players[activePlayer].understanding.wind++
            break
          }
          case 'fire' : {
            this.state.players[activePlayer].understanding.fire++
            break
          }
          case 'water' : {
            this.state.players[activePlayer].understanding.water++
            break
          }
          case 'earth' : {
            this.state.players[activePlayer].understanding.earth++
            break
          }
        }

        this.state.tilesToTake!.quantity--

        if (this.state.tilesToTake?.element !== 'earth') {
          this.state.tilesToTake?.coordinates.splice(this.state.tilesToTake.coordinates.findIndex(coord => (coord.x === move.coordinates.x) && (coord.y === move.coordinates.y)), 1)
        }

        if ((this.state.tilesToTake!.quantity === 0) || (this.state.tilesToTake?.coordinates.length === 0) || ((this.state.tilesToTake?.element === 'earth') && (this.state.mountainBoard[move.coordinates.x][move.coordinates.y].length === 1))) {
          this.state.tilesToTake = undefined
          console.log('Fin du tour !')

          const nextPlayerIndex = (activePlayer + 1) % this.state.players.length
          this.state.activePlayer = this.state.players[nextPlayerIndex].color

        }


      }

    }
  }

  getView(playerId?: PlayerColor): GameView {
    const {elementTilesDeck, ...view} = this.state as Game
    return view
  }

  getMoveView(move: Move, playerId?: PlayerColor): MoveView {
    const game = this.state as Game
    if (move.type === MoveType.RefillPaths) {
      return {...move, horizontalPath: game.horizontalPath, verticalPath: game.verticalPath}
    } else {
      return move
    }

  }
}

function setupPlayers(): Player[] {
  return [
    {color: PlayerColor.black, understanding: {void: 0, wind: 0, fire: 0, water: 0, earth: 0}, score: 0, isFirst: true},
    {color: PlayerColor.white, understanding: {void: 0, wind: 0, fire: 0, water: 0, earth: 0}, score: 0, isFirst: false}
  ]

}

function setupIsFirstPlayer(game: Game): Player[] {
  let result: Player[] = game.players
  for (let i = 0; i < game.players.length; i++) {
    if (result[i].color === game.activePlayer) {
      result[i].isFirst = true
    } else {
      result[i].isFirst = false
    }
  }
  return result
}

function setupTwoKeyElementCards(): number[] {
  const result: number[] = shuffle(Array.from(Keys.keys()))     // Take only the key, not all infos with heavy pictures
  return [result[0], result[1]]
}

function setupTwoGoals(): number[] {
  const arrayGoalCards: number[] = shuffle(Array.from(Goals.keys()))    // Take only the key, not all infos with heavy pictures
  const result: number[] = []
  const conflictLetters: string[] = []
  arrayGoalCards.forEach(element => {
    const goal = Goals[element]

    if (goal.conflictLetter === '') {
      result.push(element)
    } else if (conflictLetters.includes(goal.conflictLetter) === false) {
      result.push(element)
    }
  })

  return [result[0], result[1]]

}

function setupElementTilesDeck(): ElementTile[] {
  const result = shuffle(Array.from(elementDeck))           // Modifier ici avec .keys()
  return result
}

function setupMountain(game: Game): ElementTile[][][] {
  let i, j: number = 0
  let result: ElementTile[][][] = []
  for (i = 0; i < 5; i++) {
    result[i] = []
    for (j = 0; j < 5; j++) {
      result[i][j] = []
      result[i][j][0] = game.elementTilesDeck.pop() !    // Escaped the "pop undefined" issue
      result[i][j][1] = game.elementTilesDeck.pop() !    // Same
    }
  }
  for (i = 1; i < 4; i++) {
    for (j = 1; j < 4; j++) {
      result[i][j][2] = game.elementTilesDeck.pop() !      // Same
    }
  }
  result[2][2][3] = game.elementTilesDeck.pop() !         // Same
  return result
}

function filledSpacesinPaths(game: Game): number {

  return game.horizontalPath.reduce((sum, space) => space ? sum + 1 : sum, 0) +
    game.verticalPath.reduce((sum, space) => space ? sum + 1 : sum, 0)
}

function tilesOwnedByAPlayer(player: Player): number {

  return player.understanding.void + player.understanding.wind + player.understanding.fire + player.understanding.water + player.understanding.earth

}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max))
}