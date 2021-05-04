/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
import TakeTile, { isTakeTile } from '@gamepark/gorinto/moves/TakeTile'
import Element from '@gamepark/gorinto/types/Element'
import MoveType from '@gamepark/gorinto/types/MoveType'
import PathType from '@gamepark/gorinto/types/PathType'
import TilesToTake from '@gamepark/gorinto/types/TilesToTake'
import { useAnimation, usePlay, usePlayerId, useSound } from '@gamepark/react-client'
import {FC, useEffect} from 'react'
import {useDrop} from 'react-dnd'
import SetSelectedTilesInPile, { setSelectedTilesInPileMove } from '../moves/SetSelectedTilesInPile'
import ElementInPath from './ElementInPath'
import ElementInPile from './ElementInPile'
import ElementTile from './ElementTile'
import moveTileSound from '../sounds/tic.mp3'
import PlayerColor from '@gamepark/gorinto/types/PlayerColor'

type Props = {
    x:number,
    y:number,
    height:number,
    selectedTileInPath?:ElementInPath|undefined
    tilesToTake:TilesToTake | undefined
    pile:number[],
    activePlayer: PlayerColor | undefined
    heightPile:number
    selectedTilesInMountain: ElementInPile[] | undefined,
    verifyAndCompleteMove:(tile:ElementInPath|undefined,x:number,y:number) => void


} & React.HTMLAttributes<HTMLDivElement>

