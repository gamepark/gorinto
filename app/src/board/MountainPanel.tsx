/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, useEffect, useState } from "react";
import GameState from "@gamepark/gorinto/types/GameState";
import MountainPile from "./MountainPile";
import ElementInPath from "./ElementInPath";
import ElementInPile from "./ElementInPile";

const MountainPanel : FC<{game : GameState, selectedTileInPath?:ElementInPath}> = ({game, selectedTileInPath}) => {

    const [selectedTilesInMountain, setSelectedTilesInMountain] = useState<ElementInPile[]>([])

    useEffect( () => {
        if (!game.tilesToTake && selectedTilesInMountain.length > 0){
            setSelectedTilesInMountain([])
        }
    }, [game, selectedTilesInMountain] )
    
    console.log("contenu du hook", selectedTilesInMountain)
    
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
                        ? setSelectedTilesInMountain(removeFromTheHook(selectedTilesInMountain, {x,y,z:position}))      // si oui, On le retire
                        : setSelectedTilesInMountain(current => [...current, {x,y, z:position}])) }      // Si non, on l'ajoute.
                        selectedTilesInMountain = {selectedTilesInMountain}         
                        />

                    )

            )}

        </div>

    )

}

function removeFromTheHook(array:{x:number, y:number, z:number}[], object:{x:number, y:number, z:number}) : {x:number, y:number, z:number}[]{

    const result = array
    result.splice(array.findIndex(elem => elem === object),1)
    console.log("dans le Remove",result)
    return result

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