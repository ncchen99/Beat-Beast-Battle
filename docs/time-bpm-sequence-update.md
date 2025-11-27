# 遊戲時間設定、BPM調整與動物序列邏輯更新

## 修改日期
2025-11-27 23:30

## 修改內容

### 1. 第一關與第二關：可設定答題時間 ✓

**需求**：
- 允許裁判設定每回合的秒數（預設 5 秒）。

**實現**：
- 在 Level 1 和 Level 2 介面中加入「秒數」輸入框。
- 將設定的秒數傳遞給計時器，實現動態調整。

### 2. 第三、四、五關：可設定 BPM 與播放速度 ✓

**需求**：
- 允許裁判設定 BPM（預設 195）。
- 音樂播放速度需根據 BPM 自動調整（`playbackRate = 設定BPM / 195`）。

**實現**：
- 在 Level 3, 4, 5 介面中加入「BPM」輸入框。
- 修改 `RhythmGrid` 組件，接收 `bpm` 參數。
- 根據 `bpm` 計算 `beatDuration` 和 `audio.playbackRate`。

### 3. 動物序列邏輯調整 ✓

**需求**：
- **Level 3 (動畫版)**：至少出現 **2組** 重複序列。
- **Level 4 (真實版)**：
  - 動物池限制為 **5種**（與動畫版相同：熊、鳥、雞、狗、豬）。
  - 至少出現 **1組** 重複序列。
- **Level 5 (真實版)**：
  - 動物池維持 **10種**。
  - 至少出現 **1組** 重複序列（原為不可重複）。

**實現**：
- 更新 `gameStore.ts` 中的 `generateSequenceWithAdjacentRepeats` 函數，支援 `minRepeats` 參數。
- 更新 `generateAnimalSequence` 函數，支援 `minRepeats` 和 `limitToAnimeAnimals` 參數。
- 更新各關卡的調用邏輯：
  - Level 3: `generateAnimalSequence(true, false, true, 2)`
  - Level 4: `generateAnimalSequence(true, true, true, 1, true)`
  - Level 5: `generateAnimalSequence(false, true, true, 1)`

## 測試建議

1. **時間設定測試**：
   - 在 Level 1/2 修改秒數（例如改為 3 秒），確認倒數計時變快。

2. **BPM 測試**：
   - 在 Level 3/4/5 修改 BPM（例如改為 100），確認音樂變慢且紅框移動速度變慢。

3. **動物序列測試**：
   - **Level 3**：觀察生成的序列，確認是否有至少兩組重複（如 豬豬...鳥鳥...）。
   - **Level 4**：確認只出現 5 種動物（熊鳥雞狗豬），且有至少一組重複。
   - **Level 5**：確認有出現重複的動物（不再是完全不重複）。

## 修改檔案列表
- `src/store/gameStore.ts`
- `src/components/game/RhythmGrid.tsx`
- `src/levels/Level1.tsx`
- `src/levels/Level2.tsx`
- `src/levels/Level3.tsx`
- `src/levels/Level4.tsx`
- `src/levels/Level5.tsx`
