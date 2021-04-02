import {useGame, usePlayerId, usePlayers} from "@gamepark/react-client";
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
    const players = usePlayers()
    const {t} = useTranslation()
    
    if (!game) {
        return t('Game loading...')
    } else {
        const player = game!.players.find(player => player.color === playerId)
        if (!game.activePlayer) {

            let highestscore = -1;
            let playersWithHighestScore = [];
    
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
                    return t('Victory ! You win the game with {score} Wisdom Points', {score:highestscore})
                } else {
                    return t('{player} wins the game with {score} Wisdom Points ',{player:playersWithHighestScore[0],score:highestscore})
                }
            } else {
                let fewestTiles = 101;
                let playersWithFewestTiles = [];
                for (const p of game.players){
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
                        return t("Victory ! Yon win the game with {score} Wisdom Points and {tiles} Elements", {score:highestscore, tiles:fewestTiles})
                    } else {
                        return t("{player} wins the game with {score} Wisdom Points and {tiles} Elements", {player:playersWithFewestTiles[0], score:highestscore, tiles:fewestTiles})
                    }
                } else {
                    if (playersWithFewestTiles.length === 2){
                        return t("Marvelous ! {player1} and {player2} share a harmonious victory with {score} Wisdom Points and {tiles} Elements",
                        {
                            player1:playersWithFewestTiles[0],
                            player2:playersWithFewestTiles[1],
                            score:highestscore,
                            tiles:fewestTiles,
                        })
                    } else if (playersWithFewestTiles.length ===3){
                        return t("Incredible ! {player1}, {player2} and {player3} share a harmonious victory with {score} Wisdom Points and {tiles} Elements",
                        {
                            player1:playersWithFewestTiles[0],
                            player2:playersWithFewestTiles[1],
                            player3:playersWithFewestTiles[2],
                            score:highestscore,
                            tiles:fewestTiles,
                        })
                    } else {
                        return t("It can't be... It's a perfect tie ! All players share a harmonious victory with {score} Wisdom Points and {tiles} Elements",
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
                return t('You must take {quantity} tiles from the mountain',
                    {quantity:(game.tilesToTake.element !== Element.Earth
                                ? Math.min(game.tilesToTake?.quantity, game.tilesToTake?.coordinates.length) 
                                : game.tilesToTake.coordinates.length === 0
                                    ? 0
                                    : Math.min(game.tilesToTake.quantity, game.mountainBoard[game.tilesToTake.coordinates[0].x][game.tilesToTake.coordinates[0].y].length-1))})
            } else {
                return t('{player} must take {quantity} tiles from the mountain', {player: players.find(p => p.id === game.activePlayer)?.name ?? getPlayerName(game.activePlayer, t),quantity:Math.min(game.tilesToTake.quantity, game.tilesToTake.coordinates.length)})
            }
        } else {
            if (game.activePlayer === playerId) {
                return t("You have to move an element from one path to the mountain")
            } else {
               return t("{player} have to move an element from one path to the mountain", {player: players.find(p => p.id === game.activePlayer)?.name ?? getPlayerName(game.activePlayer, t)})
            }
        }
    }
     
    return t('Connecting with the elements...')
}