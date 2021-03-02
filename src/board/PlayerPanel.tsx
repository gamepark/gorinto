import { css } from "@emotion/core";
import { FC } from "react";
import ElementVoid from "../images/ElementVoid.png";
import ElementWind from "../images/ElementWind.png";
import ElementFire from "../images/ElementFire.png";
import ElementWater from "../images/ElementWater.png";
import ElementEarth from "../images/ElementEarth.png";

const PlayerPanel : FC<{color:string, understanding:any, position:number, score:number}> = ({color, position, understanding, score}) => {

    return(

        <div css={playerPanelStyle(position)}>

            <div css={playerHeaderStyle}>

                <span>Couleur : {color} - </span> <span>Score : {score}</span>

            </div>

            <div css={playerElementStyle}>

                <span> <img src ={ElementVoid} alt="void" css={smallImagesStyle}/> : {understanding.void} </span>
                <span> <img src ={ElementWind} alt="void" css={smallImagesStyle}/> : {understanding.wind} </span>
                <span> <img src ={ElementFire} alt="void" css={smallImagesStyle}/> : {understanding.fire} </span>
                <span> <img src ={ElementWater} alt="void" css={smallImagesStyle}/> : {understanding.water} </span>
                <span> <img src ={ElementEarth} alt="void" css={smallImagesStyle}/> : {understanding.earth} </span>

            </div>

        </div>

    )

}

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