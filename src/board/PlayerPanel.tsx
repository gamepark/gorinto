import { css } from "@emotion/core";
import { FC } from "react";

const PlayerPanel : FC<{color:string, understanding:any, position:number, score:number}> = ({color, position, understanding, score}) => {

    return(

        <div css={playerPanelStyle(position)}>

            <div css={playerHeaderStyle}>

                <span>Couleur : {color} - </span> <span>Score : {score}</span>

            </div>

            <div css={playerElementStyle}>

                <span>Void : {understanding.void} </span>
                <span>Wind : {understanding.wind} </span>
                <span>Fire : {understanding.fire} </span>
                <span>Water : {understanding.water} </span>
                <span>Earth : {understanding.earth} </span>

            </div>

        </div>

    )

}

const playerPanelStyle = (position:number) => css`
position : absolute;
top : ${position * 25}%;
right : 0px;
width : 100%;
height : 25%;
background-color : grey;
border : 1px solid black;
`

const playerHeaderStyle = css`
position : absolute;
top : 5%;
left : 5%;
width : 100%
height : 20%;
font-size:24px;
`

const playerElementStyle = css`
position : absolute;
top : 25%;
left : 5%;

`

export default PlayerPanel