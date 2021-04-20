/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
import MoveTile, { getFilterCoordinatesWithPattern } from '@gamepark/gorinto/moves/MoveTile'
import TakeTile, {isTakeTile} from '@gamepark/gorinto/moves/TakeTile'
import Element from '@gamepark/gorinto/types/Element'
import MoveType from '@gamepark/gorinto/types/MoveType'
import PathType from '@gamepark/gorinto/types/PathType'
import TilesToTake from '@gamepark/gorinto/types/TilesToTake'
import {useAnimation, usePlay, usePlayerId, useSound} from '@gamepark/react-client'
import {FC, HTMLAttributes, useEffect} from 'react'
import ElementInPath from './ElementInPath'
import ElementInPile from './ElementInPile'
import ElementTile from './ElementTile'
import MountainDropZone from './MountainDropZone'
import moveTileSound from '../sounds/tic.mp3'
import PlayerColor from '@gamepark/gorinto/types/PlayerColor'
import {ResetSelectedTileInPath, resetSelectedTileInPathMove} from '../moves/SetSelectedTileInPath'

type Props = {
    pile: number[],
    x: number,
    y: number,
    tilesToTake: TilesToTake | undefined
    activePlayer: PlayerColor | undefined
    mountainBoard:number[][][]

    selectedTileInPath?: ElementInPath,
    onSelect:(x:number,y:number,position: number) => void, 
    selectedTilesInMountain: ElementInPile[],
    onWarning:(path:PathType,x:number, y:number) => void
} & Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>

const MountainPile: FC<Props> = ({pile, x, y, tilesToTake, activePlayer, mountainBoard, selectedTileInPath, onSelect, selectedTilesInMountain, onWarning,...props}) => {

console.log("Dans MountainPile n° ",x*5+y)

    const playerId = usePlayerId()
    const animation = useAnimation<TakeTile>(animation => isTakeTile(animation.move) && animation.move.coordinates.x === x && animation.move.coordinates.y === y)
    const canTakeAny = tilesToTake?.element === Element.Earth && tilesToTake.coordinates.length && tilesToTake.coordinates[0].x === x && tilesToTake.coordinates[0].y === y

    const playMove = usePlay<MoveTile>()
    const playResetTileInPath = usePlay<ResetSelectedTileInPath>()
    const moveSound = useSound(moveTileSound)

    useEffect(() => {
        if (animation && animation.move){
            moveSound.play()
        }
    },[animation])

    function playCompleteMoveTile(selectedTileInPath:ElementInPath|undefined, x:number, y:number):void{
        moveSound.play()
        playMove({
            type: MoveType.MoveTile,
            path: selectedTileInPath!.path,
            x,
            y
        })
        playResetTileInPath(resetSelectedTileInPathMove(), {local: true})

    }

    return (
        <>
            <div {...props} css={[!tilesToTake && noPointerEvents, renderContext]}>
                {pile.map((tile, index) =>
                    <div css={positionTile} key={index}>
                        <ElementTile
                            css={[animation && mountainBoard[x][y].length === index + 1 && tilesToTake?.element !== Element.Earth && takeTileAnimation(animation.duration, index + 1),
                                animation && tilesToTake?.element === Element.Earth && index === animation.move.coordinates.z && takeTileEarthAnimation(animation.duration, index + 1),
                                canTakeAny && shadowStyle
                            ]}
                            position={canTakeAny ? 3 * index : index}
                            draggable={playerId === activePlayer && canDrag(tilesToTake, mountainBoard, x, y, index)}
                            type='ElementInPile'
                            draggableItem={{x, y, z: index}}
                            element={tile}

                            onWarning = {onWarning}

                            onClick={() => {
                                canTakeTile(x, y, index, tilesToTake, mountainBoard)
                                    ? onSelect(x,y,index)
                                    : console.log("Ne rien faire")
                                        }
                                    }

                            elementOfTilesToTake = {tilesToTake ? tilesToTake.element : undefined}
                            isSelected={selectedTilesInMountain?.some((element => element.x === x && element.y === y && element.z === index)) && tilesToTake !== undefined}
                        />
                    </div>
                )}
            </div>

            <MountainDropZone
                x={x}
                y={y}
                height={mountainBoard[x][y].length}
                selectedTileInPath={selectedTileInPath}
                onClick={() => {
                    canMoveTile(selectedTileInPath, x, y) 
                    ? getFilterCoordinatesWithPattern(selectedTileInPath!.element!,{x,y},mountainBoard).length === 0 
                        ? onWarning(selectedTileInPath!.path,x,y)
                        : playCompleteMoveTile(selectedTileInPath,x,y)
                          
                    : console.log("Ne rien faire")
                }}
                {...props}/>

        </>
    )
}



function canTakeTile(x: number, y: number, z: number, tilesToTake: TilesToTake | undefined, mountainBoard: number[][][]): boolean {

    if (tilesToTake === undefined) {
        return false
    } else {
        if (tilesToTake.element !== Element.Earth) {
            return (
                (tilesToTake.coordinates.find(coord => (coord.x === x) && (coord.y === y)) !== undefined)
                &&
                (z === mountainBoard[x][y].length - 1)
            )
        } else {
            return (
                (tilesToTake.coordinates.find(coord => (coord.x === x) && (coord.y === y)) !== undefined)
                &&
                (z !== mountainBoard[x][y].length - 1)
            )
        }
    }
}

function canMoveTile(selectedTileInPath: ElementInPath | undefined, x: number, y: number): boolean {
    if (selectedTileInPath === undefined) {
        return false
    } else if (selectedTileInPath.path === PathType.Horizontal) {
        return selectedTileInPath.position === x;
    } else if (selectedTileInPath.path === PathType.Vertical) {
        return selectedTileInPath.position === y
    } else {
        return false
    }
}

function canDrag(tilesToTake:TilesToTake|undefined, mountain:number[][][], x: number, y: number, z: number): boolean {

    if (tilesToTake === undefined) {
        return false;
    } else if (tilesToTake.quantity === 0) {
        return false
    } else if (tilesToTake.element !== Element.Earth) {
        return (
            (tilesToTake.coordinates.find(coord => (coord.x === x) && (coord.y === y)) !== undefined)
            &&
            (z === mountain[x][y].length - 1)
        )
    } else {
        return (
            (tilesToTake.coordinates.find(coord => (coord.x === x) && (coord.y === y)) !== undefined)
            &&
            (z !== mountain[x][y].length - 1)
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

export default MountainPile