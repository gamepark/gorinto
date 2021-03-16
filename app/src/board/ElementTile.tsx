/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MoveTile from '@gamepark/gorinto/moves/MoveTile'
import {usePlay} from '@gamepark/react-client'
import {Draggable} from '@gamepark/react-components'
import { FC, HTMLAttributes } from "react";
import ElementInPath from "@gamepark/gorinto/types/ElementInPath";
import ElementInPile from "@gamepark/gorinto/types/ElementInPile";
import Element from "@gamepark/gorinto/types/Element";

type Props = {

    image:string,
    position?:number,
    draggable?:boolean,
    draggableItem: ElementInPath | ElementInPile ,
    element:Element

} & HTMLAttributes<HTMLDivElement>



const ElementTile : FC<Props> = ({image, draggable=false, draggableItem, element, position, ...props}) => {

    const play = usePlay <MoveTile> ()

        return(

            <Draggable canDrag={draggable} item={draggableItem} css={[size]} drop={play} {...props} >

                    <div css={frontStyle(image)}></div>
                    <div css={[topStyle, coloring(element)]}></div>
                    <div css={[backStyle, coloring(element), shadow(position), canBeDragged(draggable)]}></div>
                    <div css={[rightStyle, coloring(element)]}></div>
                    <div css={[leftStyle, coloring(element)]}></div>
                    <div css={[bottomStyle, coloring(element)]}></div>
                    

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

border:0.1em black solid;
`

const shadow = (position:number|undefined) => css`
;
`



const rightStyle = css`
 transform-style:preserve-3d;
 transform-origin:right;
 transform: rotateY(90deg) ;
 position:absolute;
 right:0em;
 width:${thickness}em;
 top:10%;
 height:80%;
`
const leftStyle = css`
position:absolute;
transform-style:preserve-3d;
transform-origin:left;
transform: rotateY(-90deg);
left:0em;
top:10%;
width:${thickness}em;
height:80%;
`
const topStyle = css`
position:absolute;
transform-style:preserve-3d;
transform-origin:bottom;
transform : rotateX(-90deg);
bottom:0em;
left:10%;
height:${thickness}em;
width:80%;
`
const bottomStyle = css`
position:absolute;
transform-style:preserve-3d;
transform-origin:top;
transform: rotateX(90deg);
top:0em;
left:10%;
height:${thickness}em;
width:80%;
`

const frontStyle = (image:string) => css`
position:absolute;
transform: translateZ(4em);
width:100%;
height:100%;
background-image:url(${image});
background-repeat:no-repeat;
background-size:100% 100%;
background-position:center;

`
const backStyle = css`
position:absolute;
height:100%;
width:100%;
border-radius:20%;

box-shadow: 0px 0px 1.5em 1em black;
`
const canBeDragged = (isDraggable:boolean) => css`
${isDraggable === true && `box-shadow: 0px 0px 1.5em 1em gold`};
border-radius:20%;
`

export default ElementTile