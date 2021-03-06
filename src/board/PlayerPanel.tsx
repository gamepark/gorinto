import { css } from "@emotion/core";
import { FC } from "react";
import ElementVoid from "../images/ElementVoid.png";
import ElementWind from "../images/ElementWind.png";
import ElementFire from "../images/ElementFire.png";
import ElementWater from "../images/ElementWater.png";
import ElementEarth from "../images/ElementEarth.png";
import CoinHeads from "../images/CoinHeads.png";
import { usePlay } from "@gamepark/workshop";
import TakeTile from "../moves/TakeTile";
import { useDrop } from "react-dnd";
import ElementInPile from "../types/ElementInPile";
import MoveType from "../types/MoveType";
import Game from "../types/Game";

type Props = {
    color:string, 
    understanding:any, 
    position:number, 
    score:number, 
    first:boolean,
    game:Game
} & React.HTMLAttributes<HTMLDivElement>

const PlayerPanel : FC<Props> = ({color, position, understanding, score, first, game, ...props}) => {

    const play = usePlay <TakeTile> ()

    const [{canDrop, isOver}, dropRef] = useDrop({
        accept: ["Element"],
        canDrop: (item: ElementInPile) => {
            if (game.tilesToTake !== undefined){
               
                return(
                    game.tilesToTake.coordinates.find(coord => (coord.x === item.x) && (coord.y === item.y)) !== undefined
                )

            } else {
                return false
            }



        },
        collect: monitor => ({
          canDrop: monitor.canDrop(),
          isOver: monitor.isOver()
        }),
        drop: (item: ElementInPile) => {

            play({type : MoveType.TakeTile, coordinates:{x:item.x, y:item.y} });

        }
      })

    return(

        <div {...props} ref={dropRef} css={[playerPanelStyle(position), canDrop && canDropStyle, isOver && isOverStyle]}>

            <div css={playerHeaderStyle}>

                <span>Couleur : {color} - </span> <span>Score : {score}</span>

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
`

const smallImagesStyle = css`
width:5%;
height:5%;
`

const playerPanelStyle = (position:number) => css`
position : absolute;
top : ${position * 25}%;
right : 0%;
width : 100%;
height : 25%;
background-color : grey;
border-top:1px black solid;
border-bottom:1px black solid;
`

const playerHeaderStyle = css`
position : absolute;
top : 5%;
right : 5%;
width : 100%
height : 20%;
font-size:20px;
`

const playerElementStyle = css`
position : absolute;
top : 25%;
right : 5%;

`

export default PlayerPanel