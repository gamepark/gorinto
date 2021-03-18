/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {usePlayerId} from '@gamepark/react-client'
import { FC } from "react";
import ElementTile from "./ElementTile";
import PlayerColor from "@gamepark/gorinto/types/PlayerColor";
import Element from "@gamepark/gorinto/types/Element";
import { ElementBag } from "@gamepark/gorinto/cards/Elements";

type Props = {
    tilesToTake:{quantity : number, coordinates:{x:number,y:number}[], element?:Element} | undefined,
    verticalPath:(number | null)[]
    activePlayer: PlayerColor | undefined;
}

const VerticalPathPanel : FC<Props> = ({tilesToTake, verticalPath, activePlayer}) => {

    const playerId = usePlayerId()

    return(

        <div css = {verticalPathPanel}>

            {verticalPath.map((tile, index) => tile ?
            
            <div css={positionningTile(index)} key = {index}> 

                <ElementTile 
                             image = {ElementBag[tile].image}
                             draggable = {playerId === activePlayer && !tilesToTake}
                             draggableItem = {{type:"ElementInPath", path: "vertical", position : index}}
                             element = {ElementBag[tile].element}
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
transform-style:preserve-3d;

`

const verticalPathPanel = css`
position : absolute;
top : 19.5%;
left : 2%;
width : 12%;
height : 82%;
transform-style:preserve-3d;

`

export default VerticalPathPanel