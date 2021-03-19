/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Game from '@gamepark/gorinto/types/Game'
import { FC } from "react"
import board from '../images/board.jpg'
import HorizontalPathPanel from './HorizontalPathPanel'
import VerticalPathPanel from './VerticalPathPanel'
import MountainPanel from './MountainPanel'

const Board : FC<{game:Game}> = ({game}) => {

    return (

        <div css={boardStyle}>

            <HorizontalPathPanel activePlayer = {game.activePlayer} horizontalPath = {game.horizontalPath} tilesToTake = {game.tilesToTake} mountain = {game.mountainBoard} />
            <VerticalPathPanel activePlayer = {game.activePlayer} verticalPath = {game.verticalPath} tilesToTake = {game.tilesToTake} />
            <MountainPanel game = {game} />
        
        </div>

    )

}

const boardStyle = css`
    position : absolute;
    top : 0%;
    left : 21%;
    width : 56.25%
;
    height :100%;
    background-image : url(${board});
    background-size:cover;
    background-position:center;

    border: 0.2em black solid;
    box-shadow: 0em 0em 3em 1.5em black;


    transform-style: preserve-3d;

`

export default Board

