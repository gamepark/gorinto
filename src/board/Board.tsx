import { css } from '@emotion/core'
import { FC } from "react"
import Game from '../types/Game'

const Board : FC<{game:Game}> = ({game}) => {

    return (

        <div css={boardStyle}> {game.season}</div>

    )

}

const boardStyle = css`
    position : absolute;
    left : 20%;
    width : 56.25%;
    height :100%;
    border : 1px solid black;
    background-image : url('../images/board.jpg');
`

export default Board

