import { OptionsSpecV2 } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
import Landscape, {landscapes} from './Landscape'
import GameState from './types/GameState'
import PlayerColor, {playerColors} from './types/PlayerColor'

export type GorintoPlayerOptions = {
    id: PlayerColor
}

export type GorintoOptions = {
    players: GorintoPlayerOptions[]
    landscape: Landscape
    isTacticalRemove: boolean
    isCompassionRoundOrder: boolean
}

export function isGameOptions(arg: GameState | GorintoOptions): arg is GorintoOptions {
    return typeof (arg as GameState).season === 'undefined'
}

/**
 * The option space of gorinto: structure only.
 *
 * Labels live in the game's presentation document, published beside its translations at
 * `/options/<locale>.json` and keyed by convention. Subscription and competitive gates live in
 * the platform database, so they can change without releasing the game again.
 *
 * That is where the subscription gates went.
 */
export const GorintoOptionsSpecV2: OptionsSpecV2 = {
  specVersion: 2,
  players: { min: 2, max: 4 },
  identities: { values: playerColors },
  options: {
    landscape: { kind: 'enum', values: landscapes },
    isTacticalRemove: { kind: 'boolean' },
    isCompassionRoundOrder: { kind: 'boolean' }
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