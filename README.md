# Service Learning is Fun (服學好好玩)

這是一個互動式的網頁遊戲，旨在讓服務學習變得更有趣！遊戲包含五個關卡，結合了反應力、節奏感和記憶力挑戰。

## 🎮 遊戲關卡

### Level 1: 暖身題 (Warm-up)
- **規則**：照樣造句。
- **機制**：兩隊輪流回答，裁判可設定每回合倒數時間（預設 5 秒）。
- **目標**：快速正確地辨識動物。

### Level 2: 基礎題 (Basic)
- **規則**：照樣造句，但是必須接續前一對的下半句作為開頭。
- **機制**：與第一關類似，但可能包含更多變數。裁判可設定每回合倒數時間。

### Level 3: 說動物挑戰 (Animal Challenge - Anime)
- **規則**：跟著節奏紅框移動，念出對應的動物名稱。
- **特色**：使用可愛的動畫版動物圖片。
- **設定**：
  - 可調整 BPM（預設 195），音樂速度會隨之改變。
  - 動物序列保證至少有 **2組** 重複（如：豬豬...鳥鳥）。

### Level 4: 進階挑戰 (Advanced Challenge - Real Photos)
- **規則**：跟著節奏念出真實動物照片的名稱。
- **特色**：使用真實動物照片，但限制為與動畫版相同的 5 種動物（熊、鳥、雞、狗、豬）。
- **設定**：
  - 可調整 BPM。
  - 動物序列保證至少有 **1組** 重複。

### Level 5: 終極挑戰 (Ultimate Challenge)
- **規則**：最高難度的節奏挑戰。
- **特色**：使用 10 種真實動物照片。
- **設定**：
  - 可調整 BPM。
  - 動物序列保證至少有 **1組** 重複。

## 🛠️ 技術棧

- **核心框架**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **建置工具**: [Vite](https://vitejs.dev/)
- **樣式庫**: [Tailwind CSS](https://tailwindcss.com/) (配合像素風格設計)
- **狀態管理**: [Zustand](https://github.com/pmndrs/zustand)
- **字體**: Cubic 11 (像素風格字體)

## 🚀 安裝與執行

### 前置需求
- Node.js (建議 v16 以上)
- npm 或 yarn

### 安裝依賴
```bash
npm install
```

### 啟動開發伺服器
```bash
npm run dev
```
啟動後，請在瀏覽器中開啟 `http://localhost:5173`。

### 建置生產版本
```bash
npm run build
```

## ⚙️ 裁判控制功能

- **時間設定**：在 Level 1 & 2，裁判可以點擊標題下方的秒數輸入框，輸入自定義的倒數時間（1-60秒）。
- **BPM 設定**：在 Level 3, 4, 5，裁判可以點擊 BPM 輸入框，輸入自定義的速度（60-300 BPM）。音樂和紅框速度會即時同步。
- **輸入框優化**：所有數值輸入框皆支援點擊編輯，輸入時暫停更新，離開焦點（Blur）後自動套用並修正至合法範圍。

## 📦 部署 (Vercel)

本專案已準備好部署至 Vercel。

1. 安裝 Vercel CLI: `npm i -g vercel`
2. 登入: `vercel login`
3. 部署: `vercel`

或者將專案推送到 GitHub，並在 Vercel 官網導入專案即可自動部署。

## 📝 專案結構

```
project/
├── public/         # 靜態資源 (圖片、音樂、字體)
├── src/
│   ├── components/     # 共用組件 (Timer, RhythmGrid, Layout)
│   ├── levels/         # 各關卡邏輯 (Level1 - Level5)
│   ├── store/          # 全局狀態管理 (gameStore)
│   └── index.css       # 全局樣式與 Tailwind 設定
└── ...
```
