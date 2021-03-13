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

                <div css={rightStyle}></div>
                <img css={backStyle} src={image} alt="back" />
                <img css={frontStyle} src={image} alt="front" />
                <div css={leftStyle}></div>
                <div css={topStyle}></div>
                <div css={bottomStyle}></div>

            </Draggable>

        )

    } else {

        return(

            <div css={elementTileStyle}>

                <div css={rightStyle}></div>
                <img css={backStyle} src={image} alt="back" />
                <img css={frontStyle} src={image} alt="front" />
                <div css={leftStyle}></div>         
                <div css={topStyle}></div>
                <div css={bottomStyle}></div>

            </div>

        )

    }

}

const rightStyle = css`
 transform: rotateY(90deg) translateZ(2em);
 position:absolute;
 right:0em;
 width:4em;
 height:100%;
 background-color:red;

`
const leftStyle = css`
position:absolute;
transform: rotateY(-90deg) translateZ(2em);
position:absolute;
left:0em;
width:4em;
height:100%;
background-color:red;
`
const topStyle = css`
position:absolute;
transform: rotateX(-89deg) translateZ(2em);
bottom:0em;
height:4em;
width:100%;
background-color:red;
`
const bottomStyle = css`
position:absolute;
transform: rotateX(89deg) translateZ(2em);
top:0em;
height:4em;
width:100%;
background-color:red;
`

const frontStyle = css`
position:absolute;
transform: rotateY(0deg) translateZ(2em);

`
const backStyle = css`
position:absolute;
transform: rotateY(180deg) translateZ(2em);
filter: drop-shadow(0 0 0.75rem black);
`
const canBeDragged = css`
border : gold 3px solid;

`

const elementTileStyle = css`
position : absolute;
left : 0%;
top : 0%;
width : 100%;
height:100%;
perspective:0em;
transform-style: preserve-3d;
transform:translateZ(2em);


/*box-shadow: 0px 0px 0.75em black;*/

border-radius:20%;




img{

    position:absolute;
    width:100%;
    height:100%;

}

`

export default ElementTile