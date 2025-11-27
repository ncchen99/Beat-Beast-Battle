# 修復紅框顯示與準備階段失敗判定邏輯

## 修改日期
2025-11-27 23:00

## 修改內容

### 1. 修復紅框不顯示的問題 ✓

**問題**：之前將框的 className 改為 `animal-frame`（金黃色），導致沒有顯示紅色指示框

**解決方案**：
- 將 `src/components/game/RhythmGrid.tsx` 中的框 className 改回 `red-frame`
- 紅框會在第 9-16 拍（"開始！跟著念！"階段）依序指示 8 個動物

**修改檔案**：
- `src/components/game/RhythmGrid.tsx` (第 140 行)

### 2. 準備階段按失敗算前一隊 ✓

**需求**：
因為有時候按答錯會來不及，想要在準備階段按下失敗按鈕時，算是前一個隊伍答錯

**實現邏輯**：
1. 新增 `previousTeam` state 來追踪前一個隊伍
2. 在自動換隊時記錄前一個隊伍：`setPreviousTeam(currentTeam)`
3. 失敗按鈕的判定邏輯：
   - **準備階段** (`rhythmState.phase === 'prepare'`)：算前一隊答錯
   - **遊戲階段** (`rhythmState.phase === 'play'`)：算當前隊答錯

**程式碼範例**：
```typescript
const [previousTeam, setPreviousTeam] = useState<'A' | 'B'>('B')

// 失敗按鈕邏輯
onClick={() => {
    // 如果在準備階段，算前一隊答錯；否則算當前隊答錯
    const failedTeam = rhythmState.phase === 'prepare' ? previousTeam : currentTeam
    const winner = failedTeam === 'A' ? 'B' : 'A'
    setScore(3, winner)
    setIsPlaying(false)
}}
```

**修改檔案**：
- `src/levels/Level3.tsx`
- `src/levels/Level4.tsx`
- `src/levels/Level5.tsx`

## 遊戲流程說明

### 時間軸範例（以 A 隊開始為例）

| 拍數 | 階段 | 顯示隊伍 | 說明 | 按失敗判定 |
|------|------|----------|------|------------|
| 1-8 | 準備 | A 隊 | "換人準備..." | **B 隊輸**（前一輪） |
| 9-16 | 遊戲 | A 隊 | "開始！跟著念！" + 紅框 | **A 隊輸**（當前） |
| 1-8 | 準備 | B 隊 | "換人準備..." | **A 隊輸**（前一輪） |
| 9-16 | 遊戲 | B 隊 | "開始！跟著念！" + 紅框 | **B 隊輸**（當前） |
| 1-8 | 準備 | A 隊 | "換人準備..." | **B 隊輸**（前一輪） |
| ... | ... | ... | ... | ... |

### 使用情境

**情境 1**：裁判及時按下失敗
- A 隊在第 9-16 拍念錯
- 裁判在第 9-16 拍按下失敗
- 結果：A 隊輸，B 隊得分 ✓

**情境 2**：裁判反應稍慢
- A 隊在第 9-16 拍念錯
- 但裁判來不及，在下一輪（B 隊的準備階段，第 1-8 拍）才按下失敗
- 結果：系統自動判定為前一隊（A 隊）輸，B 隊得分 ✓

## 技術細節

### previousTeam 的初始值
- 初始設為 `'B'`，因為遊戲開始時 `currentTeam` 是 `'A'`
- 這樣確保在第一輪就算在準備階段按失敗，也能正確判定

### 換隊時機
- 每當 `currentBeat === 1 && phase === 'prepare'` 時觸發換隊
- 先記錄當前隊伍到 `previousTeam`
- 再切換 `currentTeam` 到下一隊

### 依賴項更新
- useEffect 的依賴項加入 `currentTeam`，確保換隊邏輯能正確執行

## 測試建議

1. **紅框顯示測試**：
   - 開始遊戲後，確認在第 9-16 拍能看到紅色框依序移動
   - 紅框應該完整框住動物圖片

2. **準備階段失敗判定測試**：
   - 場景：A 隊答題 → B 隊準備階段按失敗
   - 預期：A 隊輸（B 隊得分）
   
3. **遊戲階段失敗判定測試**：
   - 場景：A 隊答題階段按失敗
   - 預期：A 隊輸（B 隊得分）

## BPM 更新
- 所有關卡的 BPM 已更新為 195（用戶手動調整）
