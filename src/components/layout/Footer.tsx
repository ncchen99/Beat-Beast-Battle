import { useGameStore } from '../../store/gameStore'

export default function Footer() {
    const { currentLevel, setLevel, resetGame } = useGameStore()

    return (
        <footer className="pixel-border bg-white p-2 shadow-pixel mb-2">
            <div className="container mx-auto">
                <div className="flex justify-between items-center gap-2">
                    {/* 左側：重新開始 */}
                    <div className="flex-shrink-0">
                        {currentLevel > 0 && currentLevel < 6 ? (
                            <button
                                onClick={resetGame}
                                className="pixel-button text-pixel-sm bg-pixel-yellow"
                            >
                                🔄 重新開始
                            </button>
                        ) : (
                            <div className="w-24"></div>
                        )}
                    </div>

                    {/* 中間：上一關和下一關 */}
                    <div className="flex gap-2 justify-center">
                        {currentLevel > 0 && (
                            <button
                                onClick={() => setLevel(Math.max(0, currentLevel - 1))}
                                className="pixel-button text-pixel-sm"
                            >
                                ← 上一關
                            </button>
                        )}

                        {currentLevel >= 0 && currentLevel < 6 && (
                            <button
                                onClick={() => setLevel(Math.min(6, currentLevel + 1))}
                                className="pixel-button text-pixel-sm"
                            >
                                下一關 →
                            </button>
                        )}
                    </div>

                    {/* 右側：占位符保持對稱 */}
                    <div className="flex-shrink-0 w-24"></div>
                </div>
            </div>
        </footer>
    )
}
