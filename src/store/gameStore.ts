import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Team = 'A' | 'B' | null

export interface GameScore {
    level1: Team
    level2: Team
    level3: Team
    level4: Team
    level5: Team
}

export type GamePhase = 'prepare' | 'play' | 'buffer'

export interface RhythmState {
    animalSequence: string[]
    currentBeat: number
    phase: GamePhase
    redFrameIndex: number
    isPlaying: boolean
}

export interface GameSettings {
    bgmEnabled: boolean
    bgmVolume: number
    sfxEnabled: boolean
}

export interface GameState {
    // 關卡狀態
    currentLevel: number // 0=首頁, 1-5=關卡, 6=結果頁

    // 分數紀錄
    scores: GameScore

    // 節奏遊戲狀態
    rhythmState: RhythmState

    // 設定
    settings: GameSettings

    // Actions
    setLevel: (level: number) => void
    setScore: (level: number, winner: Team) => void
    resetGame: () => void
    generateAnimalSequence: (allowRepeat: boolean, useRealPhotos: boolean, ensureAdjacent?: boolean, minRepeats?: number, limitToAnimeAnimals?: boolean) => void
    setRhythmState: (state: Partial<RhythmState>) => void
    toggleBGM: () => void
    toggleSFX: () => void
}

const initialScores: GameScore = {
    level1: null,
    level2: null,
    level3: null,
    level4: null,
    level5: null,
}

const initialRhythmState: RhythmState = {
    animalSequence: [],
    currentBeat: 0,
    phase: 'prepare',
    redFrameIndex: 0,
    isPlaying: false,
}

const initialSettings: GameSettings = {
    bgmEnabled: true,
    bgmVolume: 0.5,
    sfxEnabled: true,
}



// 動物池 - 對應圖片檔名
const ANIME_ANIMALS = ['bear', 'bird', 'chicken', 'dog', 'pig'] // 動畫版只有5張
const REAL_ANIMALS = ['bear', 'bird', 'chicken', 'cow', 'dog', 'horse', 'pig', 'rabbit', 'sheep', 'snake'] // 真實版10張

// 動物中文名稱對應
export const ANIMAL_NAMES: Record<string, string> = {
    bear: '熊',
    bird: '鳥',
    chicken: '雞',
    cow: '牛',
    dog: '狗',
    horse: '馬',
    pig: '豬',
    rabbit: '兔',
    sheep: '羊',
    snake: '蛇',
}

// 生成確保有相鄰重複的序列
function generateSequenceWithAdjacentRepeats(pool: string[], length: number, minRepeats: number = 1): string[] {
    let sequence: string[] = []
    let valid = false

    // 嘗試生成直到滿足條件，避免無限迴圈設定最大嘗試次數
    let attempts = 0
    while (!valid && attempts < 100) {
        attempts++
        sequence = []
        let currentAnimal = pool[Math.floor(Math.random() * pool.length)]
        sequence.push(currentAnimal)

        // 隨機生成
        for (let i = 1; i < length; i++) {
            // 決定是否重複前一個
            // 如果還需要更多重複，提高重複機率
            const shouldRepeat = Math.random() < 0.4

            if (shouldRepeat) {
                sequence.push(currentAnimal)
            } else {
                let nextAnimal = pool[Math.floor(Math.random() * pool.length)]
                // 確保不意外重複（除非我們想要）
                while (nextAnimal === currentAnimal && pool.length > 1) {
                    nextAnimal = pool[Math.floor(Math.random() * pool.length)]
                }
                currentAnimal = nextAnimal
                sequence.push(currentAnimal)
            }
        }

        // 檢查重複次數
        let repeatCount = 0
        for (let i = 0; i < length - 1; i++) {
            if (sequence[i] === sequence[i + 1]) {
                repeatCount++
                // 跳過下一個，避免計算三次重複為兩次（例如 A A A 算一次重複還是兩次？題目說是"重複的序列"，通常 A A 是一組。A A A 包含兩組 A A? 這裡簡單計算相鄰對）
                // 為了簡單，我們計算相鄰相同的對數。A A -> 1, A A A -> 2.
                // 如果題目意思是"組"，例如 A A, B B，那 A A A 可能算一組長重複。
                // 假設 A A 算一組。
                // 為了確保分開的組，我們可以在這裡嚴格檢查。
                // 但簡單的相鄰檢查通常足夠。
                // 讓我們用更嚴格的邏輯：計算"塊"的數量。
            }
        }

        // 重新計算"重複組"的數量 (例如 A A 是一組, B B 是一組)
        let pairCount = 0
        for (let i = 0; i < length - 1; i++) {
            if (sequence[i] === sequence[i + 1]) {
                pairCount++
                // 如果是 A A A，i=0 (A=A) pair++, i=1 (A=A) pair++
                // 這樣 A A A 會算 2 個重複。這符合"至少出現2個重複的序列"嗎？
                // 例子：豬豬狗熊雞鳥鳥豬 -> 豬豬(1) 鳥鳥(1) -> 共2組。
                // 如果是 豬豬豬 -> 2組。
                // 應該是可以的。
            }
        }

        if (pairCount >= minRepeats) {
            valid = true
        }
    }

    // 如果嘗試多次失敗，強制構造
    if (!valid) {
        sequence = Array.from({ length }, () => pool[Math.floor(Math.random() * pool.length)])
        // 強制插入 minRepeats 個重複
        for (let i = 0; i < minRepeats; i++) {
            const idx = i * 2
            if (idx < length - 1) {
                sequence[idx + 1] = sequence[idx]
            }
        }
    }

    return sequence
}

