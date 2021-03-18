/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import Element from "@gamepark/gorinto/types/Element";
import KeyElementCard from "@gamepark/gorinto/types/KeyElementCard";

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
top:10%;
left:25%;
font-family: 'Bubblegum Sans', cursive;

`

const positionningElementText = (color:Element) => css`

position:absolute;
width:50%;
left:25%;
bottom:24%;
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
top : 10%;
left : ${position*10}%;
width : 10%;
height : 15%;
font-size:1.7em;
text-align:center;

background-image : url(${image});;
background-size : contain;
background-repeat : no-repeat;
background-position : top;
`

export default KeyElementCardPanel