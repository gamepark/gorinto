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
import BlackGor from '../images/GOR_TTS_playermat_black.png'
import BlueGor from '../images/GOR_TTS_playermat_blue.png'
import RedGor from '../images/GOR_TTS_playermat_red.png'
import WhiteGor from '../images/GOR_TTS_playermat_white.png'
import YellowGor from '../images/GOR_TTS_playermat_yellow.png'
import ElementTileForPlayers from './ElementTileForPlayers'

type Props = {
    color:string, 
    understanding:any, 
    position:number[], 
    score:number, 
    first:boolean,
    tilesToTake:{quantity : number, coordinates:{x:number,y:number}[], element?:Element} | undefined,
    mountainBoard:number[][][],
} & HTMLAttributes<HTMLDivElement>

const PlayerPanel : FC<Props> = ({color, position, understanding, score, first, tilesToTake, mountainBoard, ...props}) => {

    const [{canDrop, isOver}, dropPlayerRef] = useDrop({
        accept: "ElementInPile",
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

                <div css={nameStyle}>{color}</div>
                <div css={avatarStyle}></div>
                <div css={gPStyle}>+XX GP</div>
                <div css={chronoStyle}>XX : XX</div>

            </div>

            <div css={playerFooterStyle}>

                <div css={coinPosition}>{first && <img alt="Coin" src={CoinHeads} css={coinStyle}/>}</div>
                <div css={scoreStyle}>{score} pts</div>

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
bottom : 6%;
left : 25%;
width:15%;
height:92%;
text-align:center;
transform-style: preserve-3d;
transform:translateZ(4.05em);

div{
    position:absolute;
    left:5%;
    border-radius:100%;
    background-color : rgba(7,7,7, 0.5);
    color:white;
    width:70%;
    padding-top:0.2em;
    padding-bottom:0.2em;
    font-size:2.5em;
    transform-style: preserve-3d;

}

`
const countVoid = css`bottom:80%;`
const countWind = css`bottom:60%;`
const countFire = css`bottom:40%;`
const countWater = css`bottom:20%;`
const countEarth = css`bottom:0%;`

const elementSize = css`
position:absolute;
width:85%;
height:15%;
`

const voidStyle = css`bottom:81% ;`
const windStyle = css`bottom:61% ;`
const fireStyle = css`bottom:41% ;`
const waterStyle = css`bottom:21% ;`
const earthStyle = css`bottom:1% ;`

const canDropStyle = css`
opacity:0.4;
background-color:red;
`

const isOverStyle = css`
opacity:0.6;
background-color:red;
`

const playerPanelStyle = (position:number[], color:string) => css`
position : absolute;
transform-style: preserve-3d;
bottom : ${position[1] * 37.5}%;
left : ${position[0] * 79}%;
width : 20%;
height : 37.5%;
text-align:right;

${color === "yellow" &&`background : rgba(7,7,7, 0.5) bottom left 5%/54% url(${YellowGor}) no-repeat`};
${color === "blue" &&`background : rgba(7,7,7, 0.5) bottom left 5%/54% url(${BlueGor}) no-repeat`};
${color === "red" &&`background : rgba(7,7,7, 0.5) bottom left 5%/54% url(${RedGor}) no-repeat`};
${color === "white" &&`background : rgba(7,7,7, 0.5) bottom left 5%/54% url(${WhiteGor}) no-repeat`};
${color === "black" &&`background : rgba(7,7,7, 0.5) bottom left 5%/54% url(${BlackGor}) no-repeat`};

box-shadow: 0em 0em 1em 0.5em black;
`

const playerHeaderStyle = css`
position : absolute;
top : 3%;
right : 3%;
width : 45%;
height : 50%;
`

const nameStyle = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size:2.9em;
  text-align:center;
  padding-bottom:0.5em;
`

const gPStyle = css`
font-size:2.5em;
text-align:center;
padding-top:0.5em;
display:none;                       // Need switch with chrono
`

const chronoStyle = css`
font-size:2.5em;
text-align:center;
padding-top:0.5em;
//display:none;                     // Need switch with gp
`

const avatarStyle = css`
border:0.5em solid black;
border-radius:100%;
background-color:white;

margin-right: auto;
margin-left: auto;

height:7em;
width:7em;
`

const playerElementStyle = css`
position : absolute;
bottom : 3%;
left : 24%;
font-size:1.8em;
width:18%;
height:92%;

transform-style: preserve-3d;
`

const playerFooterStyle = css`

position:absolute;
bottom:2%;
right:3%;
width: 37%;
`

const coinStyle = css`
width:100%;
filter: drop-shadow(0 0 1em black);
`

const coinPosition = css`
margin-right:auto;
margin-left:auto;
width:50%;
`

const scoreStyle = css`
    padding-top:0.5em;
    padding-bottom:0.5em;
    font-size:2.9em;
    text-align: center;

`

export default PlayerPanel