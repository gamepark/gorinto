/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import {FC} from "react";
import MountainPile from "./MountainPile";
import ElementInPath from "./ElementInPath";
import ElementInPile from "./ElementInPile";
import PathType from "@gamepark/gorinto/types/PathType";
import TilesToTake from "@gamepark/gorinto/types/TilesToTake";
import PlayerColor from "@gamepark/gorinto/types/PlayerColor";
import { usePlay, useSound } from "@gamepark/react-client";
import moveTileSound from '../sounds/tic.mp3'
import { ResetSelectedTileInPath, resetSelectedTileInPathMove } from "../moves/SetSelectedTileInPath";
import MoveTile, { getFilterCoordinatesWithPattern } from "@gamepark/gorinto/moves/MoveTile";
import MoveType from "@gamepark/gorinto/types/MoveType";

type Props = {
    mountainBoard:number[][][],
    tilesToTake:TilesToTake | undefined,
    activePlayer:PlayerColor | undefined
    selectedTileInPath?:ElementInPath,
    selectedTilesInMountain: ElementInPile[] | undefined,
    onWarning:(path:PathType,x:number, y:number) => void,
}

const MountainPanel : FC<Props> = ({mountainBoard, tilesToTake, activePlayer, selectedTileInPath, selectedTilesInMountain, onWarning}) => {
    
    const moveSound = useSound(moveTileSound)
    const playMove = usePlay<MoveTile>()

    const playResetTileInPath = usePlay<ResetSelectedTileInPath>()

    function canMoveTile(selectedTileInPath: ElementInPath | undefined, x: number, y: number): boolean {
        if (selectedTileInPath === undefined) {
            return false
        } else if (selectedTileInPath.path === PathType.Horizontal) {
            return selectedTileInPath.position === x;
        } else if (selectedTileInPath.path === PathType.Vertical) {
            return selectedTileInPath.position === y
        } else {
            return false
        }
    }

    function playCompleteMoveTile(selectedTileInPath:ElementInPath|undefined, x:number, y:number):void{
        moveSound.play()
        playMove({
            type: MoveType.MoveTile,
            path: selectedTileInPath!.path,
            x,
            y
        })
        playResetTileInPath(resetSelectedTileInPathMove(), {local: true})

    }

    function verifyAndPlayCompleteMoveTile(selectedTileInPath:ElementInPath|undefined, x:number, y:number):void{
        
        if(canMoveTile(selectedTileInPath,x,y)){
            getFilterCoordinatesWithPattern(selectedTileInPath!.element!, {x,y}, mountainBoard).length === 0
            ? onWarning(selectedTileInPath!.path,x,y)
            : playCompleteMoveTile(selectedTileInPath,x,y)
        } else {
            
        }
        
    }

    return(

        <div css = {mountainPanelStyle}>

            {mountainBoard.map((row, x) =>
            
                    row.map((pile, y) =>

                        <MountainPile key = {x+"_"+y} 
                        css = {areaPosition(x, y)} 
                        pile = {pile} 
                        x = {x}
                        y = {y}
                        activePlayer = {activePlayer}
                        tilesToTake = {tilesToTake}
                        heightPile = {mountainBoard[x][y].length}
                        selectedTileInPath = {selectedTileInPath}

                        selectedTilesInMountain = {selectedTilesInMountain}  
                        onWarning = {onWarning}  
                        verifyAndCompleteMove = {(tile,x,y) => (verifyAndPlayCompleteMoveTile(tile,x,y))}
                        />

                    )

            )}

        </div>

    )

}



const areaPosition= (x:number, y:number) => css`
position:absolute;
left:${1+(-0.5*x)+x*20}%;
top:${y*20}%;

width:20%;
height:20%;
`


const mountainPanelStyle = css`
position : absolute;
top : 17.5%;
left : 17.5%;
width : 82%;
height : 81.5%;
transform-style:preserve-3d;

`

export default MountainPanel