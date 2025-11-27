# Level 3 錯誤修復與輸入框優化

## 修改日期
2025-11-27 23:50

## 修改內容

### 1. Level 3 白屏錯誤修復 ✓

**問題**：
- `Level3.tsx` 報錯 `ReferenceError: useRef is not defined`。
- 原因：在使用 `useRef` 時忘記從 React 導入。

**解決方案**：
- 在 `Level3.tsx` 的 import 語句中加入 `useRef`。

### 2. 輸入框體驗優化（Level 1-5） ✓

**需求**：
- 將所有數字輸入框（秒數、BPM）改為文字輸入框。
- 移除瀏覽器預設的數字調整按鈕（上下箭頭）。
- 允許用戶清空輸入框以便重新輸入（解決 "不能 back" 的問題）。
- 針對 iPad/移動端優化鍵盤顯示。

**實現**：
- 將 `input type="number"` 改為 `input type="text"`。
- 加入 `inputMode="numeric"` 屬性，確保在移動設備上彈出數字鍵盤。
- 使用本地 string state (`durationInput` / `bpmInput`) 來管理輸入框的值，允許暫時的空值或無效輸入。
- 在 `onChange` 事件中嘗試解析數字並更新實際的遊戲狀態（`duration` / `bpm`），只有當輸入為有效正整數時才更新。

**修改檔案**：
- `src/levels/Level1.tsx`
- `src/levels/Level2.tsx`
- `src/levels/Level3.tsx`
- `src/levels/Level4.tsx`
- `src/levels/Level5.tsx`

## 測試建議

1. **Level 3 載入測試**：
   - 進入第三關，確認不再出現白屏錯誤。

2. **輸入框測試（所有關卡）**：
   - 點擊秒數或 BPM 輸入框。
   - 嘗試使用 Backspace 刪除所有數字（應該變為空字串）。
   - 輸入新的數字，確認遊戲參數（倒數時間/BPM）有隨之更新。
   - 在 iPad/手機模擬模式下，確認點擊輸入框會彈出數字鍵盤。
