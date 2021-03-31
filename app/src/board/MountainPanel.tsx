/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, useState } from "react";
import GameState from "@gamepark/gorinto/types/GameState";
import MountainPile from "./MountainPile";
import ElementInPath from "./ElementInPath";
import ElementInPile from "./ElementInPile";

const MountainPanel : FC<{game : GameState, selectedTileInPath?:ElementInPath}> = ({game, selectedTileInPath}) => {

    const [selectedTileInMountain, setSelectedTileInMountain] = useState<ElementInPile>()

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

                        onSelect = {(position: any) => setSelectedTileInMountain({type:'ElementInPile', x,y, z:position})}
                        selectedTileInMountain = {selectedTileInMountain}
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