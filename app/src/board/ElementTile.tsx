/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
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

    image:string,
    position?:number,
    draggable?:boolean,
    draggableItem: Omit<ElementInPath ,"hoverPile" > | Omit<ElementInPile, "hoverPile">,
    element:Element,
    isSelected:boolean

} & HTMLAttributes<HTMLDivElement>



const ElementTile : FC<Props> = ({image, draggable=false, draggableItem,  element, position=0, isSelected, ...props}) => {

    const play = usePlay <MoveTile> ()
    const [displayHeight, setDisplayHeight] = useState(position)
    useEffect( () => setDisplayHeight(position) , [position])
    const item = {...draggableItem, hoverPile:setDisplayHeight}

        return(

            <Draggable canDrag={draggable} item={item} css={elementTileStyle} drop={play} {...props} preTransform= {`translateZ(${displayHeight*4.01+0.01}em)`}  end = {() => setDisplayHeight(position)}>

                    <div css={topStyle(image)}></div>
                    <div css={[frontStyle, coloring(element), bordering]}></div>
                    <div css={[bottomStyle(position), coloring(element), canBeDragged(draggable), bordering, isFocused(isSelected)]}></div>
                    <div css={[rightStyle, coloring(element), bordering]}></div>
                    <div css={[leftStyle, coloring(element), bordering]}></div>
                    <div css={[backStyle, coloring(element), bordering]}></div>

                    <div css={[coloring(element), transFrontLeft]}></div>
                    <div css={[coloring(element), transFrontRight]}></div>
                    

            </Draggable>

        )

}

const thickness = 4;            //em unit

const elementTileStyle = css`
    position : absolute;
    left : 0%;
    top : 0%;
    width : 100%;
    height:100%;

    transform-style: preserve-3d;
`

const isFocused = (focus:boolean) => css`

@keyframes glowingFocus {
  0% { box-shadow: 0px 0px 1em 0.2em #e58f01; }
  45% { box-shadow: 0px 0px 1.5em 1em #e58f01; }
  55% { box-shadow: 0px 0px 1.5em 1em #e58f01; }
  100% { box-shadow: 0px 0px 1em 0.2em #e58f01; }
}

${focus === true && `animation: glowingFocus 3000ms infinite;`};
border-radius:20%;
`

const coloring = (color:Element) => css`
    ${color === Element.Void && `background-color : #805474`};
    ${color === Element.Wind && `background-color : #cee0d7`};
    ${color === Element.Fire && `background-color : #fc671a`};
    ${color === Element.Water && `background-color : #00bab3`};
    ${color === Element.Earth && `background-color : #996c59`};
    
`

const bordering = css`border:0.1em black solid;`

const canBeDragged = (isDraggable:boolean) => css`

    @keyframes glowing {
        0% { box-shadow: 0px 0px 1em 0.2em gold; }
        45% { box-shadow: 0px 0px 1.5em 1em gold; }
        55% { box-shadow: 0px 0px 1.5em 1em gold; }
        100% { box-shadow: 0px 0px 1em 0.2em gold; }
    }

    ${isDraggable === true && `animation: glowing 3000ms infinite;`};
    border-radius:20%;
`

const transFrontLeft = css`
  position:absolute;
  transform-style:preserve-3d;

  transform-origin:left;
  transform: rotateY(-90deg) rotateX(-45deg);
  left:6.25%;
  bottom:0%;

  width:${thickness}em;
  height:17.67%;
`

const transFrontRight = css`
  position:absolute;
  transform-style:preserve-3d;

  transform-origin:right;
  transform: rotateY(90deg) rotateX(-45deg);
  right:6.25%;
  bottom:0%;

  width:${thickness}em;
  height:17.67%;
`

const rightStyle = css`
    position:absolute;
    transform-style:preserve-3d;

    transform-origin:right;
    transform: rotateY(90deg) ;
    right:1px;
    top:12.5%;

    width:${thickness}em;
    height:75%;
`
const leftStyle = css`
    position:absolute;
    transform-style:preserve-3d;

    transform-origin:left;
    transform: rotateY(-90deg);
    left:1px;
    top:12.5%;

    width:${thickness}em;
    height:75%;
`
const frontStyle = css`
    position:absolute;
    transform-style:preserve-3d;

    transform-origin:bottom;
    transform : rotateX(-90deg);
    bottom:1px;
    left:12.5%;

    height:${thickness}em;
    width:75%;
`
const backStyle = css`
    position:absolute;
    transform-style:preserve-3d;

    transform-origin:top;
    transform: rotateX(90deg);
    top:1px;
    left:12.5%;

    height:${thickness}em;
    width:75%;
`

const topStyle = (image:string) => css`
    position:absolute;
    transform: translateZ(${thickness}em);
    width:100%;
    height:100%;
    background-image:url(${image});
    background-repeat:no-repeat;
    background-size:100% 100%;
    border-radius:15%;
`
const bottomStyle = (position:number) => css`
    position:absolute;
    height:100%;
    width:100%;
    border-radius:15%;

    ${position === 0 && `box-shadow: 0px 0px 1.5em 0.5em black;`} 
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