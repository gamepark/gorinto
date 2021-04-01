import {useGame} from '@gamepark/react-client'
import {DndProvider} from 'react-dnd-multi-backend'
import HTML5ToTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch'
import GameDisplay from './GameDisplay'
import GameView from "@gamepark/gorinto/types/GameView";

function App() {
  const game = useGame<GameView>()
  return (
    <DndProvider options={HTML5ToTouch}>
      {game && <GameDisplay game={game}/>}
    </DndProvider>
  )
}

export default App
