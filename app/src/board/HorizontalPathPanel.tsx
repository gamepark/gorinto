/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {usePlayerId} from '@gamepark/react-client'
import { FC } from "react";
import ElementTile from "./ElementTile";
import ElementTileOld from "@gamepark/gorinto/types/ElementTile";
import PlayerColor from "@gamepark/gorinto/types/PlayerColor";
import Element from "@gamepark/gorinto/types/Element";

type Props = {
    tilesToTake:{quantity : number, coordinates:{x:number,y:number}[], element?:Element} | undefined,
    horizontalPath:(ElementTileOld | null)[]
    activePlayer: PlayerColor | undefined;
}

const HorizontalPathPanel : FC<Props> = ({tilesToTake, horizontalPath, activePlayer}) => {

    const playerId = usePlayerId()

    return(

        <div css = {horizontalPathPanel}>

            {horizontalPath.map((tile, index) => tile ? 
            
            <div css={positionningTile(index)} key = {index}> 

                <ElementTile 
                             image = {tile.image}
                             draggable = {playerId === activePlayer && !tilesToTake}
                             draggableItem = {{type:"Element", path: "horizontal", position: index}}
                             element = {tile.element}
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

`

const horizontalPathPanel = css`
position : absolute;
top : 2.25%;
left : 18%;
width : 81.5%;
height : 11%;

`

export default HorizontalPathPanel