import { css } from "@emotion/core";
import { FC } from "react";
import Element from "../types/Element";

const KeyElementCardPanel : FC<{image:string, element:Element, position:number}> = ({image, element, position}) => {

    return(

        <div css={keyElementCardPanelStyle(position, image)}>

            <span>Elément Clé : {element}</span>

        </div>

    )

}

const keyElementCardPanelStyle = (position:number, image:string) => css`
position : absolute;
top : ${position * 25}%;
left : 0px;
border : 1px solid black;
width:100%;
height:25%;

background-image:${image}
`

export default KeyElementCardPanel