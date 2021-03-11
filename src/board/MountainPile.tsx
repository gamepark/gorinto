import { FC, Fragment } from "react";
import ElementTile from "./ElementTile";
import ElementTileOld from "../types/ElementTile";
import { css } from "@emotion/core";
import MountainDropZone from "./MountainDropZone";
import Game from "../types/Game";
import Element from "../types/Element";
import { usePlayerId } from "@gamepark/workshop";

type Props = {
    pile:ElementTileOld[],
    x:number,
    y:number,
    game:Game,
} & React.HTMLAttributes<HTMLDivElement>

const MountainPile : FC<Props> = ({pile, x, y, game, ...props}) => {

    const playerId = usePlayerId()

    return(

        <Fragment>

        <div {...props} css = {[!game.tilesToTake && noPointerEvents]} > 
                        
            {pile.map((tile, index) =>
                
                <div css={positionningTile(index) } key = {index}> 

                    <ElementTile 
                                image = {tile.image}
                                position = {index}
                                draggableItem = { playerId === game.activePlayer && canDrag(game,x,y,index) ? {type:"Element", x, y, z : index} : undefined}
                    />

                </div>

            )}

        </div>

        <MountainDropZone 
            x = {x}
            y = {y}
            {...props}
        
        />

        </Fragment>

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

const positionningTile = (position : number) => css`
position:absolute;
bottom:${0+6*position}%;
left:${0+6*position}%;
width:70%;
height:70%;

z-index:${1+position};
`

export default MountainPile