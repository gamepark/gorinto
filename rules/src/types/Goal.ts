import {TFunction} from 'i18next'
import GameState from './GameState'
import GameView from './GameView'
import Player from './Player'

type Goal = {
  hint?: (t: TFunction) => string;
  text: (t: TFunction) => string;
  conflictLetter?: 'A' | 'B' | 'C' | 'D';
  score: (player: Player, state: GameState | GameView) => number
}

export default Goal