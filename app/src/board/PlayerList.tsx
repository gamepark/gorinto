/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import Game from "@gamepark/gorinto/types/Game";
import PlayerPanel from "./PlayerPanel";

const PlayerList : FC<{game:Game}> = ({game}) => {

    return(

        <div css={playerPanelStyle}>
            
            {game.players.map((player, index) => 
           
            <PlayerPanel key = {player.color}
                         understanding = {player.understanding}
                         score = {player.score}
                         position = {index}
                         color = {player.color}
                         first = {player.isFirst}

                         game = {game}
            />
           
            )}

        </div>

    )

}

const playerPanelStyle = css`
position:absolute;
right:0%;
top:5%;
text-align:right;
width:20%;
height:95%;
`



export default PlayerList