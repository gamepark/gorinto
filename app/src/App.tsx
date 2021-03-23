import GameState from '@gamepark/gorinto/types/GameState'
import {useGame} from '@gamepark/react-client'
import i18next from 'i18next'
import ICU from 'i18next-icu'
import {DndProvider} from 'react-dnd-multi-backend'
import HTML5ToTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch'
import {initReactI18next} from 'react-i18next'
import GameDisplay from './GameDisplay'
import translations from './translations.json'

i18next.use(initReactI18next).use(ICU)

const query = new URLSearchParams(window.location.search)
const locale = query.get('locale') || 'en'

i18next.init({
  lng: locale,
  debug: process.env.NODE_ENV === 'development',
  fallbackLng: 'en',
  keySeparator: false,
  nsSeparator: false,
  resources: translations
})

function App() {
  const game = useGame<GameState>()
  return (
    <DndProvider options={HTML5ToTouch}>
      {game && <GameDisplay game={game}/>}

    </DndProvider>
  )
}

export default App
