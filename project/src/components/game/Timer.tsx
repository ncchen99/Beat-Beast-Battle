import { useEffect, useState } from 'react'

interface TimerProps {
    duration: number // 秒數
    isActive: boolean
    onTimeout: () => void
}

export default function Timer({ duration, isActive, onTimeout }: TimerProps) {
    const [timeLeft, setTimeLeft] = useState(duration)

    useEffect(() => {
        if (!isActive) {
            setTimeLeft(duration)
            return
        }

        if (timeLeft <= 0) {
            onTimeout()
            return
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0.1) {
                    clearInterval(timer)
                    return 0
                }
                return prev - 0.1
            })
        }, 100)

        return () => clearInterval(timer)
    }, [isActive, timeLeft, duration, onTimeout])

    const percentage = (timeLeft / duration) * 100
    const color = percentage > 50 ? 'bg-pixel-green' : percentage > 20 ? 'bg-pixel-yellow' : 'bg-pixel-red'

    return (
        <div className="w-full">
            {/* 數字顯示 */}
            <div className="text-pixel-lg text-center mb-1">
                {isActive ? timeLeft.toFixed(1) : duration.toFixed(1)}
            </div>

            {/* 進度條 */}
            <div className="pixel-border w-full h-6 bg-gray-200 overflow-hidden">
                <div
                    className={`h-full transition-all duration-100 ${color}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}
