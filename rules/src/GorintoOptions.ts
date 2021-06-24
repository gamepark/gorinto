import {OptionsSpec} from '@gamepark/rules-api'
import {TFunction} from 'i18next'
import Landscape, {landscapes} from './Landscape'
import GameState from './types/GameState'
import PlayerColor, {playerColors} from './types/PlayerColor'

export type GorintoPlayerOptions = {
  id: PlayerColor
}

export type GorintoOptions = {
  players: GorintoPlayerOptions[]
  landscape: Landscape
  isTacticalRemove : boolean
  isCompassionRoundOrder : boolean
}

export function isGameOptions(arg: GameState | GorintoOptions): arg is GorintoOptions {
  return typeof (arg as GameState).season === 'undefined'
}

export const GorintoOptionsSpec: OptionsSpec<GorintoOptions> = {
  landscape: {
    label: (t: TFunction) => t('Mountain landscape'),
    values: landscapes,
    valueLabel: (landscape, t) => {
      switch (landscape) {
        case Landscape.Peak:
          return t('Peak diagram')
        case Landscape.Waves:
          return t('Waves diagram')
        case Landscape.Mesa:
          return t('Mesa diagram')
        case Landscape.Lake:
          return t('Lake diagram')
        case Landscape.Hill:
          return t('Peak diagram')
      }
    }
  },
  isTacticalRemove:{
    label:(t:Function) => t('Tactical rule for 2 Players')
  },

  isCompassionRoundOrder:{
    label:(t:Function) => t('Compassion Round Order')
  },

  players: {
    id: {
      label: (t: TFunction) => t('Player color'),
      values: playerColors,
      valueLabel: getPlayerName
    }
  }
}

export function getPlayerName(playerId: PlayerColor, t: TFunction) {
  switch (playerId) {
    case PlayerColor.White:
      return t('White Player')
    case PlayerColor.Black:
      return t('Black Player')
    case PlayerColor.Red:
      return t('Red Player')
    case PlayerColor.Yellow:
      return t('Yellow Player')
  }
}