/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import MoveType from '@gamepark/gorinto/types/MoveType'
import PathType from '@gamepark/gorinto/types/PathType'
import {FC} from 'react'
import {useDrop} from 'react-dnd'
import ElementInPath from './ElementInPath'
import ElementInPile from './ElementInPile'


type Props = {
    x:number,
    y:number,
    height:number,
} & React.HTMLAttributes<HTMLDivElement>

const MountainDropZone : FC<Props> = ({x, y, height, ...props}) => {

    const [{canDrop, isOver}, dropRef] = useDrop({
        accept: ["ElementInPath","ElementInPile"],
        canDrop: (item: ElementInPath) => {
            if (item.path === PathType.Horizontal){
                return(item.position === x)
            } else {
                return(item.position === y)
            }
        },
        collect: monitor => ({
          canDrop: monitor.canDrop(),
          isOver: monitor.isOver()
        }),

        hover: (item:(ElementInPath|ElementInPile)) => {
            item.hoverPile!(height)
        }
        ,

        drop: (item: ElementInPath) => {

            return {type : MoveType.MoveTile, path : item.path, x, y}

        }
      })

      return(

        <div {...props} ref = {dropRef}> 
        
            <div css={[canDrop && canDropStyle, isOver && isOverStyle]}>


            </div>

        </div>


      )

}

const canDropStyle = css`
position:absolute;
top:4%;
left:4%;
width:92%;
height:92%;
border: 0.5em solid white;
border-radius:20%;
transition:background-color linear 0.3s, border linear 0.3s;
`


const isOverStyle = css`
position:absolute;
top:4%;
left:4%;
width:92%;
height:92%;
border: 1em solid white;
border-radius:20%;
background-color:black;
transition:background-color linear 0.3s, border linear 0.3s;
`

export default MountainDropZone