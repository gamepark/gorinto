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
    isTacticalRemove: boolean
    isCompassionRoundOrder: boolean
}

export function isGameOptions(arg: GameState | GorintoOptions): arg is GorintoOptions {
    return typeof (arg as GameState).season === 'undefined'
}

export const GorintoOptionsSpec: OptionsSpec<GorintoOptions> = {
    landscape: {
        label: (t: TFunction) => t('Landscape'),
        help: (t: TFunction) => t('landscape.help'),
        values: landscapes,
        valueSpec: landscape => ({
            label: t => {
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
                        return t('Hill diagram')
                }
            },
            subscriberRequired: landscape !== Landscape.Peak
        })
    },
    isTacticalRemove: {
        label: (t: Function) => t('tactical.rule'),
        help: (t: Function) => t('tactical.rule.help'),
        subscriberRequired: true
    },

    isCompassionRoundOrder: {
        label: (t: Function) => t('compassionate.rule'),
        help: (t: Function) => t('compassionate.rule.help')
    },

    players: {
        id: {
            label: (t: TFunction) => t('Player color'),
            values: playerColors,
            valueSpec: color => ({label: t => getPlayerName(color, t)})
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