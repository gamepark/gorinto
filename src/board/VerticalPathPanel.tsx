import { css } from "@emotion/core";
import { usePlayerId } from "@gamepark/workshop";
import { FC } from "react";
import Game from "../types/Game";
import ElementTile from "./ElementTile";

const VerticalPathPanel : FC<{game : Game}> = ({game}) => {

    const playerId = usePlayerId()

    return(

        <div css = {verticalPathPanel}>

            {game.verticalPath.map((tile, index) => tile ?
            
            <div css={positionningTile(index)} key = {index}> 

                <ElementTile 
                             image = {tile.image}
                             position = {index}
                             draggableItem = {playerId === game.activePlayer && !game.tilesToTake ? {type:"Element", path: "vertical", position : index} : undefined}
                />

            </div>

                :null
        
        )}

        </div>

        
    )

}

const positionningTile = (position : number) => css`
position:absolute;
top:${0.5+19.5*position}%;
left:0%;
width:100%;
height:15%;
`

const verticalPathPanel = css`
position : absolute;
top : 19.5%;
left : 1%;
width : 11%;
height : 82%;
margin-left:2%;
margin-right:2%;
`

export default VerticalPathPanel