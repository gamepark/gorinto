import {Action, Game, Undo} from '@gamepark/rules-api'
import {canUndo, getPredictableAutomaticMoves} from '@gamepark/gorinto/Gorinto'
import {changeActivePlayer} from '@gamepark/gorinto/moves/ChangeActivePlayer'
import {moveSeasonMarker} from '@gamepark/gorinto/moves/MoveSeasonMarker'
import {moveTile} from '@gamepark/gorinto/moves/MoveTile'
import {refillPathsInView} from '@gamepark/gorinto/moves/RefillPaths'
import {removeTileOnPath} from '@gamepark/gorinto/moves/RemoveTileOnPath'
import {scoreGoals} from '@gamepark/gorinto/moves/ScoreGoals'
import {scoreKeyElements} from '@gamepark/gorinto/moves/ScoreKeyElements'
import {switchFirstPlayer} from '@gamepark/gorinto/moves/SwitchFirstPlayer'
import {takeTile} from '@gamepark/gorinto/moves/TakeTile'
import GameView from '@gamepark/gorinto/types/GameView'
import MoveType from '@gamepark/gorinto/types/MoveType'
import {MoveView} from '@gamepark/gorinto/types/MoveView'
import PlayerColor from "@gamepark/gorinto/types/PlayerColor"
import SetSelectedTileInPath, { ResetSelectedTileInPath, resetSelectedTileInPath, setSelectedTileInPath } from './moves/SetSelectedTileInPath'

type LocalMove = MoveView | SetSelectedTileInPath | ResetSelectedTileInPath

export default class GorintoView implements Game<GameView, LocalMove>, Undo<GameView, MoveView, PlayerColor> {
  state: GameView

  constructor(state: GameView) {
    this.state = state
  }

  getAutomaticMove(): MoveView | void {
    return getPredictableAutomaticMoves(this.state)
  }

  play(move: LocalMove): void {
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
      case 'SetSelectedTileInPath':
        return setSelectedTileInPath(this.state,move)
      case 'ResetSelectedTileInPath' : 
        return resetSelectedTileInPath(this.state,move)
    }
  }

  canUndo(action: Action<MoveView, PlayerColor>, consecutiveActions: Action<MoveView, PlayerColor>[]): boolean {
    return canUndo(action, consecutiveActions)
  }
}