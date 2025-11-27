# 素材資源清單

## 📁 資料夾結構

```
project/
├── audios/
│   └── music.mp3           (2.6 MB) - 背景音樂
├── font/
│   └── Cubic_11.woff2      (390 KB) - 俐方體11號字體
└── images/
    ├── anime/              動畫版動物圖片(第三關使用)
    │   ├── bear.png        (535 KB) - 熊
    │   ├── bird.png        (516 KB) - 鳥
    │   ├── chicken.png     (528 KB) - 雞
    │   ├── dog.png         (517 KB) - 狗
    │   └── pig.png         (517 KB) - 豬
    └── real/               真實版動物圖片(第四、五關使用)
        ├── bear.png        (447 KB) - 熊
        ├── bird.png        (399 KB) - 鳥
        ├── chicken.png     (293 KB) - 雞
        ├── cow.png         (483 KB) - 牛
        ├── dog.png         (483 KB) - 狗
        ├── horse.png       (372 KB) - 馬
        ├── pig.png         (380 KB) - 豬
        ├── rabbit.png      (349 KB) - 兔子
        ├── sheep.png       (411 KB) - 羊
        ├── snake.png       (308 KB) - 蛇
        └── tiger.png       (611 KB) - 老虎
```

## ✅ 整合狀態

### 字體 (Font)
- [x] `Cubic_11.woff2` - 已整合至 `src/index.css` 使用 `@font-face`
- [x] Tailwind 設定已更新為使用 "Cubic 11" 字體

### 圖片 (Images)
- [x] 動畫版動物 (5張) - 第三關使用
  - 檔案位於: `/images/anime/*.png`
  - 渲染路徑: `RhythmGrid` 元件自動載入
- [x] 真實版動物 (11張) - 第四、五關使用
  - 檔案位於: `/images/real/*.png`
  - 渲染路徑: `RhythmGrid` 元件自動載入

### 音檔 (Audio)
- [ ] `music.mp3` - 背景音樂 (BPM=91)
  - 目前位置: `/audios/music.mp3`
  - **待整合**: 需加入 BGM 播放功能

## 📝 動物名稱對應表

| 英文檔名  | 中文名稱 | 可用版本     |
|----------|---------|------------|
| bear     | 熊      | 動畫 + 真實 |
| bird     | 鳥      | 動畫 + 真實 |
| chicken  | 雞      | 動畫 + 真實 |
| cow      | 牛      | 僅真實     |
| dog      | 狗      | 動畫 + 真實 |
| horse    | 馬      | 僅真實     |
| pig      | 豬      | 動畫 + 真實 |
| rabbit   | 兔子    | 僅真實     |
| sheep    | 羊      | 僅真實     |
| snake    | 蛇      | 僅真實     |
| tiger    | 老虎    | 僅真實     |

## 🔧 技術實作
1. 字體透過 CSS `@font-face` 載入
2. 圖片路徑動態生成: `/images/${folder}/${animalKey}.png`
3. 動物名稱透過 `ANIMAL_NAMES` 對應表轉換為中文顯示
4. 第三關使用動畫版 (5種動物,可重複)
5. 第四關使用真實版 (11種動物,可重複)
6. 第五關使用真實版 (11種動物,不重複)

## ⚠️ 待辦事項
- [ ] 整合背景音樂播放功能
- [ ] 測試所有圖片是否正確載入
- [ ] 確認字體在各瀏覽器的顯示效果
