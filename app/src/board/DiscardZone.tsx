/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import RemoveTileOnPath from "@gamepark/gorinto/moves/RemoveTileOnPath"
import MoveType from "@gamepark/gorinto/types/MoveType"
import { usePlay } from "@gamepark/react-client"
import { FC } from "react"
import { useDrop } from "react-dnd"
import { ResetSelectedTileInPath, resetSelectedTileInPathMove } from "../moves/SetSelectedTileInPath"
import Button from "./Button"
import ElementInPath from "./ElementInPath"

type Props = {
    selectedTile?:ElementInPath | undefined, 
    mustBeVisible : boolean   
} & React.HTMLAttributes<HTMLDivElement>

const DiscardZone : FC<Props> = ({selectedTile, mustBeVisible, ...props}) => {

    const playDiscard = usePlay<RemoveTileOnPath>()
    const playReset = usePlay<ResetSelectedTileInPath>()

    const [{canDrop, isOver}, dropRef] = useDrop({
        accept: ["ElementInPath"],
        canDrop: (item: ElementInPath) => {
            if (item){
                return(true)
            } else {
                return(false)
            }
        },
        collect: monitor => ({
          canDrop: monitor.canDrop(),
          isOver: monitor.isOver()
        }),

        drop: (item: ElementInPath) => {

                return {type : MoveType.RemoveTileOnPath, path : item.path, index:item.position}
 
        }
      })

      function discardAndResetTile(selectedTile:ElementInPath):void{
        playDiscard({
            type:MoveType.RemoveTileOnPath,
            path:selectedTile.path,
            index:selectedTile.position
        })
        playReset(resetSelectedTileInPathMove(),{local:true})
      }

    return(

        <div {...props} ref = {dropRef}>

            <div css={[mustBeVisible === false && transparentStyle, discardZoneStyle, canDrop && canDropStyle, isOver && isOverStyle]}>

                {selectedTile ? <Button onClick = {() => {discardAndResetTile(selectedTile)}}>🗑</Button> : <p>🗑</p>}

            </div>

        </div>

    )
    
}

const discardZoneStyle = css`
position:absolute;
right:1%;
bottom:0%;
height:35%;
width:20%;
border:0.7em solid black;
border-radius:10%;
background-color:rgba(136,0,0,0.8);
display:flex;
flex-direction:row;
justify-content: center;
align-items: center;

    p{
        font-family:"Mulish", sans-serif;
        font-size:10em;
        text-align:center;
        color:black;
        font-weight:bold;
    }
    button{
        font-family:"Mulish", sans-serif;
        font-size:10em;
        text-align:center;
        color:black;
        font-weight:bold;
    }
    transition:opacity 0.75s linear, transform 0.25s linear;
}
`

const transparentStyle = css`
opacity:0;
transition:opacity 0.75s linear;
`

const isOverStyle = css`
background-color:rgba(136,0,0,1);
`

const canDropStyle = css`
transform:translateZ(4em);
transition : transform linear 0.25s,background-color linear 0.25s;
`

export default DiscardZone