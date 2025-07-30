# Favicon 設置指南

## 目前狀況

✅ 已修復 `site.webmanifest` 檔案的 404 錯誤
✅ 創建了基本的 Web App Manifest

## 建議優化

為了提供更好的使用者體驗，建議您生成完整的 favicon 套件：

### 1. 使用線上工具生成 Favicon

推薦使用 [favicon.io](https://favicon.io/) 來生成完整的 favicon 套件：

1. 前往 https://favicon.io/
2. 選擇以下任一選項：

   - **From Text**: 使用文字生成（如 "T" 代表 ttymayor）
   - **From Image**: 上傳您的 logo 圖片
   - **From Emoji**: 使用 emoji 作為圖示

3. 下載生成的 zip 檔案

### 2. 替換現有檔案

將下載的檔案解壓縮後，您會得到：

```
android-chrome-192x192.png
android-chrome-512x512.png
apple-touch-icon.png
favicon-16x16.png
favicon-32x32.png
favicon.ico
site.webmanifest
```

請將這些檔案複製到 `/static/favicon_io/` 目錄，替換現有檔案。

### 3. 更新 manifest 檔案

如果您使用了新的圖示，請更新 `site.webmanifest` 中的 icons 陣列：

```json
{
  "icons": [
    {
      "src": "/favicon_io/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/favicon_io/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/favicon_io/apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png"
    },
    {
      "src": "/favicon_io/favicon-16x16.png",
      "sizes": "16x16",
      "type": "image/png"
    },
    {
      "src": "/favicon_io/favicon-32x32.png",
      "sizes": "32x32",
      "type": "image/png"
    }
  ]
}
```

### 4. 測試

1. 重新建置並部署您的網站
2. 檢查 `https://ttymayor.com/favicon_io/site.webmanifest` 是否正常載入
3. 使用瀏覽器開發者工具檢查是否有任何錯誤

## Web App Manifest 功能

您的網站現在支援：

- **漸進式網頁應用程式 (PWA)** 功能
- **安裝到主畫面** 功能
- **獨立顯示模式** 當作為 PWA 開啟時
- **品牌化** 的應用程式名稱和圖示

## 除錯提示

如果仍然遇到問題：

1. 檢查檔案權限
2. 確認伺服器正確配置 `.webmanifest` MIME 類型
3. 清除瀏覽器快取
4. 檢查 Hugo 建置輸出

---

**注意**: 目前的 manifest 檔案使用簡化設置，只包含現有的 favicon.ico 檔案。為了獲得最佳體驗，建議按照上述步驟生成完整的 favicon 套件。
