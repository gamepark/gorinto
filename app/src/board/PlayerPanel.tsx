/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import Element from '@gamepark/gorinto/types/Element'
import ElementInPile from '@gamepark/gorinto/types/ElementInPile'
import ElementTile from '@gamepark/gorinto/types/ElementTile'
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

type Props = {
    color:string, 
    understanding:any, 
    position:number, 
    score:number, 
    first:boolean,
    tilesToTake:{quantity : number, coordinates:{x:number,y:number}[], element?:Element} | undefined,
    mountainBoard:ElementTile[][][],
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

                <span> <img src ={ElementVoid} alt="void" css={smallImagesStyle}/> : {understanding.void} </span>
                <span> <img src ={ElementWind} alt="wind" css={smallImagesStyle}/> : {understanding.wind} </span>
                <span> <img src ={ElementFire} alt="fire" css={smallImagesStyle}/> : {understanding.fire} </span>
                <span> <img src ={ElementWater} alt="water" css={smallImagesStyle}/> : {understanding.water} </span>
                <span> <img src ={ElementEarth} alt="earth" css={smallImagesStyle}/> : {understanding.earth} </span>

            </div>

            <div>

                {first && <img alt="Coin" src={CoinHeads} css={coinStyle}/>}

            </div>

        </div>

    )

}

const canDropStyle = css`
opacity:0.4;
background-color:red;
`

const isOverStyle = css`
opacity:0.6;
background-color:red;
`

const coinStyle = css`
width:15%;
position:absolute;
bottom:10%;
right:7.5%;

filter: drop-shadow(0 0 1em black);
`

const smallImagesStyle = css`
width:8%;
height:8%;
`

const playerPanelStyle = (position:number, color:string) => css`
position : absolute;
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
top : 30%;
right : 5%;
font-size:1.8em;

`

export default PlayerPanel