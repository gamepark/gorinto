import { css } from '@emotion/core'
import { FC } from "react"
import Game from '../types/Game'
import board from '../images/board.jpg'
import HorizontalPathPanel from './HorizontalPathPanel'
import VerticalPathPanel from './VerticalPathPanel'
import MountainPanel from './MountainPanel'

const Board : FC<{game:Game}> = ({game}) => {

    return (

        <div css={boardStyle}>

            <HorizontalPathPanel game = {game} />
            <VerticalPathPanel game = {game} />
            <MountainPanel game = {game} />
        
        </div>

    )

}

const boardStyle = css`
    position : absolute;
    top : 5%;
    left : 23%;
    width : 53.4375%;
    height :95%;
    background-image : url(${board});
    background-size:cover;
    background-position:center;

`

export default Board

