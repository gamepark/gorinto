import GameView from "@gamepark/gorinto/types/GameView";
import {Player as PlayerInfo, usePlayerId, usePlayers} from "@gamepark/react-client";
import PlayerColor from "@gamepark/gorinto/types/PlayerColor";
import {useTranslation} from "react-i18next";
import Player from "@gamepark/gorinto/types/Player";
import {getPlayerName} from "@gamepark/gorinto/GorintoOptions";
import {TFunction} from "i18next";
import MoveType from "@gamepark/gorinto/types/MoveType";
import Element from "@gamepark/gorinto/types/Element";
import TilesToTake from "@gamepark/gorinto/types/TilesToTake";
import { useEffect, useState } from "react";

type Props = {
    game?: GameView
    loading: boolean
}

export default function HeaderText({loading, game}: Props) {
    const {t} = useTranslation()
    if (loading || !game) {
        return <>{t('Game loading...')}</>
    }
    if (game.activePlayer) {
        return <HeaderOngoingGameText game={game} activePlayer={game.activePlayer}/>
    } else {
        return <HeaderGameOverText game={game}/>
    }
}

function HeaderOngoingGameText({game, activePlayer}: { game: GameView, activePlayer: PlayerColor }) {
    const {t} = useTranslation()
    const playerId = usePlayerId<PlayerColor>()
    const players = usePlayers<PlayerColor>()
    switch (game.endOfSeasonStep) {
        case MoveType.MoveSeasonMarker:
            return <>{t('The season is cleared. Moving to the next season...')}</>
        case MoveType.RefillPaths:
            return <>{t('Refilling paths in progress...')}</>
        case MoveType.SwitchFirstPlayer:
            if(game.isCompassionRoundOrder === true){
                return <>{t('Redistributing the Round Order tiles with compassion...')}</>
            } else {
                return <>{t('Passing the Start coin...')}</>
            }
    }
    if (!game.tilesToTake) {
        if (activePlayer === playerId) {
            return <>{t("you.must.move")}</>
        }
        return <>{t("player.must.move", {player: players.find(p => p.id === activePlayer)?.name ?? getPlayerName(activePlayer, t)})}</>
    }
    const quantity = getNumberOfTilesToTake(game.tilesToTake, game.mountainBoard)
    if (quantity > 0) {
        if (activePlayer === playerId) {
            return <>{t('you.must.take', {quantity})}</>
        }
        return <>{t('player.must.take', {player: players.find(p => p.id === activePlayer)?.name ?? getPlayerName(activePlayer, t), quantity})}</>
    } else {
        if (game.isTacticalRemove === true){
            if (activePlayer === playerId) {
                return <>{t('you.tactical.remove')}</>
            } else {
                return <>{t('player.tactical.remove')}</>
            }
        } else {
            return <>{t('removing.tile')}</>
        }
        
    }

}

function getNumberOfTilesToTake(tilesToTake: TilesToTake, mountainBoard: Element[][][]) {
    if (tilesToTake.element !== Element.Earth) {
        return Math.min(tilesToTake.quantity, tilesToTake.coordinates.length);
    }
    if (tilesToTake.coordinates.length === 0) {
        return 0;
    }
    return Math.min(tilesToTake.quantity, mountainBoard[tilesToTake.coordinates[0].x][tilesToTake.coordinates[0].y].length - 1);
}

function HeaderGameOverText({game}: { game: GameView }) {
    const {t} = useTranslation()
    const playerId = usePlayerId<PlayerColor>()
    const player = game!.players.find(player => player.color === playerId)
    const players = usePlayers<PlayerColor>()
    let highestScore = -1;
    let playersWithHighestScore: Player[] = [];
    const [scoreSuspense, setScoreSuspense] = useState(true)

    useEffect(() => {
        if (game.activePlayer === undefined) {
          setTimeout(() => setScoreSuspense(false), 5000)
        } 
      }, [game, setScoreSuspense])

    if (scoreSuspense === true){
        return <>{t('score.suspens')}</>
    }

    for (const p of game.players) {
        const score = p.score;
        if (score >= highestScore) {
            if (score > highestScore) {
                playersWithHighestScore = [];
                highestScore = score;
            }
            playersWithHighestScore.push(p)
        }
    }

    if (playersWithHighestScore.length === 1) {
        if (player === playersWithHighestScore[0]) {
            return <>{t('you.win', {score: highestScore})}</>
        }
        return <>{t('player.wins', {player: getWinnerPseudo(playersWithHighestScore[0], players, t), score: highestScore})}</>
    }

    let fewestTiles = 101;
    let playersWithFewestTiles = [];
    for (const p of playersWithHighestScore) {
        if (p.understanding.reduce((acc, pile) => pile + acc) <= fewestTiles) {
            if (p.understanding.reduce((acc, pile) => pile + acc) < fewestTiles) {
                playersWithFewestTiles = []
                fewestTiles = p.understanding.reduce((acc, pile) => acc + pile)
            }
            playersWithFewestTiles.push(p)
        }
    }

    switch (playersWithFewestTiles.length) {
        case 1:
            if (player === playersWithFewestTiles[0]) {
                return <>{t("you.win.tie.breaker", {score: highestScore, tiles: fewestTiles})}</>
            }
            return <>{t("player.wins.tie.breaker", {
                player: getWinnerPseudo(playersWithFewestTiles[0], players, t),
                score: highestScore,
                tiles: fewestTiles
            })}</>
        case 2:
            return <>{t("2.players.tie", {
                player1: getWinnerPseudo(playersWithFewestTiles[0], players, t),
                player2: getWinnerPseudo(playersWithFewestTiles[1], players, t),
                score: highestScore,
                tiles: fewestTiles,
            })}</>
        case 3:
            return <>{t("3.players.tie", {
                player1: getWinnerPseudo(playersWithFewestTiles[0], players, t),
                player2: getWinnerPseudo(playersWithFewestTiles[1], players, t),
                player3: getWinnerPseudo(playersWithFewestTiles[2], players, t),
                score: highestScore,
                tiles: fewestTiles,
            })}</>
        default:
            return <>{t("perfect.tie", {score: highestScore, tiles: fewestTiles})}</>
    }
}

function getWinnerPseudo(playerWithHighestScore: Player, players: PlayerInfo<PlayerColor>[], t: TFunction): string {
    if (players.find(p => p.id === playerWithHighestScore.color, t)!.name === undefined) {
        return getPlayerName(playerWithHighestScore.color, t)
    } else {
        return players.find(p => p.id === playerWithHighestScore.color, t)!.name!
    }
}