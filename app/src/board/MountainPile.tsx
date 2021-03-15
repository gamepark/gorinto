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

        <div {...props} css = {[!game.tilesToTake && noPointerEvents]} > 
                        
            {pile.map((tile, index) =>
                
                <div css={positionningTile} key = {index}> 

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

const noPointerEvents = css`
pointer-events:none;
`

const positionningTile = css`
position:absolute;
left:15%;
top:15%;
width:70%;
height:70%;

`

export default MountainPile