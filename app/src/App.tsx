import {useGame} from '@gamepark/react-client'
import {DndProvider} from 'react-dnd-multi-backend'
import HTML5ToTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch'
import GameDisplay from './GameDisplay'
import GameView from "@gamepark/gorinto/types/GameView";
import useHeaderText from "./images/useHeaderText";
import {Header} from "@gamepark/react-components";

function App() {
    const game = useGame<GameView>()
    const headerText = useHeaderText()
    return (
        <DndProvider options={HTML5ToTouch}>
            <Header text={headerText}/>
            {game && <GameDisplay game={game}/>}
        </DndProvider>
    )
}

export default App
