/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
import MoveTile, {isMoveTile} from '@gamepark/gorinto/moves/MoveTile'
import RemoveTileOnPath, {isRemoveTileOnPath} from '@gamepark/gorinto/moves/RemoveTileOnPath'
import Element from '@gamepark/gorinto/types/Element'
import PathType from '@gamepark/gorinto/types/PathType'
import PlayerColor from '@gamepark/gorinto/types/PlayerColor'
import {useAnimation, usePlayerId, useSound} from '@gamepark/react-client'
import {FC, useEffect} from 'react'
import ElementInPath from './ElementInPath'
import ElementTile from './ElementTile'
import moveTileSound from '../sounds/tic.mp3'

type Props = {
    tilesToTake:{quantity : number, coordinates:{x:number,y:number}[], element?:Element} | undefined,
    verticalPath:(number | null)[],
    activePlayer: PlayerColor | undefined,
    mountain:number[][][],
    onSelect:(position:number) => void,
    selectedTile?:ElementInPath,
    verifyIfWarningIsNeeded : (tile:Element, x:number,y:number) => boolean,
    onWarning:(path:PathType,x:number, y:number) => void
}

const VerticalPathPanel : FC<Props> = ({tilesToTake, verticalPath, activePlayer, mountain, onSelect, selectedTile, verifyIfWarningIsNeeded, onWarning}) => {

    const playerId = usePlayerId<PlayerColor>()
    const animationMoveTile = useAnimation<MoveTile>(animation => isMoveTile(animation.move) && animation.move.path === PathType.Vertical)
    const animationRemoveTile = useAnimation<RemoveTileOnPath>(animation => isRemoveTileOnPath(animation.move))
    
    const moveSound = useSound(moveTileSound)

    useEffect(() => {
        if (animationMoveTile && animationMoveTile.move){
            moveSound.play()
        }
    },[animationMoveTile && animationMoveTile.move])

    return(

        <div css = {verticalPathPanel}>

            {verticalPath.map((tile, index) => tile !== null ?
            
            <div css={positionningTile(index)} key = {index}> 

                <ElementTile 
                             css = {[animationMoveTile && animationMoveTile.move.y === index && moveTileAnimation(animationMoveTile.move.x, mountain[animationMoveTile.move.x][animationMoveTile.move.y].length, maxPileHeightOnTheLine(index, mountain),animationMoveTile.duration),
                                     animationRemoveTile && animationRemoveTile.move.index === index && animationRemoveTile.move.path === PathType.Vertical && removeTileAnimation(animationRemoveTile.duration)
                            ]}
                             draggable = {playerId === activePlayer && !tilesToTake  && !animationRemoveTile}
                             type = 'ElementInPath'
                             draggableItem = {{path: PathType.Vertical, position : index, element:tile}}
                             element = {tile}
                             onClick = {() => onSelect(index)}
                             isSelected = {selectedTile?.path === PathType.Vertical && selectedTile?.position === index && tilesToTake === undefined ? true : false}              
                             verifyIfWarningIsNeeded = {verifyIfWarningIsNeeded}
                             onWarning = {onWarning}
              
              />

            </div>

                :null
        
        )}

        </div>

        
    )

}

function maxPileHeightOnTheLine (x:number, mountain:number[][][]) : number {

    let zMax:number = 0;
    for (let i = 0 ; i < 5 ; i++){
        const height = mountain[x][i].length;
        if (height>zMax){
            zMax = height;
        }
    }

    return zMax
}

const removeTileAnimation = (duration:number) => css`
animation : ${removeTileKeyFrames} ${duration}s ;
`

const removeTileKeyFrames = keyframes`
from{}
25%{
    transform:translate3d(0,0,${8.02}em);
    box-shadow: 0px 0px 1.5em 1em red;
    border-radius:20%;
}
65%{
    transform:translate3d(0,0,${8.02}em);
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

const moveTileAnimation = (x:number, z:number, zMax:number, duration:number) => css`
animation:${moveTileKeyFrames(x,z, zMax)} ${duration}s ;
`

const moveTileKeyFrames = (x:number,z:number, zMax:number) => keyframes`
from{}
15%{
    transform:translate3d(0,0,${zMax*4+8.02}em);
}
85%{
    transform:translate3d(${(x+1)*(heightPath*9.6)}%,0,${zMax*4+8.02}em);
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