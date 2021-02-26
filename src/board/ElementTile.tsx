import { css } from "@emotion/core";
import { FC } from "react";
import Element from "../types/Element";

const ElementTile : FC<{image:string, element:Element, position:number}> = ({image, element, position}) => {

    return(

        <div css={elementTileStyle(position, image)}>

            <span>{element}</span>

        </div>

    )

}

const elementTileStyle = (position:number, image : string) => css`
position : absolute;
left : ${position * 10}%;
top : 0%;
width : 10%;
height:100%;

background-image : url(${image});
background-size : contain;
background-repeat : no-repeat;
background-position :center;

`

export default ElementTile