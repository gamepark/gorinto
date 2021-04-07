/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
import Element from '@gamepark/gorinto/types/Element'
import {TFunction} from 'i18next'
import {FC, HTMLAttributes} from 'react'
import Earth from '../images/ElementEarth.jpg'
import Fire from '../images/ElementFire.jpg'
import Void from '../images/ElementVoid.jpg'
import Water from '../images/ElementWater.jpg'
import Wind from '../images/ElementWind.jpg'

type Props = {

    position: number,
    element: Element,

} & HTMLAttributes<HTMLDivElement>


const ElementTileForPlayers: FC<Props> = ({element, position, ...props}) => {

    return (
        <div css={[elementTileStyle(position), image(element), color(element), position === 0 && shadow]}
                   {...props}>
            <div css={[diagonal, diagonal1(position), color(element)]}/>
            <div css={[diagonal, diagonal2(position), color(element)]}/>
        </div>
    )

}

const thickness = 1.25; //em unit

const elementTileStyle = (position:number) => css`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 15%;
    border: 0.1em black solid;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    outline: 1px solid transparent;
    transform: translateZ(${(position)*thickness}em);

    &:after {
        content: '';
        position: absolute;
        left:0%;
        width: 100%;
        height: 100%;
        border-radius: 15%;
        border: 0.1em black solid;
        background-size: cover;
        transform: translateZ(${thickness}em);
        backface-visibility: hidden;
        outline: 1px solid transparent;
    }
`

const diagonal = css`
    position: absolute;
    height: ${thickness - 0.1}em;
    transform-origin: bottom left;
    backface-visibility: hidden;
    outline: 1px solid transparent;
`

const diagonal1 = (position:number) => css`
    width: 127%;
    top: -0.8em;
    left: 0;
    transform: rotateZ(38deg) rotateX(-90deg);
    border-right: 0.1em black solid;
`

const diagonal2 = (position:number) => css`
    width: 130%;
    top: -1.1em;
    left: 0em;
    transform: rotateZ(45deg) rotateX(-90deg);
    border-left: 0.1em black solid;
`

const image = (element: Element) => css`
    &:after {
        background-image: url(${getElementImage(element)});
    }
`

const color = (element: Element) => {
    switch (element) {
        case Element.Void:
            return css`background: rgb(157,106,143);
            background: linear-gradient(90deg, rgba(157,106,143,1) 0%, rgba(143,94,130,1) 6%, rgba(97,64,88,1) 20%, rgba(97,64,88,1) 100%);
             `
        case Element.Wind:
            return css`background: rgb(222,234,228);
            background: linear-gradient(90deg, rgba(222,234,228,1) 0%, rgba(206,224,215,1) 6%, rgba(175,204,189,1) 20%, rgba(175,204,189,1) 100%);
            `
        case Element.Fire:
            return css`background: rgb(252,119,51);
            background: linear-gradient(90deg, rgba(252,119,51,1) 0%, rgba(252,103,26,1) 6%, rgba(224,78,3,1) 20%, rgba(224,78,3,1) 100%);`
        case Element.Water:
            return css`background: rgb(0,211,204);
            background: linear-gradient(90deg, rgba(0,211,204,1) 0%, rgba(0,186,179,1) 6%, rgba(0,135,130,1) 20%, rgba(0,135,130,1) 100%);`
        case Element.Earth:
            return css`background: rgb(166,120,101);
            background: linear-gradient(90deg, rgba(166,120,101,1) 0%, rgba(153,108,89,1) 6%, rgba(121,85,70,1) 20%, rgba(121,85,70,1) 100%);`
    }
}

const shadow = css`
    box-shadow: 0 0 1.5em 0.5em black;
`

export function getElementImage(element: Element) {
    switch (element) {
        case Element.Void:
            return Void
        case Element.Wind:
            return Wind
        case Element.Fire:
            return Fire
        case Element.Water:
            return Water
        case Element.Earth:
            return Earth
    }
}

export function getElementName(element: Element, t: TFunction) {
    switch (element) {
        case Element.Void:
            return t('Void')
        case Element.Wind:
            return t('Wind')
        case Element.Fire:
            return t('Fire')
        case Element.Water:
            return t('Water')
        case Element.Earth:
            return t('Earth')
    }
}

export default ElementTileForPlayers