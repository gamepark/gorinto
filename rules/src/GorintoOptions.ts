import {GameOptions, OptionsDescription, OptionType} from '@gamepark/rules-api'
import {TFunction} from 'i18next'
import GameState from './types/GameState'
import PlayerColor from './types/PlayerColor'

export type GorintoPlayerOptions = { id: PlayerColor }

export type GorintoOptions = GameOptions<{}, GorintoPlayerOptions>

export function isGameOptions(arg: GameState | GorintoOptions): arg is GorintoOptions {
  return typeof (arg as GameState).season === 'undefined'
}

export const GorintoOptionsDescription: OptionsDescription<{}, GorintoPlayerOptions> = {
  players: {
    id: {
      type: OptionType.LIST,
      getLabel: (t: TFunction) => t('Empire'),
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