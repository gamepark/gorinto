import {GameOptions, OptionsDescription, OptionType} from '@gamepark/rules-api'
import {TFunction} from 'i18next'
import Landscape, {landscapes} from './Landscape'
import GameState from './types/GameState'
import PlayerColor from './types/PlayerColor'

export type GorintoGameOptions = {
  landscape: Landscape
}

export type GorintoPlayerOptions = { id: PlayerColor }

export type GorintoOptions = GameOptions<GorintoGameOptions, GorintoPlayerOptions>

export function isGameOptions(arg: GameState | GorintoOptions): arg is GorintoOptions {
  return typeof (arg as GameState).season === 'undefined'
}

export const GorintoOptionsDescription: OptionsDescription<GorintoGameOptions, GorintoPlayerOptions> = {
  landscape: {
    type: OptionType.LIST,
    getLabel: (t: TFunction) => t('Mountain landscape'),
    values: landscapes,
    getValueLabel: (landscape, t) => {
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
  players: {
    id: {
      type: OptionType.LIST,
      getLabel: (t: TFunction) => t('Player color'),
      values: Object.values(PlayerColor),
      getValueLabel: getPlayerName
    }
  }
}

export function getPlayerName(playerId: PlayerColor, t: TFunction) {
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