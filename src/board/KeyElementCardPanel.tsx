import { css } from "@emotion/core";
import { FC } from "react";
import KeyElementCard from "../types/KeyElementCard";

const KeyElementCardPanel : FC<{keyCard : KeyElementCard, position:number}> = ({keyCard, position}) => {

    return(

        <div css={keyElementCardPanelStyle(position, keyCard.image)}>

            <span>Elément Clé : {keyCard.element}</span>

        </div>

    )

}

const keyElementCardPanelStyle = (position:number, image:string) => css`
position : absolute;
top : ${position * 25}%;
left : 0px;
width : 100%;
height : 25%;

background-image : url(${image});
background-size : contain;
background-repeat : no-repeat;
background-position : center;
`

export default KeyElementCardPanel