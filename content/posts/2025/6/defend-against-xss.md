---
title: '如何防範 XSS'
date: '2025-06-17T06:36:32+08:00'
tags: ['資安', 'XSS', '網路安全', 'Web Security']
categories: ['資訊安全']
---

# 什麼是 XSS？

XSS（Cross-Site Scripting），中文稱為**跨站腳本攻擊**。這是一種網頁安全漏洞，允許攻擊者將惡意腳本注入到網頁中。

## XSS 攻擊類型

### 1. 反射型 XSS (Reflected)

最常見的 XSS 類型，攻擊腳本直接反射在 URL 中：

```javascript
https://example.com/search?q=<script>alert('attacked')</script>
```

### 2. 儲存型 XSS (Stored)

惡意代碼被存儲在伺服器中，例如：

- 留言板內容
- 個人資料
- 社交媒體貼文

下面就是常見的範例，也常常拿這個來戳漏洞

```html
<script>alert(1);</script>
```

### 3. DOM 型 XSS

透過修改頁面的 DOM 環境來進行攻擊。但也要誘使使用者點擊 URL 來觸發

```html
<img src=# onerror="alert('attacked')">
```

## 防範措施

### 1. 輸入驗證與過濾   

至於到底是前端還是後端，建議是全端都需要做輸入驗證，只要有 input tag 就應該要檢查是否出現漏洞。

```javascript
// 使用 escapeHTML 函數
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function(match) {
        const escape = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return escape[match];
    });
}
```

### 2. 設置 CSP

在 HTTP Header 中加入內容安全策略（CSP）的標頭：

```http
Content-Security-Policy: default-src 'self'
```

### 3. 使用 HttpOnly Cookie

```javascript
Set-Cookie: sessionId=123; HttpOnly; Secure
```

### 4. 輸出編碼

始終對不可信數據進行編碼：
- HTML 編碼
- JavaScript 編碼
- URL 編碼
- CSS 編碼

## 實際預防步驟

1. 使用現代框架的內建防護
2. 實施輸入驗證
3. 應用 CSP 政策
4. 定期安全稽核
5. 保持軟體更新

## 結論

XSS 攻擊雖然常見，但通過正確的防護措施可以有效預防。重要的是要建立多層防禦機制，並保持警惕。

1. **永遠不要信任用戶輸入**
2. **使用白名單而非黑名單過濾**
3. **實施適當的輸出編碼**
4. **配置嚴格的 CSP 策略**
5. **定期進行安全測試**

## 參考資料

1. [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
2. [PortSwigger Web Security Academy - XSS](https://portswigger.net/web-security/cross-site-scripting)
3. [MDN - Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
4. [OWASP Top 10 - A03:2021 Injection](https://owasp.org/Top10/A03_2021-Injection/)