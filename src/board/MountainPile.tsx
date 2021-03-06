import { FC } from "react";
import ElementTile from "./ElementTile";
import ElementTileOld from "../types/ElementTile";
import { css } from "@emotion/core";
import { useDrop } from "react-dnd";
import ElementInPath from "../types/ElementInPath";
import { usePlay } from "@gamepark/workshop";
import MoveType from "../types/MoveType";
import MoveTile from "../moves/MoveTile";

type Props = {
    pile:ElementTileOld[],
    x:number,
    y:number,
} & React.HTMLAttributes<HTMLDivElement>

const MountainPile : FC<Props> = ({pile, x, y, ...props}) => {

    const play = usePlay <MoveTile> ()

    const [{canDrop, isOver}, dropRef] = useDrop({
        accept: ["Element"],
        canDrop: (item: ElementInPath) => {
            if (item.path === "horizontal"){
                return(item.position === x)
            } else {
                return(item.position === y)
            }
        },
        collect: monitor => ({
          canDrop: monitor.canDrop(),
          isOver: monitor.isOver()
        }),
        drop: (item: ElementInPath) => {

            play({type : MoveType.MoveTile, path : item.path, x, y});

        }
      })

    return(

        <div {...props} ref={dropRef} css = {[canDrop && canDropStyle, isOver && isOverStyle]}> 
                        
            {pile.map((tile, index) =>
                
                <div css={positionningTile(index)} key = {index}> 

                    <ElementTile 
                                image = {tile.image}
                                element = {tile.element}
                                position = {index}
                                draggableItem = {{type:"Element", x, y}}
                    />

                </div>

            )}

        </div>

    )

}

const canDropStyle = css`
opacity:0.4;
background-color:red;
`


const isOverStyle = css`
opacity:0.6;
background-color:red;
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