/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import { ElementBag } from '@gamepark/gorinto/cards/Elements'
import Element from '@gamepark/gorinto/types/Element'
import ElementInPile from '@gamepark/gorinto/types/ElementInPile'
import MoveType from '@gamepark/gorinto/types/MoveType'
import {FC, HTMLAttributes} from 'react'
import {useDrop} from 'react-dnd'
import CoinHeads from '../images/CoinHeads.png'
import ElementEarth from '../images/ElementEarth.png'
import ElementFire from '../images/ElementFire.png'
import ElementVoid from '../images/ElementVoid.png'
import ElementWater from '../images/ElementWater.png'
import ElementWind from '../images/ElementWind.png'
import BlackGor from '../images/GOR_TTS_score_black.png'
import BlueGor from '../images/GOR_TTS_score_blue.png'
import RedGor from '../images/GOR_TTS_score_red.png'
import WhiteGor from '../images/GOR_TTS_score_white.png'
import YellowGor from '../images/GOR_TTS_score_yellow.png'
import ElementTileForPlayers from './ElementTileForPlayers'

type Props = {
    color:string, 
    understanding:any, 
    position:number, 
    score:number, 
    first:boolean,
    tilesToTake:{quantity : number, coordinates:{x:number,y:number}[], element?:Element} | undefined,
    mountainBoard:number[][][],
} & HTMLAttributes<HTMLDivElement>

const PlayerPanel : FC<Props> = ({color, position, understanding, score, first, tilesToTake, mountainBoard, ...props}) => {

    const [{canDrop, isOver}, dropPlayerRef] = useDrop({
        accept: ["Element"],
        canDrop: (item: ElementInPile) => {
            if (tilesToTake !== undefined){

                if (tilesToTake.element !== Element.Earth){
                    return(
                        (tilesToTake.coordinates.find(coord => (coord.x === item.x) && (coord.y === item.y)) !== undefined)
                        &&
                        (item.z === mountainBoard[item.x][item.y].length - 1)
                    )
                }
               else {
                   return (
                    (tilesToTake.coordinates.find(coord => (coord.x === item.x) && (coord.y === item.y)) !== undefined)
                    &&
                    (item.z !== mountainBoard[item.x][item.y].length - 1)
                       
                   )
               }


            } else {
                return false
            }

        },
        collect: monitor => ({
          canDrop: monitor.canDrop(),
          isOver: monitor.isOver()
        }),
        drop: (item: ElementInPile) => {
            
                if (tilesToTake!.element !== Element.Earth){
                    return {type : MoveType.TakeTile, coordinates:{x:item.x, y:item.y} };
                } else {
                    return {type : MoveType.TakeTile, coordinates:{x:item.x, y:item.y, z:item.z} };
                }
    

        }
      })

    return(

        <div {...props} ref={dropPlayerRef} css={[playerPanelStyle(position, color), canDrop && canDropStyle, isOver && isOverStyle]}>

            <div css={playerHeaderStyle}>

                <span>Color : {color} - </span> <span>Score : {score}</span>

            </div>

            <div css={playerElementStyle}>

                {elementArray(understanding.void,0).length !== 0 ? elementArray(understanding.void,0).map((tile, index) =>  
                    <div css={[voidStyle, elementSize, threeDStyle(index)]} key={index}>
                        <ElementTileForPlayers image = {ElementBag[tile].image} element = {ElementBag[tile].element} />
                    </div>
                ): <div css={[voidStyle, elementSize]}></div>}

                {elementArray(understanding.wind,20).length !==0 ? elementArray(understanding.wind,20).map((tile, index) =>  
                    <div css={[windStyle, elementSize, threeDStyle(index)]} key={index}>
                        <ElementTileForPlayers image = {ElementBag[tile].image} element = {ElementBag[tile].element} />
                    </div>
                ): <div css={[windStyle, elementSize]}></div>}

                {elementArray(understanding.fire,40).length !==0 ? elementArray(understanding.fire,40).map((tile, index) =>  
                    <div css={[fireStyle, elementSize, threeDStyle(index)]} key={index}>
                        <ElementTileForPlayers image = {ElementBag[tile].image} element = {ElementBag[tile].element} />
                    </div>
                ): <div css={[fireStyle, elementSize]}></div>}

                {elementArray(understanding.water,60).length !==0 ? elementArray(understanding.water,60).map((tile, index) =>  
                    <div css={[waterStyle, elementSize, threeDStyle(index)]} key={index}>
                        <ElementTileForPlayers image = {ElementBag[tile].image} element = {ElementBag[tile].element} />
                    </div>
                ): <div css={[waterStyle, elementSize]}></div>}

                {elementArray(understanding.earth,80).length !==0 ? elementArray(understanding.earth,80).map((tile, index) =>  
                    <div css={[earthStyle, elementSize, threeDStyle(index)]} key={index}>
                        <ElementTileForPlayers image = {ElementBag[tile].image} element = {ElementBag[tile].element} />
                    </div>
                ): <div css={[earthStyle, elementSize]}></div>}

            </div>

            <div css={playerCounterStyle}>

                {understanding.void > 3 && <div css={countVoid}> {understanding.void} </div>}
                {understanding.wind > 3 && <div css={countWind}> {understanding.wind} </div>}
                {understanding.fire > 3 && <div css={countFire}> {understanding.fire} </div>}
                {understanding.water > 3 && <div css={countWater}> {understanding.water} </div>}
                {understanding.earth > 3 && <div css={countEarth}> {understanding.earth} </div>}

            </div>

            <div>

                {first && <img alt="Coin" src={CoinHeads} css={coinStyle}/>}

            </div>

        </div>

    )

}

