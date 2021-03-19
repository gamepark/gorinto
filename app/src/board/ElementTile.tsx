/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MoveTile from '@gamepark/gorinto/moves/MoveTile'
import {usePlay} from '@gamepark/react-client'
import {Draggable} from '@gamepark/react-components'
import { FC, HTMLAttributes, useEffect, useState } from "react";
import ElementInPath from "@gamepark/gorinto/types/ElementInPath";
import ElementInPile from "@gamepark/gorinto/types/ElementInPile";
import Element from "@gamepark/gorinto/types/Element";

type Props = {

    image:string,
    position?:number,
    draggable?:boolean,
    draggableItem: Omit<ElementInPath ,"hoverPile" > | Omit<ElementInPile, "hoverPile">,
    element:Element

} & HTMLAttributes<HTMLDivElement>

const ElementTile : FC<Props> = ({image, draggable=false, draggableItem,  element, position=0, ...props}) => {

    const play = usePlay <MoveTile> ()
    const [displayHeight, setDisplayHeight] = useState(position)
    useEffect( () => setDisplayHeight(position) , [position])
    const item = {...draggableItem, hoverPile:setDisplayHeight}

        return(

            <Draggable canDrag={draggable} item={item} css={elementTileStyle} drop={play} {...props} preTransform= {`translateZ(${displayHeight*4.01+0.01}em)`}  end = {() => setDisplayHeight(position)}>

                    <div css={topStyle(image)}></div>
                    <div css={[frontStyle, coloring(element)]}></div>
                    <div css={[bottomStyle, coloring(element), canBeDragged(draggable)]}></div>
                    <div css={[rightStyle, coloring(element)]}></div>
                    <div css={[leftStyle, coloring(element)]}></div>
                    <div css={[backStyle, coloring(element)]}></div>
                    

            </Draggable>

        )

}

const thickness = 4;            //em unit

const elementTileStyle = css`
    position : absolute;
    left : 0%;
    top : 0%;
    width : 100%;
    height:100%;

    transform-style: preserve-3d;
`

const coloring = (color:Element) => css`
    ${color === Element.Void && `background-color : #805474`};
    ${color === Element.Wind && `background-color : #cee0d7`};
    ${color === Element.Fire && `background-color : #fc671a`};
    ${color === Element.Water && `background-color : #00bab3`};
    ${color === Element.Earth && `background-color : #996c59`};

    border:0.1em black solid;
`

const canBeDragged = (isDraggable:boolean) => css`

    @keyframes glowing {
        0% { box-shadow: 0px 0px 1em 0.2em gold; }
        45% { box-shadow: 0px 0px 1.5em 1em gold; }
        55% { box-shadow: 0px 0px 1.5em 1em gold; }
        100% { box-shadow: 0px 0px 1em 0.2em gold; }
    }

    ${isDraggable === true && `animation: glowing 3000ms infinite;`};
    border-radius:20%;
`

const rightStyle = css`
    position:absolute;
    transform-style:preserve-3d;

    transform-origin:right;
    transform: rotateY(90deg) ;
    right:0em;
    top:10%;

    width:${thickness}em;
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
const frontStyle = css`
    position:absolute;
    transform-style:preserve-3d;

    transform-origin:bottom;
    transform : rotateX(-90deg);
    bottom:0em;
    left:10%;

    height:${thickness}em;
    width:80%;
`
const backStyle = css`
    position:absolute;
    transform-style:preserve-3d;

    transform-origin:top;
    transform: rotateX(90deg);
    top:0em;
    left:10%;

    height:${thickness}em;
    width:80%;
`

const topStyle = (image:string) => css`
    position:absolute;
    transform: translateZ(${thickness}em);
    width:100%;
    height:100%;
    background-image:url(${image});
    background-repeat:no-repeat;
    background-size:100% 100%;
`
const bottomStyle = css`
    position:absolute;
    height:100%;
    width:100%;
    border-radius:20%;

    box-shadow: 0px 0px 1.5em 0.5em black;
`

export default ElementTile