import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import Timer from '../components/game/Timer'

export default function Level2() {
    const setScore = useGameStore((state) => state.setScore)
    const [currentTeam, setCurrentTeam] = useState<'A' | 'B'>('A')
    const [isActive, setIsActive] = useState(false)
    const [duration, setDuration] = useState(5)
    const [durationInput, setDurationInput] = useState('5')
    // 用於強制重置 Timer 的 key
    const [timerKey, setTimerKey] = useState(0)

    const handleFailA = () => {
        // A隊答錯，B隊獲勝
        setScore(2, 'B')
        setIsActive(false)
    }

    const handleFailB = () => {
        // B隊答錯，A隊獲勝
        setScore(2, 'A')
        setIsActive(false)
    }

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDurationInput(e.target.value)
    }

    const handleDurationBlur = () => {
        let num = Number(durationInput)
        if (isNaN(num)) {
            num = 5
        } else {
            num = Math.max(1, Math.min(60, num))
        }
        setDuration(num)
        setDurationInput(num.toString())
    }

    const handleStart = () => {
        setIsActive(true)
        setTimerKey(prev => prev + 1)
    }

    const handleStop = () => {
        setIsActive(false)
    }

    const handleTimeout = () => {
        // 時間到，自動切換隊伍並重置計時器
        setCurrentTeam(prev => prev === 'A' ? 'B' : 'A')
        setTimerKey(prev => prev + 1)
    }

    return (
        <div className="pixel-card max-w-3xl w-full">
            <h2 className="text-pixel-lg text-center mb-2 text-pixel-green">
                第二關：創意接龍
            </h2>

            {/* 題目 */}
            <div className="pixel-border p-3 mb-2 bg-pixel-bg text-center">
                <p className="text-pixel-sm mb-1">請造句：</p>
                <p className="text-pixel-base text-pixel-red">一 _ 就 _</p>
            </div>

            {/* 設定與輪到誰 */}
            <div className="flex justify-between items-center mb-2 px-2">
                <div className="text-pixel-sm">
                    輪到：<span className={currentTeam === 'A' ? 'text-pixel-blue' : 'text-pixel-green'}>
                        {currentTeam}隊
                    </span>
                </div>
                <div className="flex items-center">
                    <label className="text-pixel-xs mr-1">秒數:</label>
                    <input
                        type="text"
                        inputMode="numeric"
                        value={durationInput}
                        onChange={handleDurationChange}
                        onBlur={handleDurationBlur}
                        className="pixel-border w-10 text-center text-pixel-xs"
                        disabled={isActive}
                    />
                </div>
            </div>

            {/* 計時器 */}
            <div className="mb-2">
                <Timer
                    key={timerKey}
                    duration={duration}
                    isActive={isActive}
                    onTimeout={handleTimeout}
                />
            </div>

            {/* 裁判控制 */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
                {!isActive ? (
                    <button
                        onClick={handleStart}
                        className="pixel-button text-pixel-sm bg-pixel-blue text-white px-4 py-2"
                    >
                        ▶ 開始
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleStop}
                            className="pixel-button text-pixel-sm bg-gray-500 text-white px-4 py-2"
                        >
                            ⏸ 停止
                        </button>
                        <button
                            onClick={handleFailA}
                            className="pixel-button text-pixel-sm bg-pixel-red text-white px-4 py-2"
                        >
                            ✗ A隊答錯
                        </button>
                        <button
                            onClick={handleFailB}
                            className="pixel-button text-pixel-sm bg-pixel-green text-white px-4 py-2"
                        >
                            ✗ B隊答錯
                        </button>
                    </>
                )}
            </div>

            {/* 說明 */}
            <div className="mt-2 text-pixel-xs text-center opacity-70">
                <p>例如：一出門就下雨、一下雨就想睡</p>
                <p className="mt-1">每{duration}秒自動換隊，裁判判定答錯</p>
            </div>
        </div>
    )
}
