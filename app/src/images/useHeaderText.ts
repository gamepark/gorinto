import {useGame, usePlayerId, usePlayers} from "@gamepark/react-client";
import GameView from "@gamepark/gorinto/types/GameView";
import PlayerColor from "@gamepark/gorinto/types/PlayerColor";
import {useTranslation} from "react-i18next";
import {getPlayerName} from "@gamepark/gorinto/GorintoOptions";

export default function useHeaderText() {
    const game = useGame<GameView>()
    const playerId = usePlayerId<PlayerColor>()
    const players = usePlayers()
    const {t} = useTranslation()

    if (!game) return t('Game loading...')
    if (!game.activePlayer) {
        return 'Game over' // TODO
    }
    if (game.tilesToTake) {
        if (game.activePlayer === playerId) {
            t('You must take tiles from the mountain')
        } else {
            t('{player} must take tiles from the mountain', {player: players.find(p => p.id === game.activePlayer)?.name ?? getPlayerName(game.activePlayer, t)})
        }
    } else {
        if (game.activePlayer === playerId) {
            // TODO
        } else {
            // TODO
        }
    }
    return t('Connecting with the elements...')
}