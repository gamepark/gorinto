import {useGame} from '@gamepark/workshop'
import {DndProvider} from 'react-dnd-multi-backend'
import HTML5ToTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch'
import './App.css'
import GameDisplay from './GameDisplay'
import logo from './logo.svg'

function App() {
  const game = useGame<any>()
  return (
    <DndProvider options={HTML5ToTouch}>
      {game && <GameDisplay/>}
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </DndProvider>
  )
}

export default App
