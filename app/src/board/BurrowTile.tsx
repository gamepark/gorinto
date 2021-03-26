/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import PathType from '@gamepark/gorinto/types/PathType'
import { FC, HTMLAttributes } from "react"

import BurrowTileA from "../images/GOR_tts_Kitsune_burrowtileA.png"
import BurrowTileB from "../images/GOR_tts_Kitsune_burrowtileB.png"
import BurrowTileC from "../images/GOR_tts_Kitsune_burrowtileC.png"
import BurrowTileD from "../images/GOR_tts_Kitsune_burrowtileD.png"
import BurrowTileE from "../images/GOR_tts_Kitsune_burrowtileE.png"
import BurrowTileF from "../images/GOR_tts_Kitsune_burrowtileF.png"
import BurrowTileG from "../images/GOR_tts_Kitsune_burrowtileG.png"
import BurrowTileH from "../images/GOR_tts_Kitsune_burrowtileH.png"
import BurrowTileI from "../images/GOR_tts_Kitsune_burrowtileI.png"
import BurrowTileJ from "../images/GOR_tts_Kitsune_burrowtileJ.png"

type Props = {
    index:number | undefined,
    path:PathType | undefined
} & HTMLAttributes<HTMLDivElement>

const BurrowTile : FC<Props> = ({index, path, ...props}) => {

    return (

        <div css={burrowStyle(index, path)}> 
            
        </div>

    )

}

const burrowStyle = (index:number | undefined, path:PathType | undefined) => css`
position:absolute;
right:-20%;
${index !== undefined && `transform:translate3d(-150%,0,0);`}
top:75%;
width:15%;
height:20%;
transition:transform 1s;

transform-style:preserve-3d;

${index === 0 && path === PathType.Horizontal && `background-image:url(${BurrowTileF})`};
${index === 1 && path === PathType.Horizontal && `background-image:url(${BurrowTileG})`};
${index === 2 && path === PathType.Horizontal && `background-image:url(${BurrowTileH})`};
${index === 3 && path === PathType.Horizontal && `background-image:url(${BurrowTileI})`};
${index === 4 && path === PathType.Horizontal && `background-image:url(${BurrowTileJ})`};
${index === 0 && path === PathType.Vertical && `background-image:url(${BurrowTileE})`};
${index === 1 && path === PathType.Vertical && `background-image:url(${BurrowTileD})`};
${index === 2 && path === PathType.Vertical && `background-image:url(${BurrowTileC})`};
${index === 3 && path === PathType.Vertical && `background-image:url(${BurrowTileB})`};
${index === 4 && path === PathType.Vertical && `background-image:url(${BurrowTileA})`};

background-repeat:no-repeat;
background-size:contain;
background-position:center;

`

export default BurrowTile