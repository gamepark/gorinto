/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import Game from "@gamepark/gorinto/types/Game";
import MountainPile from "./MountainPile";

const MountainPanel : FC<{game : Game}> = ({game}) => {

    return(

        <div css = {mountainPanelStyle}>

            {game.mountainBoard.map((row, x) =>
            
                    row.map((pile, y) =>

                        <MountainPile key = {x+"_"+y} 
                        css = {areaPosition(x, y)} 
                        pile = {pile} 
                        x = {x}
                        y = {y}
                        game = {game}/>

                    )

            )}

        </div>

    )

}

const areaPosition= (x:number, y:number) => css`
position:absolute;
left:${x*20}%;
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

`

export default MountainPanel