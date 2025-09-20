---
title: "【網頁技術】身分驗證：JWT"
date: "2025-09-20T18:11:59+08:00"
draft: true
tags: ["網頁技術", "身分驗證", "JWT", ""]
categories: ["網頁技術"]
description: ""
---

## 前言

當前多數分散式系統與前後端分離架構中，一個輕量級的解決認證問題的方式之一。在網頁上，因為封包資料傳輸沒有狀態管理，把登入狀態丟在客戶端（Client）可以讓可能有多個服務的系統，都共用同一個登入狀態。

## 什麼是 JWT

JWT，全名 JSON Web Token，是一種基於 JSON 的開放標準（[RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519)）用於在各方之間安全地傳遞訊息。

JWT 具有以下三個部分組成：

1. Header（標頭）
    指定演算法與類型，例如：

    ```json
    {
        "alg": "HS256",
        "typ": "JWT"
    }
    ```

2. Payload（負載）
    包含使用者資訊與聲明（Claims），例如：

    ```json
    {
        "sub": "1234567890",
        "name": "username",
        "role": "admin",
        "exp": 1712345678
    }
    ```

3. Signature（簽章）
    使用密鑰對前兩部分進行簽名，用以驗證資料完整性與來源。

這三部分透過 Base64URL 編碼並以 `.` 分隔，組成完整的 JWT，例如：

```txt
Header.Payload.Signature
```
