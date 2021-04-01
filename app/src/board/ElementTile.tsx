/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
import MoveTile from '@gamepark/gorinto/moves/MoveTile'
import Element from '@gamepark/gorinto/types/Element'
import {usePlay} from '@gamepark/react-client'
import {Draggable} from '@gamepark/react-components'
import {TFunction} from 'i18next'
import {FC, HTMLAttributes, useEffect, useState} from 'react'
import Earth from '../images/ElementEarth.jpg'
import Fire from '../images/ElementFire.jpg'
import Void from '../images/ElementVoid.jpg'
import Water from '../images/ElementWater.jpg'
import Wind from '../images/ElementWind.jpg'
import ElementInPath from './ElementInPath'
import ElementInPile from './ElementInPile'

type Props = {

    position?: number,
    draggable?: boolean,
    type: 'ElementInPath' | 'ElementInPile',
    draggableItem: Omit<ElementInPath, "hoverPile"> | Omit<ElementInPile, "hoverPile">,
    element: Element,
    isSelected: boolean

} & HTMLAttributes<HTMLDivElement>


const ElementTile: FC<Props> = ({draggable = false, draggableItem, element, position = 0, isSelected, ...props}) => {

    const play = usePlay<MoveTile>()
    const [displayHeight, setDisplayHeight] = useState(position)
    useEffect(() => setDisplayHeight(position), [position])
    const item = {...draggableItem, hoverPile: setDisplayHeight}

    return (
        <Draggable canDrag={draggable} item={item} end={() => setDisplayHeight(position)} drop={play}
                   css={[elementTileStyle, image(element), color(element), isSelected ? glowingGreen : draggable ? glowingGold : position === 0 && shadow]}
                   preTransform={`translateZ(${displayHeight * 4.01 + 0.01}em)`}
                   {...props}>
            <div css={[diagonal, diagonal1, color(element)]}/>
            <div css={[diagonal, diagonal2, color(element)]}/>
        </Draggable>
    )

}

const thickness = 4; //em unit

const elementTileStyle = css`
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

    &:after {
        content: '';
        position: absolute;
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

const diagonal1 = css`
    width: 127%;
    top: -2.6em;
    left: 0;
    transform: rotateZ(38deg) rotateX(-90deg);
    border-right: 0.1em black solid;
`

const diagonal2 = css`
    width: 130%;
    top: -3.5em;
    left: 0.5em;
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
            return css`background: linear-gradient(to right, #714a66, #614058);`
        case Element.Wind:
            return css`background: linear-gradient(to right, #bed6ca, #afccbd);`
        case Element.Fire:
            return css`background: linear-gradient(to right, #f95703, #e04e03);`
        case Element.Water:
            return css`background: linear-gradient(to right, #00a09a, #008782);`
        case Element.Earth:
            return css`background: linear-gradient(to right, #896150, #795546);`
    }
}

const glowingGoldKeyframes = keyframes`
    0% {
        box-shadow: 0 0 1em 0.2em gold;
    }
    90%, 100% {
        box-shadow: 0 0 1.5em 1em gold;
    }
`

const glowingGold = css`
    animation: ${glowingGoldKeyframes} 1.5s infinite alternate;
`

const glowingGreenKeyframes = keyframes`
    0% {
        box-shadow: 0 0 1em 0.2em gold;
    }
    90%, 100% {
        box-shadow: 0 0 1.5em 1em gold;
    }
`

const glowingGreen = css`
    animation: ${glowingGreenKeyframes} 1.5s infinite alternate;
`

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

export default ElementTile