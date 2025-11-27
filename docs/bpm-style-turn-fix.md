# BPM 輸入框樣式優化與隊伍輪替邏輯修復

## 修改日期
2025-11-27 23:40

## 修改內容

### 1. BPM 輸入框樣式優化 ✓

**需求**：
- 將 BPM 輸入框改為純文字輸入框樣式，移除上下調整的箭頭按鈕。

**實現**：
- 在 `src/index.css` 中加入 CSS 規則，隱藏 `input[type=number]` 的預設 spinner。
- 支援 Chrome, Safari, Edge, Opera (`-webkit-appearance: none`) 和 Firefox (`-moz-appearance: textfield`)。

### 2. 隊伍輪替邏輯修復 ✓

**問題**：
- 隊伍顯示出現隨機跳動（A/B 快速切換），而非穩定的 A -> B -> A -> B 輪替。
- 原因：`useEffect` 在第 1 拍期間因為依賴項更新而多次觸發，導致多次執行換隊邏輯。

**解決方案**：
- 使用 `useRef` (`lastSwitchBeatRef`) 來追踪每一輪的換隊狀態。
- 邏輯：
  - 當 `currentBeat === 1` 且 `lastSwitchBeatRef.current !== 1` 時，執行換隊並將 ref 設為 1。
  - 當 `currentBeat !== 1` 時，將 ref 重置為 0。
- 這樣確保每一輪（每 16 拍）只會嚴格執行一次換隊。

**修改檔案**：
- `src/index.css`
- `src/levels/Level3.tsx`
- `src/levels/Level4.tsx`
- `src/levels/Level5.tsx`

## 測試建議

1. **BPM 輸入框**：
   - 確認 BPM 輸入框不再顯示上下箭頭，看起來像普通文字框。
   - 確認仍可輸入數字。

2. **隊伍輪替**：
   - 開始遊戲，觀察「輪到：X隊」的顯示。
   - 確認每次「換人準備...」階段開始時，隊伍只會切換一次（A -> B，然後 B -> A）。
   - 確認不會出現閃爍或跳過某隊的情況。
