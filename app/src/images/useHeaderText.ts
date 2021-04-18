import {Player as PlayerInfo, useGame, usePlayerId, usePlayers} from "@gamepark/react-client";
import GameView from "@gamepark/gorinto/types/GameView";
import PlayerColor from "@gamepark/gorinto/types/PlayerColor";
import {useTranslation} from "react-i18next";
import {getPlayerName} from "@gamepark/gorinto/GorintoOptions";
import MoveType from "@gamepark/gorinto/types/MoveType";
import Element from "@gamepark/gorinto/types/Element";
import Player from "@gamepark/gorinto/types/Player";

export default function useHeaderText() {
    const game = useGame<GameView>()
    const playerId = usePlayerId<PlayerColor>()
    const players = usePlayers<PlayerColor>()
    const {t} = useTranslation()

    function getWinnerPseudo(playerWithHighestScore:Player ,players:PlayerInfo<PlayerColor>[]):string{

        if (players.find(p => p.id === playerWithHighestScore.color,t)!.name === undefined){
            return getPlayerName(playerWithHighestScore.color,t)
        } else {
            return players.find(p => p.id === playerWithHighestScore.color,t)!.name!
        }   

    }
    
    if (!game) {
        return t('Game loading...')
    } else {
        const player = game!.players.find(player => player.color === playerId)
        if (!game.activePlayer) {

            let highestscore = -1;
            let playersWithHighestScore:Player[] = [];
    
            for (const p of game.players){
                const score = p.score;
                if (score >= highestscore){
                    if (score > highestscore){
                        playersWithHighestScore = [];
                        highestscore = score;
                    }
                    playersWithHighestScore.push(p)
                }
            }
    
            if (playersWithHighestScore.length === 1){
                if (player === playersWithHighestScore[0]){
                    return t('you.win', {score:highestscore})
                } else {
                    return t('player.wins',{player: getWinnerPseudo(playersWithHighestScore[0],players),score:highestscore})
                }
            } else {
                let fewestTiles = 101;
                let playersWithFewestTiles = [];
                for (const p of playersWithHighestScore){
                    if (p.understanding.reduce((acc, pile) => pile + acc) <= fewestTiles) {
                        if (p.understanding.reduce((acc, pile) => pile + acc) < fewestTiles){
                            playersWithFewestTiles = []
                            fewestTiles = p.understanding.reduce((acc,pile) => acc + pile)
                        }
                        playersWithFewestTiles.push(p)
                    }
                }
                if (playersWithFewestTiles.length === 1){
                    if (player === playersWithFewestTiles[0]){
                        return t("you.win.tie.breaker", {score:highestscore, tiles:fewestTiles})
                    } else {
                        return t("player.wins.tie.breaker", {player:getWinnerPseudo(playersWithFewestTiles[0],players), score:highestscore, tiles:fewestTiles})
                    }
                } else {
                    if (playersWithFewestTiles.length === 2){
                        return t("2.players.tie",
                        {
                            player1:getWinnerPseudo(playersWithFewestTiles[0],players),
                            player2:getWinnerPseudo(playersWithFewestTiles[1],players),
                            score:highestscore,
                            tiles:fewestTiles,
                        })
                    } else if (playersWithFewestTiles.length ===3){
                        return t("3.players.tie",
                        {
                            player1:getWinnerPseudo(playersWithFewestTiles[0],players),
                            player2:getWinnerPseudo(playersWithFewestTiles[1],players),
                            player3:getWinnerPseudo(playersWithFewestTiles[2],players),
                            score:highestscore,
                            tiles:fewestTiles,
                        })
                    } else {
                        return t("perfect.tie",
                        {
                            score:highestscore,
                            tiles:fewestTiles,
                        })
                    }
                }
            }
        }
        
        if (game.tilesToTake) {
    
            if (game.endOfSeasonStep === MoveType.MoveSeasonMarker){
                return t('The season is cleared. Moving to the next season...')
            } else if (game.endOfSeasonStep === MoveType.RefillPaths){
                return t("Refilling paths in progress...")
            } else if (game.endOfSeasonStep === MoveType.SwitchFirstPlayer){
                return t("Changing the first player coin' owner...")
            }
    
            if (game.activePlayer === playerId) {
                return t('you.must.take',
                    {quantity:(game.tilesToTake.element !== Element.Earth
                                ? Math.min(game.tilesToTake?.quantity, game.tilesToTake?.coordinates.length) 
                                : game.tilesToTake.coordinates.length === 0
                                    ? 0
                                    : Math.min(game.tilesToTake.quantity, game.mountainBoard[game.tilesToTake.coordinates[0].x][game.tilesToTake.coordinates[0].y].length-1))
                                }
                        )
            } else {
                return t('player.must.take', {player: players.find(p => p.id === game.activePlayer)?.name ?? getPlayerName(game.activePlayer, t),quantity:Math.min(game.tilesToTake.quantity, game.tilesToTake.coordinates.length)})
            }
        } else {
            if (game.activePlayer === playerId) {
                return t("you.must.move")
            } else {
                return t("player.must.move", {player: players.find(p => p.id === game.activePlayer)?.name ?? getPlayerName(game.activePlayer, t)})
            }
        }
    }
     
    return t('Connecting with the elements...')
}