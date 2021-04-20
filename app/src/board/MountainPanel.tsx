/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import {FC} from "react";
import MountainPile from "./MountainPile";
import ElementInPath from "./ElementInPath";
import ElementInPile from "./ElementInPile";
import PathType from "@gamepark/gorinto/types/PathType";
import TilesToTake from "@gamepark/gorinto/types/TilesToTake";
import PlayerColor from "@gamepark/gorinto/types/PlayerColor";

type Props = {
    mountainBoard:number[][][],
    tilesToTake:TilesToTake | undefined,
    activePlayer:PlayerColor | undefined
    selectedTileInPath?:ElementInPath,
    selectedTilesInMountain: ElementInPile[] | undefined,
    onWarning:(path:PathType,x:number, y:number) => void,
}

const MountainPanel : FC<Props> = ({mountainBoard, tilesToTake, activePlayer, selectedTileInPath, selectedTilesInMountain, onWarning}) => {
    
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
                        mountainBoard = {mountainBoard}
                        selectedTileInPath = {selectedTileInPath}

                        selectedTilesInMountain = {selectedTilesInMountain}  
                        onWarning = {onWarning}  
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