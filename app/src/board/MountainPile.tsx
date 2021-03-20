/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
import { ElementBag } from '@gamepark/gorinto/cards/Elements'
import Element from '@gamepark/gorinto/types/Element'
import Game from '@gamepark/gorinto/types/Game'
import {useAnimation, usePlayerId} from '@gamepark/react-client'
import {FC, HTMLAttributes} from 'react'
import ElementTile from './ElementTile'
import MountainDropZone from './MountainDropZone'
import TakeTile, {isTakeTile} from "@gamepark/gorinto/moves/TakeTile"
import PlayerColor from '@gamepark/gorinto/types/PlayerColor'

type Props = {
    pile:number[],
    x:number,
    y:number,
    game:Game,
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
                                css = {[animation && game.mountainBoard[x][y].length === index+1 && takeTileAnimation(animation.duration, index+1)]}
                                image = {ElementBag[tile].image}
                                position = {canTakeAny ? 3*index : index}
                                draggable = {playerId === game.activePlayer && canDrag(game,x,y,index)}
                                draggableItem = {{type:"ElementInPile", x, y, z : index}}
                                element = {ElementBag[tile].element}
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

function canDrag(game:Game,x:number,y:number,z:number):boolean{

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
    transform:translateZ(${z*4+4.02}em);
}
75%{
    transform:translateZ(${z*4+4.02}em);
}
to{
    transform:translateZ(150em);
}
`

const takeTileAnimation = (duration:number, z:number) => css`
animation:${takeTileKeyFrames(z)} ${duration}s ease-in-out;
`

export default MountainPile