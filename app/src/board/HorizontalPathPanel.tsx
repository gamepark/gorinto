/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import {useAnimation, usePlayerId} from '@gamepark/react-client'
import { FC } from "react";
import ElementTile from "./ElementTile";
import PlayerColor from "@gamepark/gorinto/types/PlayerColor";
import Element from "@gamepark/gorinto/types/Element";
import { ElementBag } from "@gamepark/gorinto/cards/Elements";
import MoveTile, {isMoveTile} from "@gamepark/gorinto/moves/MoveTile"

type Props = {
    tilesToTake:{quantity : number, coordinates:{x:number,y:number}[], element?:Element} | undefined,
    horizontalPath:(number | null)[],
    activePlayer: PlayerColor | undefined,
    mountain:number[][][]
}

const HorizontalPathPanel : FC<Props> = ({tilesToTake, horizontalPath, activePlayer, mountain }) => {

    const playerId = usePlayerId()
    const animation = useAnimation<MoveTile>(animation => isMoveTile(animation.move) && animation.move.path === "horizontal")

    console.log(animation);

    return(

        <div css = {horizontalPathPanel}>

            {horizontalPath.map((tile, index) => tile ? 
            
            <div css={positionningTile(index)} key = {index}> 

                <ElementTile css = {[animation && animation.move.x === index && moveTileAnimation(animation.move.y,mountain[animation.move.x][animation.move.y].length,animation.duration)]}
                             image = {ElementBag[tile].image}
                             draggable = {playerId === activePlayer && !tilesToTake}
                             draggableItem = {{type:"ElementInPath", path: "horizontal", position: index}}
                             element = {ElementBag[tile].element}
                             
               />

            </div>

            : null
        
        )}

        </div>


    )

}

const widthPath = 15 ;            // in percent

const moveTileAnimation = (y:number, z:number, duration:number) => css`
animation:${moveTileKeyFrames(y,z)} ${duration}s ;
`

const moveTileKeyFrames = (y:number,z:number) => keyframes`
from{}
50%{
    transform:translate3d(0,${(y+1)*(widthPath*4.5334)}%,${z*4.02*1.8}em);
}
to{
    transform:translate3d(0,${(y+1)*(widthPath*9.0667)}%,${z*4.02}em);
}
`

const positionningTile = (position : number) => css`
position:absolute;
top:0%;
left:${3.5+19.5*position}%;
width:${widthPath}%;
height:100%;
transform-style:preserve-3d;

`

const horizontalPathPanel = css`
position : absolute;
top : 2.25%;
left : 18%;
width : 81.5%;
height : 12%;

transform-style:preserve-3d;

`

export default HorizontalPathPanel