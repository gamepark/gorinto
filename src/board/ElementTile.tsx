import { css } from "@emotion/core";
import { Draggable, usePlay } from "@gamepark/workshop";
import { FC } from "react";
import MoveTile from "../moves/MoveTile";
import Element from "../types/Element";
import ElementInPath from "../types/ElementInPath";
import ElementInPile from "../types/ElementInPile";

type Props = {

    image:string, 
    element:Element, 
    position:number, 
    draggableItem?: ElementInPath | ElementInPile

}

const ElementTile : FC<Props> = ({image, element, draggableItem}) => {

    const play = usePlay <MoveTile> ()

    if (draggableItem){

        return(

            <Draggable item={draggableItem} css={[elementTileStyle(image), canBeDragged]} onDrop = {(move:MoveTile) => play(move)}  >
    
                    <span>{element}</span>
    
            </Draggable>
    
        )

    } else {

        return(

            <div css={elementTileStyle(image)}>

                <span>{element}</span>

            </div>

        )

    }

}

const canBeDragged = css`
border : gold 3px solid;
border-radius:20%;
`

const elementTileStyle = (image : string) => css`
position : absolute;
left : 0%;
top : 0%;
width : 100%;
height:100%;

background-image : url(${image});
background-size : contain;
background-repeat : no-repeat;
background-position :center;

`

export default ElementTile