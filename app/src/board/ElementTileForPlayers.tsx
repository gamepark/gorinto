/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import {FC, HTMLAttributes} from "react";
import Element from "@gamepark/gorinto/types/Element";

type Props = {

    image:string,
    element:Element
    position:number

} & HTMLAttributes<HTMLDivElement>

const ElementTileForPlayers : FC<Props> = ({image, element, position, ...props}) => {

        return(

            <div css={elementTileStyle} {...props} >

                    <div css={topStyle(image)}></div>
                    <div css={[frontStyle, coloring(element)]}></div>
                    <div css={[bottomStyle(position), coloring(element)]}></div>
                    <div css={[rightStyle, coloring(element)]}></div>
                    <div css={[leftStyle, coloring(element)]}></div>
                    <div css={[backStyle, coloring(element)]}></div>

            </div>

        )

}

const thickness = 0.75;            //em unit

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
    border-radius:22%;
`
const bottomStyle = (position:number) => css`
    position:absolute;
    height:100%;
    width:100%;
    border-radius:20%;

    ${position === 0 && `box-shadow: 0px 0px 0.5em 0.1em black;`}
`

export default ElementTileForPlayers