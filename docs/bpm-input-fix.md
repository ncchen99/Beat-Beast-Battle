# BPM 與秒數輸入框邏輯修復

## 修改日期
2025-11-28 00:00

## 修改內容

### 1. BPM 輸入報錯修復 (Level 3, 4, 5) ✓

**問題**：
- 當用戶在 BPM 輸入框中輸入數字時（例如想輸入 "100"），輸入第一個數字 "1" 時會立即觸發狀態更新。
- `bpm` 變為 1，導致 `playbackRate` 計算為 `1/195 ≈ 0.005`。
- 瀏覽器報錯 `Uncaught NotSupportedError: Failed to set the 'playbackRate' property...`，因為 `playbackRate` 太小。

**解決方案**：
- **延遲更新**：`onChange` 事件僅更新輸入框的顯示字串 (`bpmInput`)，不更新實際的 `bpm` 狀態。
- **Blur 更新**：新增 `onBlur` 事件處理函數 `handleBpmBlur`。當輸入框失去焦點時，才解析數字並更新 `bpm`。
- **範圍限制**：在 `handleBpmBlur` 中，將 BPM 限制在 **60 - 300** 之間。如果輸入無效（如空字串），則回復預設值 195。

### 2. 秒數輸入邏輯統一 (Level 1, 2) ✓

**改進**：
- 雖然秒數輸入不會導致報錯，但為了統一使用者體驗，也採用了相同的 `onBlur` 更新機制。
- **範圍限制**：將秒數限制在 **1 - 60** 之間。

**修改檔案**：
- `src/levels/Level1.tsx`
- `src/levels/Level2.tsx`
- `src/levels/Level3.tsx`
- `src/levels/Level4.tsx`
- `src/levels/Level5.tsx`

## 測試建議

1. **BPM 輸入測試**：
   - 進入 Level 3/4/5。
   - 點擊 BPM 輸入框，刪除所有數字（變為空）。
   - 輸入 "1" -> "10" -> "100"。確認在輸入過程中不會報錯。
   - 點擊輸入框外部（觸發 blur），確認 BPM 更新為 100，且音樂速度改變。
   - 嘗試輸入 "5"（小於 60），blur 後應自動修正為 60。
   - 嘗試輸入 "500"（大於 300），blur 後應自動修正為 300。

2. **秒數輸入測試**：
   - 進入 Level 1/2。
   - 嘗試輸入 "0" 或 "100"，blur 後應自動修正為 1 或 60。
