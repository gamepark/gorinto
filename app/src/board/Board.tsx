/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {FC, useEffect, useState} from "react"
import board from '../images/board.jpg'
import HorizontalPathPanel from './HorizontalPathPanel'
import VerticalPathPanel from './VerticalPathPanel'
import MountainPanel from './MountainPanel'
import ElementInPath from './ElementInPath'
import PathType from '@gamepark/gorinto/types/PathType'
import GameView from "@gamepark/gorinto/types/GameView";
import ElementInPile from './ElementInPile'
import { usePlayerId } from '@gamepark/react-client'
import PlayerColor from '@gamepark/gorinto/types/PlayerColor'

type Props = {
    game:GameView,
    onSelection:(x:number,y:number,position: number) => void, 
    selectedTilesInMountain: ElementInPile[],
    onWarning:(path:PathType,x:number, y:number) => void

}

const Board : FC<Props> = ({game, onSelection, selectedTilesInMountain, onWarning}) => {

    console.log("affichage board")
    // Hooks for move clics

    const [selectedTileInPath, setSelectedTileInPath] = useState<ElementInPath>()
    const playerId = usePlayerId<PlayerColor>()

    useEffect( () => {
        if ((game.tilesToTake && selectedTileInPath !== undefined) || (game.activePlayer !==playerId && selectedTileInPath !== undefined)){
            setSelectedTileInPath(undefined)
        }
    }, [game.tilesToTake, game.activePlayer, selectedTileInPath] )

    return (

        <div css={boardStyle}>

            <HorizontalPathPanel onSelect = {position => (selectedTileInPath?.path === PathType.Horizontal && selectedTileInPath.position === position) ? setSelectedTileInPath(undefined) : game.activePlayer === playerId && setSelectedTileInPath({path:PathType.Horizontal, position, element:game.verticalPath[position]})} 
                                 selectedTile = {selectedTileInPath} 
                                 activePlayer = {game.activePlayer} 
                                 horizontalPath = {game.horizontalPath} 
                                 tilesToTake = {game.tilesToTake} 
                                 mountain = {game.mountainBoard}
                                 onWarning = {onWarning}

             />
            <VerticalPathPanel onSelect = {position => (selectedTileInPath?.path === PathType.Vertical && selectedTileInPath.position === position) ? setSelectedTileInPath(undefined) : game.activePlayer === playerId && setSelectedTileInPath({path:PathType.Vertical, position, element:game.verticalPath[position]})} 
                               selectedTile = {selectedTileInPath} 
                               activePlayer = {game.activePlayer} 
                               verticalPath = {game.verticalPath} 
                               tilesToTake = {game.tilesToTake} 
                               mountain = {game.mountainBoard}
                               onWarning = {onWarning} 
            />
            <MountainPanel mountainBoard={game.mountainBoard} 
                           activePlayer = {game.activePlayer}
                           tilesToTake = {game.tilesToTake}
                           selectedTileInPath = {selectedTileInPath} 
                           onSelection = {onSelection} 
                           selectedTilesInMountain = {selectedTilesInMountain} 
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

