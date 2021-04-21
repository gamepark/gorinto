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
import SetSelectedTilesInPile, { setSelectedTilesInPileMove } from '../moves/SetSelectedTilesInPile'

type Props = {
    pile: number[],
    x: number,
    y: number,
    tilesToTake: TilesToTake | undefined
    activePlayer: PlayerColor | undefined
    heightPile:number
    verifyAndCompleteMove:(tile:ElementInPath|undefined,x:number,y:number) => void

    selectedTileInPath?: ElementInPath,
    selectedTilesInMountain: ElementInPile[] | undefined,
    onWarning:(path:PathType,x:number, y:number) => void
} & Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>

const MountainPile: FC<Props> = ({pile, x, y, tilesToTake, activePlayer, heightPile, verifyAndCompleteMove, selectedTileInPath, selectedTilesInMountain, onWarning,...props}) => {

    const playerId = usePlayerId()
    const animation = useAnimation<TakeTile>(animation => isTakeTile(animation.move) && animation.move.coordinates.x === x && animation.move.coordinates.y === y)
    const canTakeAny = tilesToTake?.element === Element.Earth && tilesToTake.coordinates.length && tilesToTake.coordinates[0].x === x && tilesToTake.coordinates[0].y === y
    
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

    return (
        <>
            <div {...props} css={[!tilesToTake && noPointerEvents, renderContext]}>
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
                                            playSelectTileInPile(setSelectedTilesInPileMove(x,y,index), {local:true})
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

            <MountainDropZone
                x={x}
                y={y}
                height={heightPile}
                selectedTileInPath={selectedTileInPath}
                onClick={() => {
                    verifyAndCompleteMove(selectedTileInPath,x,y)
                }}
                {...props}/>

        </>
    )
}



export function canTakeTile(x: number, y: number, z: number, tilesToTake: TilesToTake | undefined, mountainBoard: number[][][]): boolean {

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

export default MountainPile