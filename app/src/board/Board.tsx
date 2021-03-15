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

            <HorizontalPathPanel activePlayer = {game.activePlayer} horizontalPath = {game.horizontalPath} tilesToTake = {game.tilesToTake} />
            <VerticalPathPanel activePlayer = {game.activePlayer} verticalPath = {game.verticalPath} tilesToTake = {game.tilesToTake} />
            <MountainPanel game = {game} />
        
        </div>

    )

}

const boardStyle = css`
    position : absolute;
    top : 1%;
    left : 23%;
    width : 53.4375%;
    height :95%;
    background-image : url(${board});
    background-size:cover;
    background-position:center;

    perspective-origin:bottom;
    transform: perspective(200em) rotateX(15deg) ;

`

export default Board

