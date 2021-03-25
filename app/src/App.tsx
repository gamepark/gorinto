import GameState from '@gamepark/gorinto/types/GameState'
import {useGame} from '@gamepark/react-client'
import {DndProvider} from 'react-dnd-multi-backend'
import HTML5ToTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch'
import GameDisplay from './GameDisplay'

function App() {
  const game = useGame<GameState>()
  return (
    <DndProvider options={HTML5ToTouch}>
      {game && <GameDisplay game={game}/>}
    </DndProvider>
  )
}

export default App
