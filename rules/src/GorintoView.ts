import {Game} from '@gamepark/rules-api'
import {changeActivePlayer} from './moves/ChangeActivePlayer'
import {countGoals} from './moves/CountGoals'
import {countKeys} from './moves/CountKeys'
import {moveSeasonMarker} from './moves/MoveSeasonMarker'
import {moveTile} from './moves/MoveTile'
import {refillPathInView} from './moves/RefillPaths'
import {removeTileOnPath} from './moves/RemoveTileOnPath'
import {switchFirstPlayer} from './moves/SwitchFirstPlayer'
import {takeTile} from './moves/TakeTile'
import {getPredictableAutomaticMoves} from './Rules'
import GameView from './types/GameView'
import MoveType from './types/MoveType'
import {MoveView} from './types/MoveView'

export default class GorintoView implements Game<GameView, MoveView> {
  state: GameView

  constructor(state: GameView) {
    this.state = state
  }

  getAutomaticMove(): MoveView | void {
    return getPredictableAutomaticMoves(this.state)
  }

  play(move: MoveView): void {
    switch (move.type) {
      case MoveType.ChangeActivePlayer:
        return changeActivePlayer(this.state)
      case MoveType.RefillPaths:
        return refillPathInView(this.state, move)
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
      case MoveType.MoveTile:
        return moveTile(this.state, move)
      case MoveType.TakeTile:
        return takeTile(this.state, move)
    }
  }
}