import { useEffect, useRef } from 'react'
import { useGameStore } from '../../store/gameStore'

export default function BGMPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const { settings } = useGameStore()

    useEffect(() => {
        if (!audioRef.current) return

        if (settings.bgmEnabled) {
            audioRef.current.play().catch((error) => {
                console.log('BGM autoplay blocked:', error)
            })
        } else {
            audioRef.current.pause()
        }
    }, [settings.bgmEnabled])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = settings.bgmVolume
        }
    }, [settings.bgmVolume])

    return (
        <audio
            ref={audioRef}
            src="/audios/music.mp3"
            loop
            preload="auto"
        />
    )
}