function elementArray(understanding:number, element:number) : number[]{

    const result : number[] = []
    for (let i=0;i<understanding;i++){
        result.push(element);
        if (result.length === 3){break}
    }
    return result

}

const threeDStyle = (position:number) => css`
transform:translateZ(${position*0.75}em);
transform-style: preserve-3d;
`

const playerCounterStyle = css`
position:absolute;
top:50%;
right:8%;
width:90%;
height:10%;
text-align:center;
transform-style: preserve-3d;

div{
    border-radius:100%;
    background-color : rgba(7,7,7, 0.5);
    color:white;
    position:absolute;
    width:15%;
    padding-top:0.5em;
    padding-bottom:0.5em;
    font-size:2em;
    transform-style: preserve-3d;
    transform:translateZ(3em);
}

`
const countVoid = css`right:80%;`
const countWind = css`right:60%;`
const countFire = css`right:40%;`
const countWater = css`right:20%;`
const countEarth = css`right:0%;`

const elementSize = css`
position:absolute;
top:0%;
width:15%;
height:90%;
`

const voidStyle = css`right:80% ; background:center/contain url(${ElementVoid}) no-repeat;`
const windStyle = css`right:60% ; background:center/contain url(${ElementWind}) no-repeat;`
const fireStyle = css`right:40% ; background:center/contain url(${ElementFire}) no-repeat;`
const waterStyle = css`right:20% ; background:center/contain url(${ElementWater}) no-repeat;`
const earthStyle = css`right:0% ; background:center/contain url(${ElementEarth}) no-repeat;`

const canDropStyle = css`
opacity:0.4;
background-color:red;
`

const isOverStyle = css`
opacity:0.6;
background-color:red;
`

const coinStyle = css`
width:12%;
position:absolute;
top:8%;
left:4%;

filter: drop-shadow(0 0 1em black);
`


const playerPanelStyle = (position:number, color:string) => css`
position : absolute;
transform-style: preserve-3d;
top : ${position * 20}%;
right : 0%;
width : 100%;
height : 20%;

${color === "yellow" &&`background : rgba(7,7,7, 0.5) bottom left 5%/18% url(${YellowGor}) no-repeat`};
${color === "blue" &&`background : rgba(7,7,7, 0.5) bottom left 5%/18% url(${BlueGor}) no-repeat`};
${color === "red" &&`background : rgba(7,7,7, 0.5) bottom left 5%/18% url(${RedGor}) no-repeat`};
${color === "white" &&`background : rgba(7,7,7, 0.5) bottom left 5%/18% url(${WhiteGor}) no-repeat`};
${color === "black" &&`background : rgba(7,7,7, 0.5) bottom left 5%/18% url(${BlackGor}) no-repeat`};

box-shadow: 0em 0em 1em 0.5em black;
`

const playerHeaderStyle = css`
position : absolute;
top : 5%;
right : 5%;
width : 100%;
height : 20%;
font-size:2.1em;
`

const playerElementStyle = css`
position : absolute;
top : 40%;
right : 5%;
font-size:1.8em;
width:90%;
height:30%;

transform-style: preserve-3d;

`

export default PlayerPanel