/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {FC} from "react"
import board from '../images/board.jpg'
import HorizontalPathPanel from './HorizontalPathPanel'
import VerticalPathPanel from './VerticalPathPanel'
import MountainPanel from './MountainPanel'
import PathType from '@gamepark/gorinto/types/PathType'
import GameView from "@gamepark/gorinto/types/GameView";
import { usePlay } from '@gamepark/react-client'
import { setSelectedTileInPathMove } from '../moves/SetSelectedTileInPath'
import ElementInPath from '@gamepark/gorinto/types/ElementInPath'
import { getFilterCoordinatesWithPattern } from '@gamepark/gorinto/moves/MoveTile'
import Element from '@gamepark/gorinto/types/Element'

type Props = {
    game:GameView,
    onWarning:(path:PathType,x:number, y:number) => void

}

const Board : FC<Props> = ({game, onWarning}) => {

    const playSelectTilePath = usePlay()

    function verifyIfWarningIsNeeded(TileInPath:Element, x:number, y:number):boolean{
        return getFilterCoordinatesWithPattern(TileInPath,{x,y},game.mountainBoard).length === 0
    }

    console.log("affichage board")

    return (

        <div css={boardStyle}>

            <HorizontalPathPanel onSelect = {position => (playSelectTilePath(setSelectedTileInPathMove(position, PathType.Horizontal, game.horizontalPath[position]!), {local: true}))} 
                                 selectedTile = {game.selectedTileInPath} 
                                 activePlayer = {game.activePlayer} 
                                 horizontalPath = {game.horizontalPath} 
                                 tilesToTake = {game.tilesToTake} 
                                 mountain = {game.mountainBoard}
                                 verifyIfWarningIsNeeded = {(tile,x,y) => verifyIfWarningIsNeeded(tile,x,y)}
                                 onWarning = {onWarning}

             />
            <VerticalPathPanel onSelect = {position => (playSelectTilePath(setSelectedTileInPathMove(position, PathType.Vertical, game.verticalPath[position]!), {local: true}))} 
                               selectedTile = {game.selectedTileInPath} 
                               activePlayer = {game.activePlayer} 
                               verticalPath = {game.verticalPath} 
                               tilesToTake = {game.tilesToTake} 
                               mountain = {game.mountainBoard}
                               verifyIfWarningIsNeeded = {(tile,x,y) => verifyIfWarningIsNeeded(tile,x,y)}
                               onWarning = {onWarning} 
            />
            <MountainPanel mountainBoard={game.mountainBoard} 
                           activePlayer = {game.activePlayer}
                           tilesToTake = {game.tilesToTake}
                           selectedTileInPath = {game.selectedTileInPath} 
                           selectedTilesInMountain = {game.selectedTilesInPile} 
                           onWarning={onWarning} />
        
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

    transform-style: preserve-3d;

`

export default Board

