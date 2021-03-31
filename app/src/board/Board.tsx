/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import GameState from '@gamepark/gorinto/types/GameState'
import { FC, useState } from "react"
import board from '../images/board.jpg'
import HorizontalPathPanel from './HorizontalPathPanel'
import VerticalPathPanel from './VerticalPathPanel'
import MountainPanel from './MountainPanel'
import ElementInPath from './ElementInPath'
import PathType from '@gamepark/gorinto/types/PathType'

const Board : FC<{game:GameState}> = ({game}) => {

    const [selectedTileInPath, setSelectedTileInPath] = useState<ElementInPath>()


    return (

        <div css={boardStyle}>

            <HorizontalPathPanel onSelect = {position => setSelectedTileInPath({type:'ElementInPath', path:PathType.Horizontal, position})} selectedTile = {selectedTileInPath} activePlayer = {game.activePlayer} horizontalPath = {game.horizontalPath} tilesToTake = {game.tilesToTake} mountain = {game.mountainBoard} />
            <VerticalPathPanel onSelect = {position => setSelectedTileInPath({type:'ElementInPath', path:PathType.Vertical, position})} selectedTile = {selectedTileInPath} activePlayer = {game.activePlayer} verticalPath = {game.verticalPath} tilesToTake = {game.tilesToTake} mountain = {game.mountainBoard} />
            <MountainPanel game = {game} selectedTileInPath = {selectedTileInPath} />
        
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

