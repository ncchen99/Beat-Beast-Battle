import { useGameStore } from '../../store/gameStore'

const LEVEL_NAMES = [
    '首頁',
    '第一關：照樣造句',
    '第二關：創意接龍',
    '第三關：說動物挑戰',
    '第四關：進階挑戰',
    '第五關：終極挑戰',
    '結果公布',
]

export default function Header() {
    const currentLevel = useGameStore((state) => state.currentLevel)
    const scores = useGameStore((state) => state.scores)

    // 計算總分
    const teamAWins = Object.values(scores).filter((s) => s === 'A').length
    const teamBWins = Object.values(scores).filter((s) => s === 'B').length

    return (
        <header className="pixel-border bg-white p-2 shadow-pixel">
            <div className="container mx-auto">
                {/* 遊戲標題 */}
                <h1 className="text-pixel-xl text-center mb-1 text-pixel-blue">
                    🎮 服學好好玩
                </h1>

                {/* 當前關卡 */}
                {currentLevel > 0 && currentLevel < 6 && (
                    <div className="text-pixel-sm text-center mb-1">
                        {LEVEL_NAMES[currentLevel]}
                    </div>
                )}

                {/* 分數板 */}
                {currentLevel > 0 && (
                    <div className="flex justify-center items-center gap-4 text-pixel-sm">
                        <div className="flex items-center gap-1">
                            <span className="text-pixel-blue">A隊</span>
                            <span className="pixel-border bg-pixel-blue text-white px-2 py-0.5">
                                {teamAWins}
                            </span>
                        </div>
                        <span>vs</span>
                        <div className="flex items-center gap-1">
                            <span className="text-pixel-green">B隊</span>
                            <span className="pixel-border bg-pixel-green text-white px-2 py-0.5">
                                {teamBWins}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
