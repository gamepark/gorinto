/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import MoveType from "@gamepark/gorinto/types/MoveType"
import { FC } from "react"
import { useDrop } from "react-dnd"
import ElementInPath from "./ElementInPath"

type Props = {
    
} & React.HTMLAttributes<HTMLDivElement>

const DiscardZone : FC<Props> = ({...props}) => {

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

    return(

        <div {...props} ref = {dropRef}>

            <div css={[discardZoneStyle, canDrop && isOver && isOverStyle]}>

                <p>🗑</p>

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

p{
    font-family:"Mulish", sans-serif;
    font-size:10em;
    text-align:center;
    color:black;
    font-weight:bold;
}
`

const isOverStyle = css`
background-color:rgba(136,0,0,1);

`

export default DiscardZone