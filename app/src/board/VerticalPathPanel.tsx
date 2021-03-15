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
    verticalPath:(ElementTileOld | null)[]
    activePlayer: PlayerColor | undefined;
}

const VerticalPathPanel : FC<Props> = ({tilesToTake, verticalPath, activePlayer}) => {

    const playerId = usePlayerId()

    return(

        <div css = {verticalPathPanel}>

            {verticalPath.map((tile, index) => tile ?
            
            <div css={positionningTile(index)} key = {index}> 

                <ElementTile 
                             image = {tile.image}
                             draggableItem = {playerId === activePlayer && !tilesToTake ? {type:"Element", path: "vertical", position : index} : undefined}
                             element = {tile.element}
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

transform-style: preserve-3d;
perspective:0em;

`

const verticalPathPanel = css`
position : absolute;
top : 19.5%;
left : 1%;
width : 11%;
height : 82%;
margin-left:2%;
margin-right:2%;

transform-style: preserve-3d;

`

export default VerticalPathPanel