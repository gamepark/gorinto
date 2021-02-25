import { css } from "@emotion/core";
import { FC } from "react";
import Game from "../types/Game";
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
            />
           
            )}

        </div>

    )

}

const playerPanelStyle = css`
position:absolute;
right:0;
background-color:lightgrey;
border:black 1px solid;
text-align:right;
width:23%;
height:100%;`



export default PlayerList