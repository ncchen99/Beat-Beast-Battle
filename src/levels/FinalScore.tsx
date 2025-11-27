import { useGameStore } from '../store/gameStore'

export default function FinalScore() {
    const { scores, resetGame, setLevel } = useGameStore()

    // 計算勝場
    const results = [
        { level: 1, name: '第一關：照樣造句', winner: scores.level1 },
        { level: 2, name: '第二關：創意接龍', winner: scores.level2 },
        { level: 3, name: '第三關：說動物挑戰', winner: scores.level3 },
        { level: 4, name: '第四關：進階挑戰', winner: scores.level4 },
        { level: 5, name: '第五關：終極挑戰', winner: scores.level5 },
    ]

    const teamAWins = Object.values(scores).filter((s) => s === 'A').length
    const teamBWins = Object.values(scores).filter((s) => s === 'B').length

    const finalWinner = teamAWins > teamBWins ? 'A隊' : teamBWins > teamAWins ? 'B隊' : '平手'

    return (
        <div className="pixel-card max-w-3xl w-full">
            <h2 className="text-pixel-lg text-center mb-3">
                🏆 結果公布 🏆
            </h2>

            {/* 各關結果 */}
            <div className="space-y-1 mb-3">
                {results.map((result) => (
                    <div
                        key={result.level}
                        className="pixel-border p-2 flex justify-between items-center bg-white"
                    >
                        <span className="text-pixel-sm">{result.name}</span>
                        <span
                            className={`text-pixel-sm ${result.winner === 'A'
                                    ? 'text-pixel-blue'
                                    : result.winner === 'B'
                                        ? 'text-pixel-green'
                                        : 'opacity-50'
                                }`}
                        >
                            {result.winner ? `${result.winner}隊` : '未完成'}
                        </span>
                    </div>
                ))}
            </div>

            {/* 總分 */}
            <div className="pixel-border p-3 bg-pixel-bg mb-3">
                <div className="flex justify-around items-center">
                    <div className="text-center">
                        <div className="text-pixel-xs mb-1">A隊</div>
                        <div className="text-pixel-xl text-pixel-blue">{teamAWins}</div>
                    </div>
                    <div className="text-pixel-lg">:</div>
                    <div className="text-center">
                        <div className="text-pixel-xs mb-1">B隊</div>
                        <div className="text-pixel-xl text-pixel-green">{teamBWins}</div>
                    </div>
                </div>
            </div>

            {/* 最終勝利 */}
            <div className="text-center mb-3">
                <p className="text-pixel-sm mb-1">最終勝利</p>
                <p className="text-pixel-lg text-pixel-yellow">
                    {finalWinner === '平手' ? '🤝 平手!' : `🎉 ${finalWinner} 🎉`}
                </p>
            </div>

            {/* 按鈕 */}
            <div className="flex flex-wrap justify-center gap-2">
                <button
                    onClick={() => setLevel(0)}
                    className="pixel-button text-pixel-sm"
                >
                    返回首頁
                </button>
                <button
                    onClick={resetGame}
                    className="pixel-button text-pixel-sm bg-pixel-blue text-white"
                >
                    🔄 重新開始
                </button>
            </div>
        </div>
    )
}
