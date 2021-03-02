import { css } from "@emotion/core";
import { FC } from "react";
import Game from "../types/Game";
import ElementTile from "./ElementTile";

const MountainPanel : FC<{game : Game}> = ({game}) => {

    return(

        <div css = {mountainPanelStyle}>

            {game.mountainBoard.map((arrayH, index) =>

                <div key = {index} css = {verticalPositionning(index)}> 
            
                    {arrayH.map((arrayV, index) =>

                        <div key = {index} css = {horizontalPositionning(index)}> 
                        
                            {arrayV.map((tile, index) =>
                                
                                <div css={positionningTile(index)} key = {index}> 

                                    <ElementTile 
                                                image = {tile.image}
                                                element = {tile.element}
                                                position = {index}
                                    />
                    
                                </div>

                            )}

                        </div>

                    )}

                </div> 

            )}

        </div>

    )

}

const verticalPositionning = (position:number) => css`
position:absolute;
left:0%;
top:${position*20}%;

width:100%;
height:20%;
`

const horizontalPositionning = (position:number) => css`
position:absolute;
left:${position*20}%;
top:0%;

width:20%;
height:100%;
`

const positionningTile = (position : number) => css`
position:absolute;
bottom:${0+6*position}%;
left:${0+6*position}%;
width:70%;
height:70%;

z-index:${1+position};
`
const mountainPanelStyle = css`
position : absolute;
top : 17.5%;
left : 17.5%;
width : 82%;
height : 81.5%;
`

export default MountainPanel