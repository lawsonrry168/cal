# VitaPure 純萃 — 補健品多功能網站

繁體中文補健品品牌示範網站，純靜態 HTML / CSS / JavaScript，無需建置工具。

## 預覽方式

在專案目錄啟動本機伺服器後，開啟瀏覽器：

```bash
# Python 3
python3 -m http.server 8080

# 或 npx
npx serve .
```

然後訪問 http://localhost:8080

## 網站架構

| 頁面 | 檔案 | 功能 |
|------|------|------|
| 首頁 | `index.html` | 品牌介紹、熱銷產品、最新文章 |
| 產品目錄 | `products.html` | 分類篩選、關鍵字搜尋 |
| 產品詳情 | `product.html?id=1` | 成分、用法、分頁說明 |
| 健康測驗 | `guide.html` | 5 題問卷，個人化產品推薦 |
| 營養百科 | `nutrition.html` | 營養素表格與搜尋 |
| 保健專欄 | `blog.html` | 文章列表與分類 |
| 文章內頁 | `blog-post.html?id=1` | 完整文章閱讀 |
| 關於我們 | `about.html` | 品牌故事、認證、里程碑 |
| 聯絡我們 | `contact.html` | 諮詢表單 |
| 常見問題 | `faq.html` | 手風琴式 FAQ |
| 購物車 | `cart.html` | localStorage 購物車、運費計算 |

## 目錄結構

```
├── index.html
├── products.html
├── product.html
├── guide.html
├── nutrition.html
├── blog.html
├── blog-post.html
├── about.html
├── contact.html
├── faq.html
├── cart.html
├── css/style.css
└── js/
    ├── data.js    # 產品、文章、FAQ 等資料
    └── app.js     # 購物車、導覽、共用 UI
```

## 主要功能

- **購物車**：使用 `localStorage` 持久化，全站購物車數量同步
- **產品篩選**：依類別（維生素、魚油、蛋白質等）與關鍵字搜尋
- **健康測驗**：依回答推薦產品組合，可一鍵加入購物車
- **響應式設計**：支援手機與桌面瀏覽

## 免責聲明

本網站為示範用途，產品與健康資訊不能取代專業醫療建議。