export const useGameStore = create<GameState>()(
    persist(
        (set) => ({
            currentLevel: 0,
            scores: initialScores,
            rhythmState: initialRhythmState,
            settings: initialSettings,

            setLevel: (level) => set({ currentLevel: level }),

            setScore: (level, winner) =>
                set((state) => ({
                    scores: {
                        ...state.scores,
                        [`level${level}`]: winner,
                    },
                })),

            resetGame: () =>
                set({
                    currentLevel: 0,
                    scores: initialScores,
                    rhythmState: initialRhythmState,
                }),

            generateAnimalSequence: (allowRepeat, useRealPhotos, ensureAdjacent = false, minRepeats = 1, limitToAnimeAnimals = false) =>
                set((state) => {
                    // 決定動物池
                    let animalPool = useRealPhotos ? REAL_ANIMALS : ANIME_ANIMALS

                    // 如果是真實照片但限制為動畫動物種類 (Level 4)
                    if (useRealPhotos && limitToAnimeAnimals) {
                        // ANIME_ANIMALS 的名稱都在 REAL_ANIMALS 裡，直接用 ANIME_ANIMALS 的名稱列表即可
                        // 因為 REAL_ANIMALS 包含了所有 ANIME_ANIMALS 的名稱
                        animalPool = ANIME_ANIMALS
                    }

                    let sequence: string[]

                    if (ensureAdjacent) {
                        // 確保有相鄰重複的序列（第3、4、5關）
                        sequence = generateSequenceWithAdjacentRepeats(animalPool, 8, minRepeats)
                    } else if (allowRepeat) {
                        // 可重複:隨機選8個
                        sequence = Array.from({ length: 8 }, () =>
                            animalPool[Math.floor(Math.random() * animalPool.length)]
                        )
                    } else {
                        // 不重複:打亂順序取8個
                        const shuffled = [...animalPool].sort(() => Math.random() - 0.5)
                        sequence = shuffled.slice(0, 8)
                    }

                    return {
                        rhythmState: {
                            ...state.rhythmState,
                            animalSequence: sequence,
                        },
                    }
                }),

            setRhythmState: (newState) =>
                set((state) => ({
                    rhythmState: {
                        ...state.rhythmState,
                        ...newState,
                    },
                })),

            toggleBGM: () =>
                set((state) => ({
                    settings: {
                        ...state.settings,
                        bgmEnabled: !state.settings.bgmEnabled,
                    },
                })),

            toggleSFX: () =>
                set((state) => ({
                    settings: {
                        ...state.settings,
                        sfxEnabled: !state.settings.sfxEnabled,
                    },
                })),
        }),
        {
            name: 'game-storage', // localStorage key
            partialize: (state) => ({
                currentLevel: state.currentLevel,
                scores: state.scores,
                // 不保存 rhythmState 和 settings 因為遊戲狀態不需要持久化
            }),
        }
    )
)
