/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
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
    index:number,
} & HTMLAttributes<HTMLDivElement>

const BurrowTile : FC<Props> = ({index, ...props}) => {

    return (

        <div css={burrowStyle(index)}> 
            
        </div>

    )

}

const burrowStyle = (index:number) => css`
position:absolute;
right:1%;
top:35%;
width:20%;
height:20%;

transform-style:preserve3d;

${index === 0 && `background-image:url(${BurrowTileF})`};
${index === 1 && `background-image:url(${BurrowTileG})`};
${index === 2 && `background-image:url(${BurrowTileH})`};
${index === 3 && `background-image:url(${BurrowTileI})`};
${index === 4 && `background-image:url(${BurrowTileJ})`};
${index === 5 && `background-image:url(${BurrowTileE})`};
${index === 6 && `background-image:url(${BurrowTileD})`};
${index === 7 && `background-image:url(${BurrowTileC})`};
${index === 8 && `background-image:url(${BurrowTileB})`};
${index === 9 && `background-image:url(${BurrowTileA})`};

background-repeat:no-repeat;
background-size:contain;
background-position:center;

`

export default BurrowTile