import { FC } from "react";
import { useDrop } from "react-dnd";
import ElementInPath from "../types/ElementInPath";
import MoveType from "../types/MoveType";
import { css } from "@emotion/core";


type Props = {
    x:number,
    y:number,
} & React.HTMLAttributes<HTMLDivElement>

const MountainDropZone : FC<Props> = ({x, y, ...props}) => {

    const [{canDrop, isOver}, dropRef] = useDrop({
        accept: ["Element"],
        canDrop: (item: ElementInPath) => {
            if (item.path === "horizontal"){
                return(item.position === x)
            } else {
                return(item.position === y)
            }
        },
        collect: monitor => ({
          canDrop: monitor.canDrop(),
          isOver: monitor.isOver()
        }),
        drop: (item: ElementInPath) => {

            return {type : MoveType.MoveTile, path : item.path, x, y}

        }
      })

      return(

        <div {...props} ref = {dropRef} css = {[canDrop && canDropStyle, isOver && isOverStyle]}> 
        
        </div>


      )

}

const canDropStyle = css`
opacity:0.4;
background-color:red;
`


const isOverStyle = css`
opacity:0.6;
background-color:red;
`

export default MountainDropZone