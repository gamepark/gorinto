/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import Element from '@gamepark/gorinto/types/Element'
import ElementTileOld from '@gamepark/gorinto/types/ElementTile'
import Game from '@gamepark/gorinto/types/Game'
import {usePlayerId} from '@gamepark/react-client'
import {FC, HTMLAttributes} from 'react'
import ElementTile from './ElementTile'
import MountainDropZone from './MountainDropZone'

type Props = {
    pile:ElementTileOld[],
    x:number,
    y:number,
    game:Game,
} & HTMLAttributes<HTMLDivElement>

const MountainPile : FC<Props> = ({pile, x, y, game, ...props}) => {

    const playerId = usePlayerId()

    return(

        <>

        <div {...props} css = {[!game.tilesToTake && noPointerEvents, renderContext]} > 
                        
            {pile.map((tile, index) =>
                
                <div css={positionningTile(index, game.tilesToTake?.element, x, y, game.tilesToTake?.coordinates[0].x, game.tilesToTake?.coordinates[0].y)} key = {index}> 

                    <ElementTile 
                                image = {tile.image}
                                position = {index}
                                draggable = {playerId === game.activePlayer && canDrag(game,x,y,index)}
                                draggableItem = {{type:"Element", x, y, z : index}}
                                element = {tile.element}
                    />

                </div>

            )}

        </div>

        <MountainDropZone 
            x = {x}
            y = {y}
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
${(isEarth !== Element.Earth) && `transform:translateZ(${position*4}em)`};
${(isEarth === Element.Earth && (x !== xRef || y !== yRef)) && `transform:translateZ(${position*4}em)`};
${(isEarth === Element.Earth && x === xRef && y === yRef) && `transform:translateZ(${position*4*2}em)`};

`

export default MountainPile