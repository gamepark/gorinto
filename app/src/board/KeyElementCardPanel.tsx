/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {FC, HTMLAttributes} from 'react'
import Element from '@gamepark/gorinto/types/Element'
import {useTranslation} from 'react-i18next'
import {getElementName} from './ElementTile'
import Images from '../images/Images'

type Props = {
  element: Element,
} & HTMLAttributes<HTMLDivElement>

const KeyElementCardPanel: FC<Props> = ({element, ...props}) => {
  const {t} = useTranslation()
  return (
    <div css={keyElementCardCss(element)} {...props}>
      <div css={positionningX2}><span>x2</span></div>
      <div css={positionningElementText(element)}><span>{getElementName(element, t)}</span></div>
    </div>
  )
}

const keyElementCardCss = (element: Element) => css`
  background-image: url(${getKeyElementCardImage(element)});;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top;

  text-align: center;

  span {
    font-size: 1.8em;
  }
`

const positionningX2 = css`

  position: absolute;
  width: 50%;
  top: 12%;
  left: 25%;
  font-family: 'Bubblegum Sans', cursive;
`

const positionningElementText = (color: Element) => css`

  position: absolute;
  width: 50%;
  left: 25%;
  bottom: 13%;
  font-family: 'Bubblegum Sans', cursive;
  text-transform: uppercase;

  ${color === Element.Earth && `color: #bc9669;`}
  ${color === Element.Water && `color: #07a49d;`}
  ${color === Element.Fire && `color: #dea357;`}
  ${color === Element.Wind && `color: #b8cec2;`}
  ${color === Element.Void && ` color: #bf8b8d;`}
`

export function getKeyElementCardImage(element: Element) {
  switch (element) {
    case Element.Void:
      return Images.KeyElementCardVoid
    case Element.Wind:
      return Images.KeyElementCardWind
    case Element.Fire:
      return Images.KeyElementCardFire
    case Element.Water:
      return Images.KeyElementCardWater
    case Element.Earth:
      return Images.KeyElementCardEarth
  }
}

export default KeyElementCardPanel