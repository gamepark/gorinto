/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import PlayerPanel from "./PlayerPanel";
import Player from "@gamepark/gorinto/types/Player";
import ElementTile from "@gamepark/gorinto/types/ElementTile";
import Element from "@gamepark/gorinto/types/Element";

type Props = {
    players:Player[], 
    tilesToTake:{quantity : number, coordinates:{x:number,y:number}[], element?:Element} | undefined,
    mountainBoard:ElementTile[][][]
}

const PlayerList : FC<Props> = ({players, tilesToTake, mountainBoard}) => {

    return(

        <div css={playerPanelStyle}>
            
            {players.map((player, index) => 
           
            <PlayerPanel key = {player.color}
                         understanding = {player.understanding}
                         score = {player.score}
                         position = {index}
                         color = {player.color}
                         first = {player.isFirst}
                         tilesToTake = {tilesToTake}
                         mountainBoard = {mountainBoard}
            />
           
            )}

        </div>

    )

}

const playerPanelStyle = css`
position:absolute;
left:77.4375%;
top:0%;
text-align:right;
width:20%;
height:95%;
`



export default PlayerList