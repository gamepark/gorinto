import {FailuresDialog, FullscreenDialog, Menu, useGame} from '@gamepark/react-client'
import {DndProvider} from 'react-dnd-multi-backend'
import HTML5ToTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch'
import GameDisplay from './GameDisplay'
import GameView from '@gamepark/gorinto/types/GameView'
import {Header, ImagesLoader, LoadingScreen} from '@gamepark/react-components'
import {useEffect, useState} from 'react'
import SoundLoader from './SoundLoader'
import FirstPlayerSound from './sounds/gongv1.mp3'
import MoveTileSound from './sounds/tic.mp3'
import {css} from '@emotion/react'
import HeaderText from './HeaderText'
import {AudioLoader} from './AudioLoader'
import Images from './images/Images'

function App() {
  const game = useGame<GameView>()

  const [audioLoader, setAudioLoader] = useState<AudioLoader>()
  const [imagesLoading, setImagesLoading] = useState(true)
  const [isSoundsLoading, setSoundLoading] = useState(true)
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 2000)
  }, [])

  const loading = !game || imagesLoading || isSoundsLoading || isJustDisplayed

  return (
    <DndProvider options={HTML5ToTouch}>
      <Header><HeaderText loading={loading} game={game}/></Header>
      <LoadingScreen author="Richard Yaner" artist="Josh Cappel" publisher={['Grand Games Guild', 'Super Meeple']} developer="Théo Grégorio"
                     display={loading} css={[loadingStyle, !loading && hideStyle]}/>
      {!loading && audioLoader && <GameDisplay game={game}/>}
      <ImagesLoader images={Object.values(Images)} onImagesLoad={() => setImagesLoading(false)}/>
      <SoundLoader sounds={[FirstPlayerSound, MoveTileSound]} onSoundLoad={() => setSoundLoading(false)}
                   onSoundsPrepared={(audioLoader) => setAudioLoader(audioLoader)}/>
      <Menu/>
      <FailuresDialog/>
      <FullscreenDialog/>
    </DndProvider>
  )
}

const loadingStyle = css`
  opacity: 1;
  text-align: center;
  margin: auto auto;

  p, h2 {
    opacity: 0.999;
    color: black;
  }

  transition: opacity 1s;
`

const hideStyle = css`
  opacity: 0;
  text-align: center;
  margin: auto auto;

  p, h2 {
    opacity: 0;
    color: black;
    transition: opacity 1s;
  }

  transition: opacity 1s;
`

export default App
