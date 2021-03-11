import { css } from "@emotion/core";
import { Draggable, usePlay } from "@gamepark/workshop";
import { FC } from "react";
import MoveTile from "../moves/MoveTile";
import ElementInPath from "../types/ElementInPath";
import ElementInPile from "../types/ElementInPile";

type Props = {

    image:string, 
    position:number, 
    draggableItem?: ElementInPath | ElementInPile

}

const ElementTile : FC<Props> = ({image, draggableItem}) => {

    const play = usePlay <MoveTile> ()

    if (draggableItem){

        return(

            <Draggable item={draggableItem} css={[elementTileStyle, canBeDragged]} onDrop = {(move:MoveTile) => play(move)}>
    
                <img src={image} alt="back" />
                <img css={frontStyle} src={image} alt="front" />

            </Draggable>
    
        )

    } else {

        return(

            <div css={elementTileStyle}>

                <img src={image} alt="back" />
                <img css={frontStyle} src={image} alt="front" />

            </div>

        )

    }

}
const frontStyle = css`

transform:translateZ(4em);
transform-style: preserve-3d;


`

const canBeDragged = css`
border : gold 3px solid;
border-radius:20%;
`

const elementTileStyle = css`
position : absolute;
left : 0%;
top : 0%;
width : 100%;
height:100%;
perspective:0px;
transform-style: preserve-3d;



img{

    position:absolute;
    width:100%;
    height:100%;
    

}

`

export default ElementTile