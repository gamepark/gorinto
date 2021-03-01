import { css } from "@emotion/core";
import { FC } from "react";
import Element from "../types/Element";

const ElementTile : FC<{image:string, element:Element, position:number}> = ({image, element}) => {

    return(

        <div css={elementTileStyle(image)}>

            <span>{element}</span>

        </div>

    )

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