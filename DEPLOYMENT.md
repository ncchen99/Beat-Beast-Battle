# Vercel 部署指南

本專案是使用 Vite 構建的 React 應用，非常適合部署到 Vercel。以下是幾種部署方式：

## 方法一：使用 Vercel CLI (推薦)

這是最快的方式，不需要離開終端機。

1. **安裝 Vercel CLI** (如果尚未安裝):
   ```bash
   npm install -g vercel
   ```

2. **登入 Vercel**:
   ```bash
   vercel login
   ```
   按照提示選擇登入方式（通常是 GitHub）。

3. **部署專案**:
   在專案根目錄 (`c:\Users\ncc\Desktop\SFF\project`) 執行：
   ```bash
   vercel
   ```
   - Set up and deploy? **Yes**
   - Which scope? **(選擇你的帳號)**
   - Link to existing project? **No**
   - Project name? **(按 Enter 使用預設值)**
   - In which directory is your code located? **./** (按 Enter)
   - Want to modify these settings? **No**

   等待幾秒鐘，部署完成後會獲得一個 Production URL (例如 `https://service-learning-is-fun.vercel.app`)。

4. **部署生產環境** (當你準備好發布正式版時):
   ```bash
   vercel --prod
   ```

## 方法二：使用 GitHub 整合

如果你將程式碼推送到 GitHub，Vercel 可以自動部署。

1. **推送到 GitHub**:
   - 在 GitHub 建立一個新的 Repository。
   - 將本地程式碼推送到 GitHub:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin <你的 GitHub Repo URL>
     git push -u origin main
     ```

2. **在 Vercel 導入專案**:
   - 前往 [Vercel Dashboard](https://vercel.com/dashboard)。
   - 點擊 **"Add New..."** -> **"Project"**。
   - 選擇 **"Import Git Repository"** 並連結你的 GitHub 帳號。
   - 找到剛才推送的專案，點擊 **"Import"**。
   - 在 "Configure Project" 頁面，Vercel 會自動偵測這是 Vite 專案，直接點擊 **"Deploy"**。

## 常見問題

- **建置失敗？**
  請先在本地執行 `npm run build` 確認沒有錯誤。如果有 TypeScript 錯誤（如未使用的變數），請先修復它們。

- **環境變數？**
  本專案目前不需要特殊的環境變數。
