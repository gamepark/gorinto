import {FailuresDialog, FullscreenDialog, Menu, useGame} from '@gamepark/react-client'
import {DndProvider} from 'react-dnd-multi-backend'
import HTML5ToTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch'
import GameDisplay from './GameDisplay'
import GameView from "@gamepark/gorinto/types/GameView";
import useHeaderText from "./images/useHeaderText";
import {Header} from "@gamepark/react-components";
import { useState } from 'react';
import SoundLoader from './SoundLoader';
import FirstPlayerSound from './sounds/gongv1.mp3'
import MoveTileSound from './sounds/tic.mp3'


function App() {
    const game = useGame<GameView>()
    const headerText = useHeaderText()

    const [isSoundsLoading, setSoundLoading] = useState(true)
    const loadingSounds = isSoundsLoading

    return (
        <DndProvider options={HTML5ToTouch}>
            <Header text={headerText}/>
            {game && !loadingSounds && <GameDisplay game={game}/>}
            <SoundLoader sounds={[FirstPlayerSound, MoveTileSound]} onSoundLoad={() => setSoundLoading(false)} />
            <Menu/>
            <FailuresDialog/>
            <FullscreenDialog/>
        </DndProvider>
    )
}

export default App
