/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import {useAnimation, usePlayerId} from '@gamepark/react-client'
import { FC } from "react";
import ElementTile from "./ElementTile";
import PlayerColor from "@gamepark/gorinto/types/PlayerColor";
import Element from "@gamepark/gorinto/types/Element";
import { ElementBag } from "@gamepark/gorinto/cards/Elements";
import MoveTile, { isMoveTile } from "@gamepark/gorinto/moves/MoveTile";

type Props = {
    tilesToTake:{quantity : number, coordinates:{x:number,y:number}[], element?:Element} | undefined,
    verticalPath:(number | null)[],
    activePlayer: PlayerColor | undefined,
    mountain:number[][][]
}

const VerticalPathPanel : FC<Props> = ({tilesToTake, verticalPath, activePlayer, mountain}) => {

    const playerId = usePlayerId()
    const animation = useAnimation<MoveTile>(animation => isMoveTile(animation.move) && animation.move.path === "vertical")


    return(

        <div css = {verticalPathPanel}>

            {verticalPath.map((tile, index) => tile ?
            
            <div css={positionningTile(index)} key = {index}> 

                <ElementTile 
                             css = {[animation && animation.move.y === index && moveTileAnimation(animation.move.x, mountain[animation.move.x][animation.move.y].length, animation.duration)]}
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

const heightPath = 15           // In percent

const moveTileAnimation = (x:number, z:number, duration:number) => css`
animation:${moveTileKeyFrames(x,z)} ${duration}s ;
`

const moveTileKeyFrames = (x:number,z:number) => keyframes`
from{}
50%{
    transform:translate3d(${(x+1)*(heightPath*4.8)}%,0,${z*4.02*1.8}em);
}
to{
    transform:translate3d(0${(x+1)*(heightPath*9.6)}%,0,${z*4.02}em);
}
`

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