/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, HTMLAttributes } from "react";
import Element from '@gamepark/gorinto/types/Element'
import {useTranslation} from 'react-i18next'
import {getElementName} from './ElementTile'
import KeyElementCardVoid from '../images/KeyElementCardVoid.jpg'
import KeyElementCardWind from '../images/KeyElementCardWind.jpg'
import KeyElementCardFire from '../images/KeyElementCardFire.jpg'
import KeyElementCardWater from '../images/KeyElementCardWater.jpg'
import KeyElementCardEarth from '../images/KeyElementCardEarth.jpg'

type Props ={
  element : Element,
  position : number,
  open: () => void
} & HTMLAttributes<HTMLDivElement>

const KeyElementCardPanel : FC<Props> = ({element, position, open, ...props}) => {
  const {t} = useTranslation()

    return(

        <div css={[keyElementCardPanelStyle(getKeyElementCardImage(element)), keyElementCardPanelPositionStyle(position)]} onClick={open}>

            <div css={positionningX2}><span>x2</span></div>

            <div css={positionningElementText(element)}><span>{getElementName(element, t)}</span></div>

        </div>

    )

}

const keyElementCardPanelPositionStyle = (position:number) => css`
position : absolute;
top : 10%;
left : ${position*10}%;
`

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

const keyElementCardPanelStyle = (image:string) => css`

width : 10%;
height : 15%;
font-size:1.7em;
text-align:center;

background-image : url(${image});;
background-size : contain;
background-repeat : no-repeat;
background-position : top;
`

export function getKeyElementCardImage(element: Element) {
  switch (element) {
    case Element.Void:
      return KeyElementCardVoid
    case Element.Wind:
      return KeyElementCardWind
    case Element.Fire:
      return KeyElementCardFire
    case Element.Water:
      return KeyElementCardWater
    case Element.Earth:
      return KeyElementCardEarth
  }
}

export default KeyElementCardPanel