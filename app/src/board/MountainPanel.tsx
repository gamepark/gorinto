/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import {FC, useEffect, useState} from "react";
import MountainPile from "./MountainPile";
import ElementInPath from "./ElementInPath";
import ElementInPile from "./ElementInPile";
import GameView from "@gamepark/gorinto/types/GameView";

const MountainPanel : FC<{game : GameView, selectedTileInPath?:ElementInPath}> = ({game, selectedTileInPath}) => {

    const [selectedTilesInMountain, setSelectedTilesInMountain] = useState<ElementInPile[]>([])

    useEffect( () => {
        if (!game.tilesToTake && selectedTilesInMountain.length > 0){
            setSelectedTilesInMountain([])
        }
    }, [game, selectedTilesInMountain] )
    
    console.log("Dans MountainPanel", selectedTilesInMountain)
    
    return(

        <div css = {mountainPanelStyle}>

            {game.mountainBoard.map((row, x) =>
            
                    row.map((pile, y) =>

                        <MountainPile key = {x+"_"+y} 
                        css = {areaPosition(x, y)} 
                        pile = {pile} 
                        x = {x}
                        y = {y}
                        game = {game}
                        selectedTileInPath = {selectedTileInPath}

                        onSelect = {position => (selectedTilesInMountain.some(element => element.x === x && element.y === y && element.z === position)      // Déjà sélectionné ?
                        ? setSelectedTilesInMountain(selectedTilesInMountain.filter(item => item.x !== x || item.y !==y || item.z !== position ))      // si oui, On le retire
                        : setSelectedTilesInMountain(current => [...current, {x,y, z:position}])) }      // Si non, on l'ajoute.
                        selectedTilesInMountain = {selectedTilesInMountain}         
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