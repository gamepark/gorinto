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

