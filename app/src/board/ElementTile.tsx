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
    position:number,
    draggableItem?: ElementInPath | ElementInPile ,
    element:Element

}

const ElementTile : FC<Props> = ({image, draggableItem, element}) => {

    const play = usePlay <MoveTile> ()

    if (draggableItem){

        return(

            <Draggable item={draggableItem} css={[elementTileStyle, canBeDragged]} drop={play}>

                <div css={[rightStyle, coloring(element)]}></div>
                <img css={[backStyle]} src={image} alt="back" />
                <img css={frontStyle} src={image} alt="front" />
                <div css={[leftStyle, coloring(element)]}></div>
                <div css={[topStyle, coloring(element)]}></div>
                <div css={[bottomStyle, coloring(element)]}></div>

            </Draggable>

        )

    } else {

        return(

            <div css={elementTileStyle}>

                <div css={[rightStyle, coloring(element)]}></div>
                <img css={backStyle} src={image} alt="back" />
                <img css={frontStyle} src={image} alt="front" />
                <div css={[leftStyle, coloring(element)]}></div>         
                <div css={[topStyle, coloring(element)]}></div>
                <div css={[bottomStyle, coloring(element)]}></div>

            </div>

        )

    }

}

const coloring = (color:Element) => css`

${color === Element.Void && `background-color : #805474`};
${color === Element.Wind && `background-color : #cee0d7`};
${color === Element.Fire && `background-color : #fc671a`};
${color === Element.Water && `background-color : #00bab3`};
${color === Element.Earth && `background-color : #996c59`};

border:1px black solid;

`



const rightStyle = css`
 transform: rotateY(90deg) translateZ(2em);
 position:absolute;
 right:0em;
 width:4em;
 top:10%;
 height:80%;

`
const leftStyle = css`
position:absolute;
transform: rotateY(-90deg) translateZ(2em);
position:absolute;
left:0em;
top:10%;
width:4em;
height:80%;
`
const topStyle = css`
position:absolute;
transform: rotateX(-89deg) translateZ(2em);
bottom:0em;
left:10%;
height:4em;
width:80%;
`
const bottomStyle = css`
position:absolute;
transform: rotateX(89deg) translateZ(2em);
top:0em;
left:10%;
height:4em;
width:80%;
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
border : gold 0.5em solid;
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