import {Action, Game} from '@gamepark/rules-api'
import {getPredictableAutomaticMoves} from './Gorinto'
import {changeActivePlayer} from './moves/ChangeActivePlayer'
import {moveSeasonMarker} from './moves/MoveSeasonMarker'
import {moveTile} from './moves/MoveTile'
import {refillPathsInView} from './moves/RefillPaths'
import {removeTileOnPath} from './moves/RemoveTileOnPath'
import {scoreGoals} from './moves/ScoreGoals'
import {scoreKeyElements} from './moves/ScoreKeyElements'
import {switchFirstPlayer} from './moves/SwitchFirstPlayer'
import {takeTile} from './moves/TakeTile'
import GameView from './types/GameView'
import MoveType from './types/MoveType'
import {MoveView} from './types/MoveView'
import Move from "./types/Move";
import PlayerColor from "./types/PlayerColor";

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
        return refillPathsInView(this.state, move)
      case MoveType.SwitchFirstPlayer:
        return switchFirstPlayer(this.state)
      case MoveType.ScoreKeyElements:
        return scoreKeyElements(this.state)
    }
  }

  canUndo(action: Action<MoveView, PlayerColor>, consecutiveActions: Action<MoveView, PlayerColor>[]): boolean {
  console.log(action)
  console.log(consecutiveActions)
    return !consecutiveActions.length && !action.consequences.some(consequence =>
        consequence.type === MoveType.ChangeActivePlayer || consequence.type === MoveType.RefillPaths
    )
  }
}