import { css } from "@emotion/core";
import { Draggable } from "@gamepark/workshop";
import { FC } from "react";
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

    if (draggableItem){

        return(

            <Draggable item={draggableItem} css={elementTileStyle(image)}>
    
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