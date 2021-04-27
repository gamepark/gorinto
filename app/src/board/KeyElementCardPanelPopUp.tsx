/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, HTMLAttributes } from "react";
import Element from '@gamepark/gorinto/types/Element'
import {useTranslation} from 'react-i18next'
import {getElementName} from './ElementTile'
import {getKeyElementCardImage} from './KeyElementCardPanel'

type Props ={
  element : Element,
  position : number
} & HTMLAttributes<HTMLDivElement>

const KeyElementCardPanelPopUp : FC<Props> = ({element, position}) => {
  const {t} = useTranslation()

    return(

        <div css={[keyElementCardPanelStyle(getKeyElementCardImage(element)), keyElementCardPanelPositionStyle(position)]}>

            <div css={positionningX2}><span>x2</span></div>

            <div css={positionningElementText(element)}><span>{getElementName(element, t)}</span></div>

        </div>

    )

}

const keyElementCardPanelPositionStyle = (position:number) => css`
position : absolute;
bottom : 5%;
left : ${31.5+position*20.5}%;

width : 17%;
height : 30%;
`

const positionningX2 =  css`

position:absolute;
width:50%;
top:13%;
left:25%;
font-family: 'Bubblegum Sans', cursive;

`

const positionningElementText = (color:Element) => css`

position:absolute;
width:50%;
left:25%;
bottom:12%;
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

const keyElementCardPanelStyle = (image:string) => css`

font-size:2.2em;
text-align:center;

background-image : url(${image});;
background-size : contain;
background-repeat : no-repeat;
background-position : top;
`

export default KeyElementCardPanelPopUp