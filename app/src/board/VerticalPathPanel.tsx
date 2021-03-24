/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import {useAnimation, usePlayerId} from '@gamepark/react-client'
import { FC } from "react";
import ElementTile, {getElementImage} from './ElementTile'
import PlayerColor from "@gamepark/gorinto/types/PlayerColor";
import Element from "@gamepark/gorinto/types/Element";
import MoveTile, { isMoveTile } from "@gamepark/gorinto/moves/MoveTile";
import RemoveTileOnPath, { isRemoveTileOnPath } from "@gamepark/gorinto/moves/RemoveTileOnPath";

type Props = {
    tilesToTake:{quantity : number, coordinates:{x:number,y:number}[], element?:Element} | undefined,
    verticalPath:(number | null)[],
    activePlayer: PlayerColor | undefined,
    mountain:number[][][]
}

const VerticalPathPanel : FC<Props> = ({tilesToTake, verticalPath, activePlayer, mountain}) => {

    const playerId = usePlayerId()
    const animationMoveTile = useAnimation<MoveTile>(animation => isMoveTile(animation.move) && animation.move.path === "vertical")
    const animationRemoveTile = useAnimation<RemoveTileOnPath>(animation => isRemoveTileOnPath(animation.move) && animation.move.index >= 5)


    return(

        <div css = {verticalPathPanel}>

            {verticalPath.map((tile, index) => tile !== null ?
            
            <div css={positionningTile(index)} key = {index}> 

                <ElementTile 
                             css = {[animationMoveTile && animationMoveTile.move.y === index && moveTileAnimation(animationMoveTile.move.x, mountain[animationMoveTile.move.x][animationMoveTile.move.y].length, animationMoveTile.duration),
                                     animationRemoveTile && animationRemoveTile.move.index -5 === index && removeTileAnimation(animationRemoveTile.duration)
                            ]}
                             image = {getElementImage(tile)}
                             draggable = {playerId === activePlayer && !tilesToTake  && !animationRemoveTile}
                             draggableItem = {{type:"ElementInPath", path: "vertical", position : index}}
                             element = {tile}
               />

            </div>

                :null
        
        )}

        </div>

        
    )

}

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
    transform:translate3d(0,0,150em);
    box-shadow:none;
    border-radius:20%;
}
`

const heightPath = 15           // In percent

const moveTileAnimation = (x:number, z:number, duration:number) => css`
animation:${moveTileKeyFrames(x,z)} ${duration}s ;
`

const moveTileKeyFrames = (x:number,z:number) => keyframes`
from{}
15%{
    transform:translate3d(0,0,16.03em);
}
85%{
    transform:translate3d(${(x+1)*(heightPath*9.6)}%,0,16.03em);
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