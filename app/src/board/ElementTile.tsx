/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MoveTile from '@gamepark/gorinto/moves/MoveTile'
import {usePlay} from '@gamepark/react-client'
import {Draggable} from '@gamepark/react-components'
import { FC } from "react";
import ElementInPath from "@gamepark/gorinto/types/ElementInPath";
import ElementInPile from "@gamepark/gorinto/types/ElementInPile";
import Element from "@gamepark/gorinto/types/Element";

type Props = {

    image:string,
    position?:number,
    draggable?:boolean,
    draggableItem: ElementInPath | ElementInPile ,
    element:Element

}

const ElementTile : FC<Props> = ({image, draggable=false, draggableItem, element, position}) => {

    const play = usePlay <MoveTile> ()

        return(

            <Draggable canDrag={draggable} item={draggableItem} css={[size, canBeDragged(draggable)]} drop={play}>

      
                    <div css={[topStyle]}></div>
                    <div css={[backStyle, coloring(element)]}></div>

            </Draggable>

        )

}

const thickness = 4;            //em unit

const size = css`

position : absolute;
left : 0%;
top : 0%;
width : 100%;
height:100%;

transform-style: preserve-3d;
perspective:0em;
`

const coloring = (color:Element) => css`

${color === Element.Void && `background-color : #805474`};
${color === Element.Wind && `background-color : #cee0d7`};
${color === Element.Fire && `background-color : #fc671a`};
${color === Element.Water && `background-color : #00bab3`};
${color === Element.Earth && `background-color : #996c59`};

border:0.2em black solid;
`



const rightStyle = css`
 transform: rotateY(90deg) ;
 position:absolute;
 right:-1em;
 width:4em;
 top:10%;
 height:80%;
`
const leftStyle = css`
position:absolute;
transform: rotateY(-90deg);
left:-1em;
top:10%;
width:4em;
height:80%;
`
const topStyle = css`
position:absolute;

transform-style:preserve-3d;
transform : rotateX(89deg);
bottom:0em;
left:10%;
height:${thickness}em;
width:80%;
backface-visibility: visible;

background-color:red;
`
const bottomStyle = css`
position:absolute;
transform: rotateX(1deg);
top:-1em;
left:10%;
height:4em;
width:80%;
`

const frontStyle = (image:string) => css`
position:absolute;
transform: translateZ(4em);
width:100%;
height:100%;
background-image:url(${image});
background-repeat:no-repeat;
background-size:cover;
background-position:center;
backface-visibility: visible;

`
const backStyle = css`
position:absolute;
filter: drop-shadow(0 0 0.75rem black);
height:100%;
width:100%;
border-radius:20%;
backface-visibility: visible;
`
const canBeDragged = (isDraggable:boolean) => css`
${isDraggable === true && `border : gold 0.5em solid`}

`

const elementTileStyle = (position:number | undefined) => css`
position : absolute;
left : 0%;
top : 0%;
width : 100%;
height:100%;

transform-style: preserve-3d;

${position !== undefined && `transform:translateZ(${position*4}em)`};

/*box-shadow: 0px 0px 0.75em black;*/

border-radius:20%;




img{

    position:absolute;
    width:100%;
    height:100%;

}

`

export default ElementTile