import { css } from "@emotion/core";
import { FC } from "react";
import Element from "../types/Element";
import KeyElementCard from "../types/KeyElementCard";

const KeyElementCardPanel : FC<{keyCard : KeyElementCard, position:number}> = ({keyCard, position}) => {

    return(

        <div css={keyElementCardPanelStyle(position, keyCard.image)}>

            <div css={positionningX2}><span>x2</span></div>

            <div css={positionningElementText(keyCard.element)}><span>{keyCard.element}</span></div>

        </div>

    )

}

const positionningX2 =  css`

position:absolute;
width:50%;
top:15%;
left:25%;
font-family: 'Bubblegum Sans', cursive;

`

const positionningElementText = (color:Element) => css`

position:absolute;
width:50%;
left:25%;
bottom:14%;
font-family: 'Bubblegum Sans', cursive;
text-transform:uppercase;

${color === Element.Earth &&
    `
      color: #bc9669;
    `
}
${color === Element.Water &&
    `
      color: #07a49d;
    `
}
${color === Element.Fire &&
    `
      color: #dea357;
    `
}
${color === Element.Wind &&
    `
      color: #b8cec2;
    `
}
${color === Element.Void &&
    `
      color: #bf8b8d;
    `
}

`

const keyElementCardPanelStyle = (position:number, image:string) => css`
position : absolute;
top : ${position * 25}%;
left : 0%;
width : 100%;
height : 25%;
font-size:2em;
text-align:center;
padding:2%;


background-image : url(${image});;
background-size : contain;
background-repeat : no-repeat;
background-position : center;
`

export default KeyElementCardPanel