import { useEffect, useRef } from 'react'
import { useGameStore, ANIMAL_NAMES } from '../../store/gameStore'

const BASE_BPM = 195

interface RhythmGridProps {
    animals: string[]
    isPlaying: boolean
    useRealPhotos: boolean
    onMusicStart?: () => void
    bpm?: number
}

export default function RhythmGrid({ animals, isPlaying, useRealPhotos, onMusicStart, bpm = 195 }: RhythmGridProps) {
    const { rhythmState, setRhythmState } = useGameStore()
    const intervalRef = useRef<number | null>(null)
    const audioRef = useRef<HTMLAudioElement>(null)

    // 計算每拍時間
    const beatDuration = 60 / bpm * 1000

    // 更新音樂播放速度
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = bpm / BASE_BPM
        }
    }, [bpm])

    useEffect(() => {
        if (!isPlaying) {
            // 重置狀態
            setRhythmState({
                currentBeat: 0,
                phase: 'prepare',
                redFrameIndex: 0,
            })

            // 停止音樂
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current.currentTime = 0
            }

            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
            return
        }

        // 開始播放音樂
        if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.playbackRate = bpm / BASE_BPM
            audioRef.current.play().catch((error) => {
                console.log('Music autoplay blocked:', error)
            })
            onMusicStart?.()
        }

        // 開始節奏引擎
        let beatCount = 0

        intervalRef.current = window.setInterval(() => {
            beatCount++

            if (beatCount <= 8) {
                // 拍 1-8: 換人和準備階段
                setRhythmState({
                    currentBeat: beatCount,
                    phase: 'prepare',
                    redFrameIndex: 0,
                })
            } else if (beatCount <= 16) {
                // 拍 9-16: 開始！跟著念！階段
                const frameIndex = beatCount - 9 // 0-7
                setRhythmState({
                    currentBeat: beatCount,
                    phase: 'play',
                    redFrameIndex: frameIndex,
                })
            } else {
                // 16拍後重新開始新一輪
                beatCount = 0
            }
        }, beatDuration)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [isPlaying, setRhythmState, onMusicStart, bpm, beatDuration])

    // 階段提示文字
    const getPhaseText = () => {
        switch (rhythmState.phase) {
            case 'prepare':
                return '換人準備...'
            case 'play':
                return '開始! 跟著念!'
            default:
                return ''
        }
    }

    // 取得圖片路徑
    const getImagePath = (animalKey: string) => {
        const folder = useRealPhotos ? 'real' : 'anime'
        return `/images/${folder}/${animalKey}.png`
    }

    return (
        <div className="w-full max-w-3xl">
            {/* 隱藏的音樂播放器 */}
            <audio
                ref={audioRef}
                src="/audios/music.mp3"
                loop
                preload="auto"
            />

            {/* 階段提示 */}
            <div className="text-pixel-base text-center mb-2 h-4">
                {isPlaying && (
                    <span className={
                        rhythmState.phase === 'play'
                            ? 'text-pixel-red'
                            : 'text-pixel-blue'
                    }>
                        {getPhaseText()}
                    </span>
                )}
            </div>

            {/* 8格動物網格 */}
            <div className="animal-grid relative">
                {animals.map((animal, index) => (
                    <div key={index} className="animal-cell">
                        {/* 動物圖片 */}
                        <img
                            src={getImagePath(animal)}
                            alt={ANIMAL_NAMES[animal] || animal}
                            className="w-full h-full object-cover"
                        />

                        {/* 紅框指示器 */}
                        {isPlaying &&
                            rhythmState.phase === 'play' &&
                            rhythmState.redFrameIndex === index && (
                                <div className="red-frame" />
                            )}
                    </div>
                ))}
            </div>

            {/* 節拍計數器 */}
            {isPlaying && (
                <div className="text-pixel-xs text-center mt-1 opacity-50">
                    節拍: {rhythmState.currentBeat} / 16
                </div>
            )}
        </div>
    )
}
