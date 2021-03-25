/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import {useAnimation, usePlayerId} from '@gamepark/react-client'
import { FC } from "react";
import ElementTile, {getElementImage} from './ElementTile'
import PlayerColor from "@gamepark/gorinto/types/PlayerColor";
import Element from "@gamepark/gorinto/types/Element";
import MoveTile, {isMoveTile} from "@gamepark/gorinto/moves/MoveTile"
import RemoveTileOnPath, { isRemoveTileOnPath } from "@gamepark/gorinto/moves/RemoveTileOnPath";

type Props = {
    tilesToTake:{quantity : number, coordinates:{x:number,y:number}[], element?:Element} | undefined,
    horizontalPath:(Element | null)[],
    activePlayer: PlayerColor | undefined,
    mountain:Element[][][]
}

const HorizontalPathPanel : FC<Props> = ({tilesToTake, horizontalPath, activePlayer, mountain }) => {

    const playerId = usePlayerId()
    const animationMoveTile = useAnimation<MoveTile>(animation => isMoveTile(animation.move) && animation.move.path === "horizontal")
    const animationRemoveTile = useAnimation<RemoveTileOnPath>(animation => isRemoveTileOnPath(animation.move) && animation.move.index <= 4)

    return(

        <div css = {horizontalPathPanel}>

            {horizontalPath.map((tile, index) => tile !== null ? 
            
            <div css={positionningTile(index)} key = {index}> 

                <ElementTile css = {[animationMoveTile && animationMoveTile.move.x === index && moveTileAnimation(animationMoveTile.move.y,mountain[animationMoveTile.move.x][animationMoveTile.move.y].length, maxPileHeightOnTheColumn(index, mountain),animationMoveTile.duration),
                                     animationRemoveTile && animationRemoveTile.move.index === index && removeTileAnimation(animationRemoveTile.duration)
            ]}
                             image = {getElementImage(tile)}
                             draggable = {playerId === activePlayer && !tilesToTake && !animationRemoveTile}
                             draggableItem = {{type:"ElementInPath", path: "horizontal", position: index}}
                             element = {tile}
                             
               />

            </div>

            : null
        
        )}

        </div>


    )

}

function maxPileHeightOnTheColumn (y:number, mountain:number[][][]) : number {

    let zMax:number = 0;
    for (let i = 0 ; i < 5 ; i++){
        const height = mountain[i][y].length;
        if (height>zMax){
            zMax = height;
        }
    }

    return zMax
}

const widthPath = 15 ;            // in percent

const removeTileAnimation = (duration:number) => css`
animation : ${removeTileKeyFrames} ${duration}s ;
`

const removeTileKeyFrames = keyframes`
from{}
25%{
    transform:translate3d(0,0,${4.02}em);
    box-shadow: 0px 0px 1.5em 1em red;
    border-radius:20%;
}
65%{
    transform:translate3d(0,0,${4.02}em);
    box-shadow: 0px 0px 2em 1.5em red;
    border-radius:20%;
}
to{
    transform:translate3d(0,0,100em);
    box-shadow:none;
    border-radius:20%;
}
`

const moveTileAnimation = (y:number, z:number, zMax:number, duration:number) => css`
animation:${moveTileKeyFrames(y,z, zMax)} ${duration}s ;
`

const moveTileKeyFrames = (y:number,z:number, zMax:number) => keyframes`
from{}
15%{
    transform:translate3d(0,0,${zMax*4+8.02}em);
}
85%{
    transform:translate3d(0,${(y+1)*(widthPath*9.0667)}%,${zMax*4+8.02}em);
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