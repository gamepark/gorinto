/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {FC, useEffect} from "react"
import board from '../images/board.jpg'
import HorizontalPathPanel from './HorizontalPathPanel'
import VerticalPathPanel from './VerticalPathPanel'
import MountainPanel from './MountainPanel'
import PathType from '@gamepark/gorinto/types/PathType'
import GameView from "@gamepark/gorinto/types/GameView";
import { usePlay, usePlayerId } from '@gamepark/react-client'
import SetSelectedTileInPath, { setSelectedTileInPathMove } from '../moves/SetSelectedTileInPath'
import { getFilterCoordinatesWithPattern } from '@gamepark/gorinto/moves/MoveTile'
import Element from '@gamepark/gorinto/types/Element'
import PlayerColor from '@gamepark/gorinto/types/PlayerColor'
import SetSelectedTilesInPile, { setSelectedTilesInPileMove } from '../moves/SetSelectedTilesInPile'

type Props = {
    game:GameView,
    onWarning:(path:PathType,x:number, y:number) => void

}

const Board : FC<Props> = ({game, onWarning}) => {

    const playSelectTilePath = usePlay<SetSelectedTileInPath>()
    const playSelectTilePile = usePlay<SetSelectedTilesInPile>()
    const playerId = usePlayerId<PlayerColor>()

    useEffect(() => {
        if (game.tilesToTake && playerId === game.activePlayer && game.tilesToTake.coordinates.length !== 0){
            if (game.tilesToTake.element !== Element.Earth){
                if (game.tilesToTake.quantity >= game.tilesToTake.coordinates.length){
                    for (let i=0;i<game.tilesToTake.coordinates.length;i++){
                        playSelectTilePile(setSelectedTilesInPileMove(game.tilesToTake.coordinates[i].x,game.tilesToTake.coordinates[i].y,game.mountainBoard[game.tilesToTake.coordinates[i].x][game.tilesToTake.coordinates[i].y].length-1),{local:true})
                    }
                }
            } else {
                if (game.tilesToTake.quantity >= game.mountainBoard[game.tilesToTake.coordinates[0].x][game.tilesToTake.coordinates[0].y].length-1){
                    for (let i=0;i<game.mountainBoard[game.tilesToTake.coordinates[0].x][game.tilesToTake.coordinates[0].y].length-1;i++){
                        playSelectTilePile(setSelectedTilesInPileMove(game.tilesToTake.coordinates[0].x, game.tilesToTake.coordinates[0].y,i),{local:true})
                    }
                }

            }
        }
    },[game.activePlayer === playerId, game.tilesToTake?.coordinates])


    function verifyIfWarningIsNeeded(TileInPath:Element, x:number, y:number):boolean{
        return getFilterCoordinatesWithPattern(TileInPath,{x,y},game.mountainBoard).length === 0
    }

    return (

        <div css={boardStyle}>

            <HorizontalPathPanel onSelect = {position => (playerId === game.activePlayer && (game.tilesToTake === undefined || (game.isTacticalRemove === true && game.tilesToTake.quantity === 0)) && playSelectTilePath(setSelectedTileInPathMove(position, PathType.Horizontal, game.horizontalPath[position]!), {local: true}))} 
                                 selectedTile = {game.selectedTileInPath} 
                                 activePlayer = {game.activePlayer} 
                                 horizontalPath = {game.horizontalPath} 
                                 tilesToTake = {game.tilesToTake} 
                                 mountain = {game.mountainBoard}
                                 verifyIfWarningIsNeeded = {(tile,x,y) => verifyIfWarningIsNeeded(tile,x,y)}
                                 onWarning = {onWarning}
                                 isTacticalRemove = {game.isTacticalRemove}

             />
            <VerticalPathPanel onSelect = {position => (playerId === game.activePlayer && (game.tilesToTake === undefined || game.tilesToTake.quantity === 0) &&playSelectTilePath(setSelectedTileInPathMove(position, PathType.Vertical, game.verticalPath[position]!), {local: true}))} 
                               selectedTile = {game.selectedTileInPath} 
                               activePlayer = {game.activePlayer} 
                               verticalPath = {game.verticalPath} 
                               tilesToTake = {game.tilesToTake} 
                               mountain = {game.mountainBoard}
                               verifyIfWarningIsNeeded = {(tile,x,y) => verifyIfWarningIsNeeded(tile,x,y)}
                               onWarning = {onWarning} 
                               isTacticalRemove = {game.isTacticalRemove}
            />
            <MountainPanel mountainBoard={game.mountainBoard} 
                           activePlayer = {game.activePlayer}
                           tilesToTake = {game.tilesToTake}
                           selectedTileInPath = {game.selectedTileInPath} 
                           selectedTilesInMountain = {game.selectedTilesInPile} 
                           onWarning={onWarning}
                           isTacticalRemove = {game.isTacticalRemove} />
        
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

