# WP111-FinalProject

[111-1] Web Programming Final (Group 110) 名稱：台北旅遊行程規劃服務

Demo 影片連結：https://www.youtube.com/watch?v=u73USDYZA78
---
> 組員
* b08703045 財金四 鄧德齊
* b08b01043 心理四 魏逸豪
* b08208047 地理四 顏廷龍
---
> 描述這個服務在做什麼：
* 此網站使用利用「臺灣景點資料庫」幫忙使用者規劃行程，使用者在註冊/登入後可以選擇景點規劃或是查找的功能。目前支援台北市景點。
---
> 規劃功能
* 進入後有景點地圖概覽及即時天氣資訊
* 根據使用者填入旅遊偏好與出發位置，自動規劃出五套符合使用者偏好及時間規劃的行程，使用者可隨自己喜愛從中挑選行程，並瀏覽相關資訊。
* 查找功能：經由關鍵字、所在行政區或是景點分類(e.g.:溫泉or小吃等)，回傳查詢功能給使用者。
* 小功能：儲存景點至最愛、網站bug回報、更改使用者密碼、開發者頁面
---
> 程式碼架構/使用技術介紹
* frontend
* component：header、cardlist、filter、modal、地圖圖層來源(layers、source)...
* container：hook、主要畫面、list、Render畫面相關
* backend
* api：負責openrouterservice的呼叫
* models：資料庫
* resolvers：
* api_caller：界接API
* Mutation、Query、Subscription
* index.js
* server.js
* schema.graphql
* …
---
> 使用與參考之框架/模組/原始碼
* 前端：React.js、Ant Design、Apollo、universal-cookie 、Mapbox
* 後端：Node.js、Graphql、mongodb、OpenRouteService API、CWB API、bcrypt、jsonwebtoken
---
> 每位組員之負責項目
* 魏逸豪：景點資料清洗、處理、處理、行程演算法、加入最愛的前端處理、景點搜尋、佈署
* 鄧德齊：使用者註冊、登入、行程演算法、加入最愛的後端處理、景點搜尋、問題回報
* 顏廷龍：所有與地圖相關API的服務、地理資料景點時間距離爬蟲、前端UX/UI、景點搜尋
