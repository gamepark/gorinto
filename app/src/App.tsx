import {FailuresDialog, FullscreenDialog, Menu, useGame} from '@gamepark/react-client'
import {DndProvider} from 'react-dnd-multi-backend'
import HTML5ToTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch'
import GameDisplay from './GameDisplay'
import GameView from "@gamepark/gorinto/types/GameView";
import useHeaderText from "./images/useHeaderText";
import {Header, LoadingScreen} from "@gamepark/react-components";
import { useEffect, useState } from 'react';
import SoundLoader from './SoundLoader';
import FirstPlayerSound from './sounds/gongv1.mp3'
import MoveTileSound from './sounds/tic.mp3'
import GorintoBox from './images/gorintoBox.png'
import { css } from '@emotion/react';


function App() {
    const game = useGame<GameView>()
    const headerText = useHeaderText()

    const [isSoundsLoading, setSoundLoading] = useState(true)
    const [isJustDisplayed, setJustDisplayed] = useState(true)
    useEffect(() => {
      setTimeout(() => setJustDisplayed(false), 2000)
    }, [])

    const loading = !game || isSoundsLoading || isJustDisplayed

    return (
        <DndProvider options={HTML5ToTouch}>
            <Header> {headerText}</Header>
            <LoadingScreen gameBox={GorintoBox} author="Richard Yaner" artist="Josh Cappel" publisher={["Grand Games Guild","Super Meeple"]} display={loading} css={[loadingStyle, !loading && hideStyle]} />
            {!loading && <GameDisplay game={game!}/>}
            <SoundLoader sounds={[FirstPlayerSound, MoveTileSound]} onSoundLoad={() => setSoundLoading(false)} />
            <Menu/>
            <FailuresDialog/>
            <FullscreenDialog/>
        </DndProvider>
    )
}

const loadingStyle = css`
opacity:1;
text-align:center;
margin:auto auto;
p, h2{
    opacity:0.999;
    color:black;
}
transition:opacity 1s;
`

const hideStyle = css`
opacity:0;
text-align:center;
margin:auto auto;
p, h2{
    opacity:0;
    color:black;
    transition:opacity 1s;
}
transition:opacity 1s;
`

export default App
