---
title: '如何防範 CSRF'
date: '2025-06-13T15:37:54+08:00'
draft: false
tags: ['資安', 'CSRF', '網路安全', 'Web Security']
categories: ['資訊安全']
---

# 什麼是 CSRF？

CSRF（Cross Site Request Forgery），翻成中文叫做**跨站請求偽造**。

我們可以拆成兩個名詞來理解，分別是 `跨站` 以及 `請求偽造`。

1. **跨站**：是發生漏洞的地點，並不在目標網站上。通常是由有心人士開發了一個網站，並利用了你瀏覽器上的 Cookie 進行濫用。
2. **請求偽造**：有心人士利用你在惡意網站填的資料，進行修改，並成功請求。

簡單來說，CSRF 攻擊就是利用使用者已登入的身分，在使用者不知情的情況下執行惡意操作。

# CSRF 攻擊流程

1. 使用者登入信任的網站 A，並獲得認證 Cookie
2. 攻擊者誘導使用者訪問惡意網站 B
3. 惡意網站 B 向網站 A 發送請求，瀏覽器自動帶上 Cookie
4. 網站 A 驗證 Cookie 有效，執行了惡意操作

# 具體例子

## 銀行轉帳攻擊

假設你登入了網路銀行，這時收到一封看似無害的郵件，點擊連結後進入了惡意網站。該網站可能包含這樣的代碼：

```html
<img src="https://bank.com/transfer?to=attacker&amount=10000" />
```

由於你仍處於登入狀態，瀏覽器會自動發送包含認證 Cookie 的請求，導致資金被轉移。

## 修改密碼攻擊

最危險的例子之一：修改密碼。

假設你真的很有可能在不知情的情況下，不小心在惡意網站中填寫敏感資料。

那駭客有很大機率會掌握你的密碼跟帳號，並且在你發送修改密碼的同時，將密碼修改為駭客的密碼，如此一來，你就很有可能登入不了你的帳號，因為密碼已被串改。

## 社群媒體攻擊

攻擊者可能讓你在不知情的情況下：
- 發布惡意貼文
- 刪除重要內容
- 修改個人資料
- 發送垃圾訊息給好友

# 如何防範？

首先我們得了解達成 CSRF 的必要條件：

1. 有一個可以觸發腳本的網站
2. 目標網站只以單一條件來驗證身分
3. 驗證字符可預測或過時的加密、雜湊方式

## 身為工程師你可以...

1. CSRF Token   
    在請求任何敏感訊息時，加以驗證。如：添加隨機 Token 在表單上。  
    駭客就無法僅憑無 Token 的表單進行請求。

    ```html
    <form action="/transfer" method="POST">
        <input type="hidden" name="csrf_token" value="abc123xyz789">
        <input type="text" name="amount">
        <button type="submit">轉帳</button>
    </form>
    ```

2. 檢查 Referer Header   
    檢查請求來源。
    這樣就算駭客搭建了惡意網站，也成功發送請求，但因為不是合法的請求來源最後會被擋下來。

3. SameSite Cookie 屬性   
    設定 Cookie 的 SameSite 屬性為 `Strict` 或 `Lax`：

    ```javascript
    Set-Cookie: sessionid=abc123; SameSite=Strict; Secure; HttpOnly
    ```

4. 雙重送出 Cookie (Double Submit Cookie)   
    將 CSRF Token 同時放在 Cookie 和請求參數中，伺服器驗證兩者是否一致。

5. 自訂 Header 驗證   
    要求前端在 AJAX 請求中加入自訂 Header，因為跨域請求無法設定自訂 Header。

## 身為使用者你可以...

1. 及時登出   
登出。因為登出時，你的 Cookie 登入訊息會被正常的刪除。駭客也無法獲取你的 Cookie。

2. 避免同時開啟多個網站   
不要在已登入重要網站的瀏覽器中隨意點擊不明連結。

3. 使用不同瀏覽器   
將重要網站（如網路銀行）和一般瀏覽分開在不同瀏覽器中進行。

4. 保持瀏覽器更新   
使用最新版本的瀏覽器，因為新版本通常有更好的安全防護機制。

5. 啟用雙因子驗證 (2FA)   
即使 CSRF 攻擊成功，雙因子驗證也能提供額外的保護層。

6. 謹慎點擊連結   
特別是來自郵件、社群媒體或不信任來源的連結。

# 檢測 CSRF 漏洞

作為開發者，你可以使用以下工具檢測 CSRF 漏洞：

1. **OWASP ZAP** - 免費的安全測試工具
2. **Burp Suite** - 專業的 Web 應用程式安全測試工具
3. **CSRFTester** - 專門針對 CSRF 的測試工具

# 總結

CSRF 攻擊利用了網站對使用者瀏覽器的信任，通過社會工程學讓使用者在不知情的情況下執行惡意操作。防範 CSRF 需要從技術和使用習慣兩個層面入手：

- **技術層面**：實施 CSRF Token、檢查 Referer、設定 SameSite Cookie 等
- **使用者層面**：養成良好的上網習慣，及時登出，謹慎點擊連結

只有多重防護才能有效抵禦 CSRF 攻擊，保護使用者的資料安全。

# 參考資料

1. [零基礎資安系列（一）-認識 CSRF（Cross Site Request Forgery）](https://tech-blog.cymetrics.io/posts/jo/zerobased-cross-site-request-forgery/)
2. [[資安系列] 防禦CSRF攻擊的五種方法](https://gcdeng.com/series/web-security-series/five-ways-to-defend-against-CSRF-attacks)
3. [什麼是跨站點請求偽造？](https://www.cloudflare.com/zh-tw/learning/security/threats/cross-site-request-forgery/)
4. [什麼是 CSRF 攻擊？如何防範？](https://www.explainthis.io/zh-hant/swe/what-is-csrf)
5. [OWASP Cross-Site Request Forgery Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
