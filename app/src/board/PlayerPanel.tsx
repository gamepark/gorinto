/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import Element from '@gamepark/gorinto/types/Element'
import ElementInPile from '@gamepark/gorinto/types/ElementInPile'
import MoveType from '@gamepark/gorinto/types/MoveType'
import PlayerColor from '@gamepark/gorinto/types/PlayerColor'
import {FC, HTMLAttributes, useEffect, useState} from 'react'
import {useDrop} from 'react-dnd'
import CoinHeads from '../images/CoinHeads.png'

import BlackGor from '../images/GOR_TTS_playermat_black.png'
import BlueGor from '../images/GOR_TTS_playermat_blue.png'
import RedGor from '../images/GOR_TTS_playermat_red.png'
import WhiteGor from '../images/GOR_TTS_playermat_white.png'
import YellowGor from '../images/GOR_TTS_playermat_yellow.png'

import WisdomMarkBlack from '../images/GOR_TTS_wisdom_black.png'
import WisdomMarkBlue from '../images/GOR_TTS_wisdom_blue.png'
import WisdomMarkRed from '../images/GOR_TTS_wisdom_red.png'
import WisdomMarkWhite from '../images/GOR_TTS_wisdom_white.png'
import WisdomMarkYellow from '../images/GOR_TTS_wisdom_yellow.png'

import {getElementImage} from './ElementTile'
import ElementTileForPlayers from './ElementTileForPlayers'

type Props = {
    color:string,
    understanding:number[],
    position:number[],
    score:number,
    first:boolean,
    tilesToTake:{quantity : number, coordinates:{x:number,y:number}[], element?:Element} | undefined,
    mountainBoard:number[][][],
    activePlayer:PlayerColor | undefined,
} & HTMLAttributes<HTMLDivElement>

const PlayerPanel : FC<Props> = ({color, position, understanding, score, first, tilesToTake, mountainBoard, activePlayer, ...props}) => {

    console.log("caractère first du joueur",color,first)

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

      const [displayedScore, setDisplayedScore] = useState(score)
      const [scoreInterval, setScoreInterval] = useState<NodeJS.Timeout>()
      useEffect(() => {
          if (scoreInterval || displayedScore === score){
              return
          }
        const interval = setInterval(() => {setDisplayedScore(currentScore => {
            console.log("Dans le CurrentScore", currentScore, score);
            if (currentScore === score){
                console.log("Dans le CurrentScore+1");
                clearInterval(interval);
                setScoreInterval(undefined);
                return currentScore
            }
            return currentScore +1
        })}, 200)

        setScoreInterval(interval)


      }, [score])

    return(

        <div {...props} ref={dropPlayerRef} css={[playerPanelStyle(position, color, activePlayer), canDrop && canDropStyle, isOver && isOverStyle]}>

            <div css={playerHeaderStyle}>

                <div css={nameStyle}>{color}</div>
                <div css={avatarStyle}></div>
                <div css={gPStyle}>+XX GP</div>
                <div css={chronoStyle}>XX : XX</div>

            </div>

            <div css={playerFooterStyle}>

                <div css={[coinPosition]}><img alt="Coin" src={CoinHeads} css={coinStyle(first)}/></div>
                <div css={scoreStyle(color)}>{displayedScore}</div>

            </div>

            <div css={playerElementStyle}>

                {elementArray(understanding[Element.Void],0).length !== 0 ? elementArray(understanding[Element.Void],0).map((tile, index) =>
                    <div css={[voidStyle, elementSize, threeDStyle(index)]} key={index}>
                        <ElementTileForPlayers image = {getElementImage(tile)} element = {tile} position={index} />
                    </div>
                ): <div css={[voidStyle, elementSize]}></div>}

                {elementArray(understanding[Element.Wind],20).length !==0 ? elementArray(understanding[Element.Wind],20).map((tile, index) =>
                    <div css={[windStyle, elementSize, threeDStyle(index)]} key={index}>
                        <ElementTileForPlayers image = {getElementImage(tile)} element = {tile} position={index} />
                    </div>
                ): <div css={[windStyle, elementSize]}></div>}

                {elementArray(understanding[Element.Fire],40).length !==0 ? elementArray(understanding[Element.Fire],40).map((tile, index) =>
                    <div css={[fireStyle, elementSize, threeDStyle(index)]} key={index}>
                        <ElementTileForPlayers image = {getElementImage(tile)} element = {tile} position={index} />
                    </div>
                ): <div css={[fireStyle, elementSize]}></div>}

                {elementArray(understanding[Element.Water],60).length !==0 ? elementArray(understanding[Element.Water],60).map((tile, index) =>
                    <div css={[waterStyle, elementSize, threeDStyle(index)]} key={index}>
                        <ElementTileForPlayers image = {getElementImage(tile)} element = {tile} position={index} />
                    </div>
                ): <div css={[waterStyle, elementSize]}></div>}

                {elementArray(understanding[Element.Earth],80).length !==0 ? elementArray(understanding[Element.Earth],80).map((tile, index) =>
                    <div css={[earthStyle, elementSize, threeDStyle(index)]} key={index}>
                        <ElementTileForPlayers image = {getElementImage(tile)} element = {tile} position={index} />
                    </div>
                ): <div css={[earthStyle, elementSize]}></div>}

            </div>

            <div css={playerCounterStyle}>

                {understanding[Element.Void] > 3 && <div css={countVoid}> {understanding[Element.Void]} </div>}
                {understanding[Element.Wind] > 3 && <div css={countWind}> {understanding[Element.Wind]} </div>}
                {understanding[Element.Fire] > 3 && <div css={countFire}> {understanding[Element.Fire]} </div>}
                {understanding[Element.Water] > 3 && <div css={countWater}> {understanding[Element.Water]} </div>}
                {understanding[Element.Earth] > 3 && <div css={countEarth}> {understanding[Element.Earth]} </div>}

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

const playerPanelStyle = (position:number[], color:string, activePlayer:PlayerColor | undefined) => css`
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

@keyframes glowing {
    0% { box-shadow: 0px 0px 0.5em 0.1em gold; }
    45% { box-shadow: 0px 0px 1.5em 1em gold; }
    55% { box-shadow: 0px 0px 1.5em 1em gold; }
    100% { box-shadow: 0px 0px 0.5em 0.1em gold; }
}

${activePlayer === color && `animation: glowing 3000ms infinite;`};
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
bottom:5%;
right:3%;
width: 37%;

transform-style: preserve-3d;
`

const coinStyle = (isFirst:boolean) => css`
width:100%;
filter: drop-shadow(0 0 1em black);
${isFirst === false && `transform:translate3d(0,0,200em);`};
transform-style:preserve-3d;
transition:transform 2s;
`

const coinPosition = css`
margin-right:auto;
margin-left:auto;
padding-bottom:1em;
width:50%;
transform-style:preserve-3d;
`

const scoreStyle = (color:string) => css`
    padding-top:1em;
    padding-bottom:1em;
    font-size:2.9em;
    text-align: center;

    ${color === "white" &&`background : center / 60% url(${WisdomMarkWhite}) no-repeat;color:black;`};
    ${color === "black" &&`background : center / 60% url(${WisdomMarkBlack}) no-repeat;color:white;`};
    ${color === "red" &&`background : center / 60% url(${WisdomMarkRed}) no-repeat;color:white;`};
    ${color === "yellow" &&`background : center / 60% url(${WisdomMarkYellow}) no-repeat;color:black;`};
    ${color === "blue" &&`background : center / 60% url(${WisdomMarkBlue}) no-repeat;color:black;`};

`

export default PlayerPanel