const MountainDropZone : FC<Props> = ({x, y, height, selectedTileInPath, tilesToTake, pile, activePlayer, heightPile, selectedTilesInMountain, verifyAndCompleteMove, ...props}) => {

    const [{canDrop, isOver}, dropRef] = useDrop({
        accept: ["ElementInPath","ElementInPile"],
        canDrop: (item: ElementInPath) => {
            if (item.path === PathType.Horizontal){
                return(!tilesToTake && item.position === x)
            } else {
                return(!tilesToTake && item.position === y)
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

      
    const playerId = usePlayerId()
    const animation = useAnimation<TakeTile>(animation => isTakeTile(animation.move) && animation.move.coordinates.x === x && animation.move.coordinates.y === y)
    const canTakeAny = tilesToTake?.element === Element.Earth && tilesToTake.quantity !== 0 && tilesToTake.coordinates.length && tilesToTake.coordinates[0].x === x && tilesToTake.coordinates[0].y === y
    
    const playSelectTileInPile = usePlay<SetSelectedTilesInPile>()

    const moveSound = useSound(moveTileSound)

    useEffect(() => {
        if (animation && animation.move){
            moveSound.play()
        }
    },[animation && animation.move])

    function playSound(sound:HTMLAudioElement):void{
        sound.play()
    }

      return(

            <div {...props} ref = {dropRef}>

                <div css={[dropZoneSizeStyle, canDrop && canDropStyle, canDrop && isOver && isOverStyle, canDropClick(selectedTileInPath,x,y) && !tilesToTake && canDropStyle, renderContext]}
                    onClick={() => {
                        verifyAndCompleteMove(selectedTileInPath,x,y)
                    }}>

                <div {...props} css={[sizeStyle, renderContext]}>
                    {pile.map((tile, index) =>
                        <div css={positionTile} key={index}>
                            <ElementTile
                                css={[animation && heightPile === index + 1 && tilesToTake?.element !== Element.Earth && takeTileAnimation(animation.duration, index + 1),
                                    animation && tilesToTake?.element === Element.Earth && index === animation.move.coordinates.z && takeTileEarthAnimation(animation.duration, index + 1),
                                    canTakeAny && shadowStyle
                                ]}
                                position={canTakeAny ? 3 * index : index}
                                draggable={playerId === activePlayer && canDrag(tilesToTake, heightPile, x, y, index)}
                                type='ElementInPile'
                                draggableItem={{x, y, z: index}}
                                element={tile}



                                onClick={() => {
                                                playerId === activePlayer && tilesToTake && playSelectTileInPile(setSelectedTilesInPileMove(x,y,index), {local:true})
                                            }
                                        }

                                elementOfTilesToTake = {tilesToTake ? tilesToTake.element : undefined}
                                isSelected={selectedTilesInMountain === undefined ? false : selectedTilesInMountain.some((element => element.x === x && element.y === y && element.z === index)) && tilesToTake !== undefined}
                                playSound = {(sound) => playSound(sound)}
                                sound = {moveSound}

                            />
                        </div>
                    )}
                </div>

                </div>

            </div>

      )

}

const dropZoneSizeStyle = css`
width:100%;
height:100%;
border-radius:20%;`


const sizeStyle = css`
position:absolute!important;
left:0!important;
top:0!important;
width:100%!important;
height:100%!important;`

function canDropClick(selectedTile:ElementInPath|undefined,x:number,y:number):boolean{
    if (selectedTile === undefined){
        return false;
    } else {
        if (selectedTile.path === PathType.Horizontal){
            return(selectedTile.position === x)
        } else {
            return(selectedTile.position === y)
        }
    }

}

const canDropStyle = css`
position:relative;
width:100%;
height:100%;
box-shadow: inset 0 0 0 0.5em white;
border-radius:20%;
transition:background-color linear 0.3s, box-shadow linear 0.3s;

&:hover{
    position:relative;
    width:100%;
    height:100%;
    background-color:black;
    box-shadow: inset 0 0 0 1em white;
    transition:background-color linear 0.3s, box-shadow linear 0.3s;
    cursor:pointer;
}
`


const isOverStyle = css`
width:100%;
height:100%;
background-color:black;
box-shadow: inset 0 0 0 1em white;
transition:background-color linear 0.3s, box-shadow linear 0.3s;
`



function canDrag(tilesToTake:TilesToTake|undefined, heightPile:number, x: number, y: number, z: number): boolean {

    if (tilesToTake === undefined) {
        return false;
    } else if (tilesToTake.quantity === 0) {
        return false
    } else if (tilesToTake.element !== Element.Earth) {
        return (
            (tilesToTake.coordinates.find(coord => (coord.x === x) && (coord.y === y)) !== undefined)
            &&
            (z === heightPile - 1)
        )
    } else {
        return (
            (tilesToTake.coordinates.find(coord => (coord.x === x) && (coord.y === y)) !== undefined)
            &&
            (z !== heightPile - 1)
        )
    }
}

const shadowStyle = css`
    box-shadow: 0 0 1.5em 0.5em black;
    border-radius: 20%;
`

const renderContext = css`
    transform-style: preserve-3d;
`

const noPointerEvents = css`
    pointer-events: none;
`

const positionTile = css`
    position: absolute;
    left: 15%;
    top: 15%;
    width: 70%;
    height: 70%;

    transform-style: preserve-3d;
`

const takeTileKeyFrames = (z: number) => keyframes`
    from {
    }
    25% {
        transform: translate3d(0, 0, ${z * 4 + 4.02}em);
    }
    55% {
        transform: translate3d(0, 0, ${z * 4 + 4.02}em);
    }
    to {
        transform: translate3d(0, 0, 150em);
    }
`

const takeTileEarthKeyFrames = (z: number) => keyframes`
    from {
    }
    25% {
        transform: translate3d(-150%, 0, ${z * 3 * 4 + 4.02}em);
    }
    55% {
        transform: translate3d(-150%, 0, ${z * 3 * 4 + 4.02}em);
    }
    to {
        transform: translate3d(-150%, 0, 150em);
    }
`

const takeTileAnimation = (duration: number, z: number) => css`
    animation: ${takeTileKeyFrames(z)} ${duration}s ease-in-out;
`

const takeTileEarthAnimation = (duration: number, z: number) => css`
    animation: ${takeTileEarthKeyFrames(z)} ${duration}s ease-in-out;
`

export default MountainDropZone