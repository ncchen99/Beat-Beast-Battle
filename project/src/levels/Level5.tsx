import { useEffect, useState, useRef } from 'react'
import { useGameStore } from '../store/gameStore'
import RhythmGrid from '../components/game/RhythmGrid'

export default function Level5() {
    const { generateAnimalSequence, rhythmState, setScore } = useGameStore()
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTeam, setCurrentTeam] = useState<'A' | 'B'>('A')
    const [previousTeam, setPreviousTeam] = useState<'A' | 'B'>('B') // 追踪前一個隊伍
    const [bpm, setBpm] = useState(195)
    const [bpmInput, setBpmInput] = useState('195')
    const lastSwitchBeatRef = useRef(0)

    useEffect(() => {
        // 生成動物序列 (不可重複 -> 改為確保相鄰重複, 使用真實照片, 至少1組重複)
        generateAnimalSequence(false, true, true, 1)
    }, [generateAnimalSequence])

    // 自動換隊邏輯：每16拍換一次隊
    useEffect(() => {
        if (!isPlaying) return

        const currentBeat = rhythmState.currentBeat
        // 當擊拍重新回到01，表示一輮結束
        if (currentBeat === 1 && rhythmState.phase === 'prepare' && lastSwitchBeatRef.current !== 1) {
            lastSwitchBeatRef.current = 1 // 標記此拍已處理

            // 生成新的動物序列 (至少1組重複)
            generateAnimalSequence(false, true, true, 1)
            // 記錄前一隊並換隊
            setPreviousTeam(currentTeam)
            setCurrentTeam(prev => prev === 'A' ? 'B' : 'A')
        } else if (currentBeat !== 1) {
            lastSwitchBeatRef.current = 0 // 重置標記
        }
    }, [rhythmState.currentBeat, rhythmState.phase, isPlaying, generateAnimalSequence, currentTeam])

    const handleStart = () => {
        setIsPlaying(true)
    }

    const handleStop = () => {
        setIsPlaying(false)
    }

    const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBpmInput(e.target.value)
    }

    const handleBpmBlur = () => {
        let num = Number(bpmInput)
        if (isNaN(num)) {
            num = 195
        } else {
            num = Math.max(60, Math.min(300, num))
        }
        setBpm(num)
        setBpmInput(num.toString())
    }

    return (
        <div className="pixel-card max-w-4xl w-full">
            <h2 className="text-pixel-lg text-center mb-1 text-pixel-red">
                第五關：終極挑戰
            </h2>

            <div className="flex justify-center items-center gap-4 mb-2">
                <p className="text-pixel-xs opacity-70">
                    真實照片 | 確保重複(1組) | 10種動物
                </p>
                <div className="flex items-center">
                    <label className="text-pixel-xs mr-1">BPM:</label>
                    <input
                        type="text"
                        inputMode="numeric"
                        value={bpmInput}
                        onChange={handleBpmChange}
                        onBlur={handleBpmBlur}
                        className="pixel-border w-12 text-center text-pixel-xs"
                        disabled={isPlaying}
                    />
                </div>
            </div>

            {/* 當前隊伍 */}
            <div className="text-pixel-sm text-center mb-2">
                輪到：<span className={currentTeam === 'A' ? 'text-pixel-blue' : 'text-pixel-green'}>
                    {currentTeam}隊
                </span>
            </div>

            {/* 節奏網格 */}
            <RhythmGrid
                animals={rhythmState.animalSequence}
                isPlaying={isPlaying}
                useRealPhotos={true}
                bpm={bpm}
            />

            {/* 控制按鈕 */}
            <div className="flex flex-wrap justify-center gap-2 mt-3">
                {!isPlaying ? (
                    <button
                        onClick={handleStart}
                        className="pixel-button text-pixel-sm bg-pixel-blue text-white"
                    >
                        ▶ 開始
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleStop}
                            className="pixel-button text-pixel-sm bg-gray-500 text-white"
                        >
                            ⏸ 停止
                        </button>
                        <button
                            onClick={() => {
                                // 如果在準備階段，算前一隊答錯；否則算當前隊答錯
                                const failedTeam = rhythmState.phase === 'prepare' ? previousTeam : currentTeam
                                const winner = failedTeam === 'A' ? 'B' : 'A'
                                setScore(5, winner)
                                setIsPlaying(false)
                            }}
                            className="pixel-button text-pixel-sm bg-pixel-red text-white"
                        >
                            ✗ 失敗
                        </button>
                    </>
                )}
            </div>

            {/* 說明 */}
            <div className="mt-2 text-pixel-xs text-center opacity-70">
                <p>🔥 終極挑戰! 8種不同動物!</p>
            </div>
        </div>
    )
}
