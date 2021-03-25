/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
import Element from '@gamepark/gorinto/types/Element'
import GameState from '@gamepark/gorinto/types/GameState'
import {useAnimation, usePlayerId} from '@gamepark/react-client'
import {FC, HTMLAttributes} from 'react'
import ElementTile, {getElementImage} from './ElementTile'
import MountainDropZone from './MountainDropZone'
import TakeTile, {isTakeTile} from "@gamepark/gorinto/moves/TakeTile"

type Props = {
    pile:number[],
    x:number,
    y:number,
    game:GameState,
} & HTMLAttributes<HTMLDivElement>

const MountainPile : FC<Props> = ({pile, x, y, game, ...props}) => {

    const playerId = usePlayerId()
    const animation = useAnimation<TakeTile>(animation => isTakeTile(animation.move) && animation.move.coordinates.x === x && animation.move.coordinates.y === y)
    const canTakeAny = game.tilesToTake?.element === Element.Earth && game.tilesToTake.coordinates[0].x === x && game.tilesToTake.coordinates[0].y === y

    return(

        <>

        <div {...props} css = {[!game.tilesToTake && noPointerEvents, renderContext]} > 
                        
            {pile.map((tile, index) =>
                
                <div css={positionningTile(index, game.tilesToTake?.element, x, y, game.tilesToTake?.coordinates[0].x, game.tilesToTake?.coordinates[0].y)} key = {index}> 

                    <ElementTile 
                                css = {[animation && game.mountainBoard[x][y].length === index+1 && game.tilesToTake?.element !== Element.Earth && takeTileAnimation(animation.duration, index+1),
                                        animation && game.tilesToTake?.element === Element.Earth && index === animation.move.coordinates.z && takeTileEarthAnimation(animation.duration, index+1),
                                        canTakeAny && shadowStyle
                                      ]}
                                image = {getElementImage(tile)}
                                position = {canTakeAny ? 3*index : index}
                                draggable = {playerId === game.activePlayer && canDrag(game,x,y,index)}
                                draggableItem = {{type:"ElementInPile", x, y, z : index}}
                                element = {tile}
                    />

                </div>

            )}

        </div>

        <MountainDropZone 
            x = {x}
            y = {y}
            height = {game.mountainBoard[x][y].length}
            {...props}
        
        />

        </>

    )

}

function canDrag(game:GameState, x:number, y:number, z:number):boolean{

    if (game.tilesToTake === undefined){
        return false;
    } else if (game.tilesToTake.element !== Element.Earth){
        return(
            (game.tilesToTake.coordinates.find(coord => (coord.x === x) && (coord.y === y)) !== undefined)
            &&
            (z === game.mountainBoard[x][y].length - 1)
        )
    } else {
   
       return (
        (game.tilesToTake.coordinates.find(coord => (coord.x === x) && (coord.y === y)) !== undefined)
        &&
        (z !== game.mountainBoard[x][y].length - 1)
           
       )
   }

}

const shadowStyle = css`
box-shadow: 0px 0px 1.5em 0.5em black; 
border-radius:20%;
`

const renderContext = css`
transform-style:preserve-3d;
`

const noPointerEvents = css`
pointer-events:none;
`

const positionningTile = (position:number, isEarth:Element|undefined, x:number, y:number, xRef:number|undefined, yRef:number|undefined) => css`

position:absolute;
left:15%;
top:15%;
width:70%;
height:70%;

transform-style: preserve-3d;
`

const takeTileKeyFrames = (z:number) => keyframes`
from{}
25%{
    transform:translate3d(0,0,${z*4+4.02}em);
}
55%{
    transform:translate3d(0,0,${z*4+4.02}em);
}
to{
    transform:translate3d(0,0,150em);
}
`

const takeTileEarthKeyFrames = (z:number) => keyframes`
from{}
25%{
    transform:translate3d(-150%,0,${z*3*4+4.02}em);
}
55%{
    transform:translate3d(-150%,0,${z*3*4+4.02}em);
}
to{
    transform:translate3d(-150%,0,150em);
}
`

const takeTileAnimation = (duration:number, z:number) => css`
animation:${takeTileKeyFrames(z)} ${duration}s ease-in-out;
`

const takeTileEarthAnimation = (duration:number, z:number) => css`
animation:${takeTileEarthKeyFrames(z)} ${duration}s ease-in-out;
`

export default MountainPile