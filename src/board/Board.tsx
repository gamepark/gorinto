import { css } from '@emotion/core'
import { FC } from "react"
import Game from '../types/Game'
import board from '../images/board.jpg'

const Board : FC<{game:Game}> = ({game}) => {

    return (

        <div css={boardStyle}> {game.season}</div>

    )

}

const boardStyle = css`
    position : absolute;
    left : 20%;
    width : 56.5%;
    height :100%;
    border : 1px solid black;
    background-image : url(${board});
    background-size:contain;
    background-repeat:no-repeat;
    background-position:center;

`

export default Board

