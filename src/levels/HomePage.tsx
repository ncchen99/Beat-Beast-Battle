import { useGameStore } from '../store/gameStore'

export default function HomePage() {
    const setLevel = useGameStore((state) => state.setLevel)
    const resetGame = useGameStore((state) => state.resetGame)

    return (
        <div className="pixel-card max-w-2xl w-full text-center">
            <h2 className="text-pixel-xl mb-3 text-pixel-blue">
                歡迎來到服學好好玩!
            </h2>

            <p className="text-pixel-sm mb-3 leading-relaxed">
                五關團康互動遊戲<br />
                準備好挑戰了嗎?
            </p>

            <div className="space-y-2 mb-4">
                <div className="pixel-border p-2 bg-pixel-bg">
                    <h3 className="text-pixel-base mb-1">語言創意類</h3>
                    <p className="text-pixel-xs">
                        第一關：照樣造句<br />
                        第二關：創意接龍
                    </p>
                </div>

                <div className="pixel-border p-2 bg-pixel-bg">
                    <h3 className="text-pixel-base mb-1">反應速度類</h3>
                    <p className="text-pixel-xs">
                        第三關：說動物挑戰<br />
                        第四關：進階挑戰<br />
                        第五關：終極挑戰
                    </p>
                </div>
            </div>

            <div className="flex flex-row items-center justify-center gap-2">
                <button
                    onClick={() => setLevel(1)}
                    className="pixel-button text-pixel-base bg-pixel-green text-white px-6 py-2"
                >
                    開始遊戲 🎮
                </button>

                <button
                    onClick={resetGame}
                    className="pixel-button text-pixel-base bg-pixel-red text-white px-6 py-2"
                >
                    🔄 重置遊戲紀錄
                </button>
            </div>
        </div>
    )
}
