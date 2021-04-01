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
            return t('You must take tiles from the mountain')
        } else {
            return t('{player} must take tiles from the mountain', {player: players.find(p => p.id === game.activePlayer)?.name ?? getPlayerName(game.activePlayer, t)})
        }
    } else {
        if (game.activePlayer === playerId) {
            return t("You have to move an element from one path to the mountain")
        } else {
           return t("{player} have to move an element from one path to the mountain", {player: players.find(p => p.id === game.activePlayer)?.name ?? getPlayerName(game.activePlayer, t)})
        }
    }
    return t('Connecting with the elements...')
}