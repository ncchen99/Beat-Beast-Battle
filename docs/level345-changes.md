# 第3、4、5關修改總結

## 修改內容

### 1. BPM 設定
- **修改前**: BPM = 91
- **修改後**: BPM = 182
- **修改位置**: `src/components/game/RhythmGrid.tsx`

### 2. 拍子記數邏輯
- **修改前**: 24拍循環（8拍準備 + 8拍遊戲 + 8拍緩衝）
- **修改後**: 16拍循環（8拍換人準備 + 8拍開始跟著念）
- **說明**: 
  - 拍子 1-8: 換人和準備時間
  - 拍子 9-16: 開始！跟著念！
  - 16拍後自動重新開始新一輪，並生成新的8張照片

### 3. 圖片重複邏輯（第3、4關）
- **修改前**: 隨機選擇動物，有機會重複但不保證
- **修改後**: 確保序列中一定會有相鄰重複的動物
- **實現方式**: 新增 `generateSequenceWithAdjacentRepeats` 函數，強制在序列中創建至少一組相鄰重複
- **影響關卡**: Level3（動畫版）、Level4（真實照片）

### 4. 框的顯示
- **修改前**: "開始跟著念"階段顯示紅色框（.red-frame）
- **修改後**: "開始跟著念"階段顯示金黃色框（.animal-frame）
- **新增 CSS 類別**: `.animal-frame` - 金黃色邊框 (#FFD700)

### 5. 動物名稱顯示
- **修改前**: 圖片下方顯示動物名稱
- **修改後**: 完全移除動物名稱標籤
- **原因**: 這是一個說動物的挑戰，不應該顯示答案

### 6. 換隊邏輯
- **修改前**: 
  - 手動點擊「換隊」按鈕切換隊伍
  - 有「成功」和「失敗」兩個判定按鈕
- **修改後**: 
  - 每16拍自動換隊（A → B → A → B）
  - 每次換隊時自動生成新的8張照片
  - 移除「換隊」和「成功」按鈕，只保留「失敗」按鈕
  - 按下「失敗」時，另一隊獲勝

### 7. 刪除老虎
- **修改前**: 動物池包含 'tiger'（老虎）
- **修改後**: 從動物池中移除老虎
- **原因**: 老虎是兩個字的動物名稱（老虎），會不好念
- **影響**: 真實照片動物池從11種變成10種

## 修改的檔案列表

1. **src/store/gameStore.ts**
   - 刪除 'tiger' 從 REAL_ANIMALS 和 ANIMAL_NAMES
   - 將 '兔子' 改為 '兔'
   - 新增 `generateSequenceWithAdjacentRepeats` 函數
   - 更新 `generateAnimalSequence` 函數簽名，增加 `ensureAdjacent` 參數

2. **src/components/game/RhythmGrid.tsx**
   - BPM 從 91 改為 182
   - 節奏邏輯從 24拍 改為 16拍循環
   - 移除 'buffer' 階段
   - 移除動物名稱標籤元素
   - 框的 className 從 'red-frame' 改為 'animal-frame'
   - 更新階段提示文字

3. **src/index.css**
   - 新增 `.animal-frame` 樣式（金黃色邊框）
   - 保留 `.red-frame` 以備其他關卡使用

4. **src/levels/Level3.tsx**
   - 使用 `generateAnimalSequence(true, false, true)` 確保相鄰重複
   - 新增自動換隊邏輯（監聽 currentBeat === 1）
   - 移除 `handleSuccess` 和 `handleSwitchTeam` 函數
   - 移除「換隊」和「成功」按鈕
   - 更新 BPM 說明為 182

5. **src/levels/Level4.tsx**
   - 使用 `generateAnimalSequence(true, true, true)` 確保相鄰重複
   - 新增自動換隊邏輯
   - 移除「換隊」和「成功」按鈕
   - 更新 BPM 說明為 182

6. **src/levels/Level5.tsx**
   - 保持不可重複特性：`generateAnimalSequence(false, true)`
   - 新增自動換隊邏輯
   - 移除「換隊」和「成功」按鈕
   - 更新 BPM 說明為 182

## 遊戲流程（以第3關為例）

1. 玩家點擊「開始」
2. 拍子 1-8: 顯示「換人準備...」，當前隊伍準備
3. 拍子 9-16: 顯示「開始！跟著念！」，金黃色框依序指示8個動物
4. 玩家需要跟著框念出對應動物名稱
5. 16拍結束後：
   - 自動生成新的8張照片（確保有相鄰重複）
   - 自動切換到下一隊
   - 重新開始第1拍
6. 如果當前隊伍念錯，裁判按下「失敗」，另一隊獲勝

## 注意事項

- CSS 的 @tailwind 和 @apply 警告是正常的，這是 Tailwind CSS 的特性
- tiger.png 圖片檔案仍存在於專案中，但不會被使用
- 所有三個關卡（3、4、5）現在都使用相同的 182 BPM
- 第5關維持「不可重複」的特性，與第3、4關不同
