import { useGameStore } from './store/gameStore'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './levels/HomePage'
import Level1 from './levels/Level1'
import Level2 from './levels/Level2'
import Level3 from './levels/Level3'
import Level4 from './levels/Level4'
import Level5 from './levels/Level5'
import FinalScore from './levels/FinalScore'

function App() {
    const currentLevel = useGameStore((state) => state.currentLevel)

    const renderLevel = () => {
        switch (currentLevel) {
            case 0:
                return <HomePage />
            case 1:
                return <Level1 />
            case 2:
                return <Level2 />
            case 3:
                return <Level3 />
            case 4:
                return <Level4 />
            case 5:
                return <Level5 />
            case 6:
                return <FinalScore />
            default:
                return <HomePage />
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex items-start justify-center p-2 overflow-auto">
                {renderLevel()}
            </main>
            <Footer />
        </div>
    )
}

export default App
