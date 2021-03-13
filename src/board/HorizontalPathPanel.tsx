import { css } from "@emotion/core";
import { usePlayerId } from "@gamepark/workshop";
import { FC } from "react";
import Game from "../types/Game";
import ElementTile from "./ElementTile";

const HorizontalPathPanel : FC<{game : Game}> = ({game}) => {

    const playerId = usePlayerId()

    return(

        <div css = {horizontalPathPanel}>

            {game.horizontalPath.map((tile, index) => tile ? 
            
            <div css={positionningTile(index)} key = {index}> 

                <ElementTile 
                             image = {tile.image}
                             position = {index}
                             draggableItem = {playerId === game.activePlayer && !game.tilesToTake ? {type:"Element", path: "horizontal", position: index} : undefined}
                />

            </div>

            : null
        
        )}

        </div>


    )

}

const positionningTile = (position : number) => css`
position:absolute;
top:0%;
left:${3.2+19.5*position}%;
width:15%;
height:100%;

transform-style: preserve-3d;
perspective:0em;
`

const horizontalPathPanel = css`
position : absolute;
top : 2.25%;
left : 18%;
width : 81.5%;
height : 11%;

transform-style: preserve-3d;
`

export default HorizontalPathPanel