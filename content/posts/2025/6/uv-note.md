---
title: '超快速 Python 套件管理工具：uv 你用過嗎？-- uv 學習筆記'
date: '2025-06-09T20:00:51+08:00'
draft: false
---

> [!TIP]
> 後續會繼續更新，其他常用指令，如果我想寫的話（？

## 特色簡介

1. 你甚至可以取代 `pip`, `pip-tools`, `pipx`, `poetry`, `pyenv`, `twine`, `virtualenv`
2. 快，超快，比 `pip` 快 10-100 倍
3. 使用 Rust 撰寫，但你不需要安裝它，就可以透過 `curl` 或者 `pip` 體驗
4. 內建虛擬環境建立，你無須自行在專案建立虛擬環境來執行專案

還有很多值得探索，畢竟**真的很快**。

## 基礎使用

### 安裝 uv

1. 直接安裝在系統上
    ```bash
    # On macOS and Linux.
    curl -LsSf https://astral.sh/uv/install.sh | sh
    ```
    ```bash
    # On Windows.
    powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
    ```
2. 使用 PyPI
    ```bash
    # With pip.
    pip install uv
    ```
    ```bash
    # Or pipx.
    pipx install uv
    ```

### 初始化專案使用 uv

```bash
uv init example
```

或是在專案目錄下

```bash
uv init --app
```

### 安裝套件

有兩種方式：`uv add` 與 `uv pip install`

你可以完全平替 pip install 指令，也就是可以這樣安裝套件

```bash
uv add flask
```

uv 就會幫你寫好 `pyproject.toml` 跟 `uv.lock`。

### 執行專案

`uv run` 會自動生成 .venv，並使用其虛擬環境來執行你的專案。

```bash
uv run <欲執行檔案>
```

剛開始初始化的專案會幫你/妳寫一個 `main.py` 可以使用下面指令。

```bash
uv run main.py
```

### 心得

快，還有超快，你也無須再自己更新 `requirements.txt` 或是遇到版本問題而錯亂。
