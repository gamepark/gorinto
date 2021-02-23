import {useGame} from '@gamepark/workshop'
import {DndProvider} from 'react-dnd-multi-backend'
import HTML5ToTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch'
import './App.css'
import GameDisplay from './GameDisplay'

import Game from './types/Game'

function App() {
  const game = useGame<Game>()
  return (
    <DndProvider options={HTML5ToTouch}>
      {game && <GameDisplay game={game}/>}

    </DndProvider>
  )
}

export default App
