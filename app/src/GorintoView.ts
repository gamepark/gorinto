import {Action, Rules, Undo} from '@gamepark/rules-api'
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
import PlayerColor from '@gamepark/gorinto/types/PlayerColor'
import SetSelectedTileInPath, {ResetSelectedTileInPath, resetSelectedTileInPath, setSelectedTileInPath} from './moves/SetSelectedTileInPath'
import SetSelectedTilesInPile, {resetSelectedTilesInPile, ResetSelectedTilesInPile, setSelectedTilesInPath} from './moves/SetSelectedTilesInPile'

type LocalMove = MoveView | SetSelectedTileInPath | ResetSelectedTileInPath | SetSelectedTilesInPile | ResetSelectedTilesInPile

export default class GorintoView extends Rules<GameView, LocalMove, PlayerColor> implements Undo<GameView, MoveView, PlayerColor> {

  getActivePlayer() {
    return this.state.activePlayer
  }

  getAutomaticMoves(): MoveView[] {
    const move = getPredictableAutomaticMoves(this.state)
    return move ? [move] : []
  }

  play(move: LocalMove): MoveView[] {
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
        refillPathsInView(this.state, move)
        break
      case MoveType.SwitchFirstPlayer:
        switchFirstPlayer(this.state)
        break
      case MoveType.ScoreKeyElements:
        scoreKeyElements(this.state)
        break
      case 'SetSelectedTileInPath':
        setSelectedTileInPath(this.state, move)
        break
      case 'ResetSelectedTileInPath' :
        resetSelectedTileInPath(this.state, move)
        break
      case 'SetSelectedTilesInPile' :
        setSelectedTilesInPath(this.state, move)
        break
      case 'ResetSelectedTilesInPile' :
        resetSelectedTilesInPile(this.state, move)
        break
    }
    return []
  }

  canUndo(action: Action<MoveView, PlayerColor>, consecutiveActions: Action<MoveView, PlayerColor>[]): boolean {
    return canUndo(action, consecutiveActions)
  }
}