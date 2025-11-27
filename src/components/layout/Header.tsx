import { useGameStore } from '../../store/gameStore'

export default function Header() {
    const currentLevel = useGameStore((state) => state.currentLevel)
    const scores = useGameStore((state) => state.scores)

    // 計算總分
    const teamAWins = Object.values(scores).filter((s) => s === 'A').length
    const teamBWins = Object.values(scores).filter((s) => s === 'B').length

    return (
        <header className="pixel-border bg-white p-2 shadow-pixel mt-2">
            <div className="container mx-auto">
                {/* 遊戲標題 - 只在首頁顯示 */}
                {currentLevel === 0 && (
                    <h1 className="text-pixel-xl text-center mb-1 text-pixel-blue">
                        🎮 服學好好玩
                    </h1>
                )}

                {/* 分數板 - 遊戲中只顯示比分 */}
                {currentLevel > 0 && (
                    <div className="flex justify-center items-center gap-6 text-pixel-base">
                        <div className="flex items-center gap-2">
                            <span className="text-pixel-blue font-bold">A隊</span>
                            <span className="pixel-border bg-pixel-blue text-white px-3 py-1 text-pixel-lg font-bold">
                                {teamAWins}
                            </span>
                        </div>
                        <span className="text-pixel-lg">vs</span>
                        <div className="flex items-center gap-2">
                            <span className="text-pixel-green font-bold">B隊</span>
                            <span className="pixel-border bg-pixel-green text-white px-3 py-1 text-pixel-lg font-bold">
                                {teamBWins}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
