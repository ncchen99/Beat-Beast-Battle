import { useGameStore } from '../../store/gameStore'

export default function Footer() {
    const { currentLevel, setLevel, resetGame } = useGameStore()

    return (
        <footer className="pixel-border bg-white p-2 shadow-pixel mb-2">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-center items-center gap-2">
                    {/* 上一關 */}
                    {currentLevel > 0 && (
                        <button
                            onClick={() => setLevel(Math.max(0, currentLevel - 1))}
                            className="pixel-button text-pixel-sm"
                        >
                            ← 上一關
                        </button>
                    )}

                    {/* 重新開始 */}
                    {currentLevel > 0 && currentLevel < 6 && (
                        <button
                            onClick={resetGame}
                            className="pixel-button text-pixel-sm bg-pixel-yellow"
                        >
                            🔄 重新開始
                        </button>
                    )}

                    {/* 下一關 */}
                    {currentLevel >= 0 && currentLevel < 6 && (
                        <button
                            onClick={() => setLevel(Math.min(6, currentLevel + 1))}
                            className="pixel-button text-pixel-sm"
                        >
                            下一關 →
                        </button>
                    )}
                </div>
            </div>
        </footer>
    )
}
