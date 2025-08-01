# ⏱ 12/100 Pomodoro Bookmarklet

Минималистичный Pomodoro-таймер, встроенный прямо в ваш браузер через bookmarklet. Работает в Safari, Chrome и других браузерах. Без установки, без расширений — просто нажми на закладку и работай по технике Pomodoro. Реализовано в рамках челленджа **"100 проектов"**.

## 📦 Возможности

-   Настраиваемая длительность работы и отдыха (по умолчанию 25/5 минут).
-   Всплывающее окошко с таймером поверх всех вкладок.
-   Уведомления при смене режима (работа / отдых).
-   Таймер можно переключить вручную кликом.
-   Стоп-кнопка появляется при наведении на таймер.
-   Сохраняет концентрацию без лишнего шума.

## 🚀 Установка

1. Скопируйте **минифицированный код из файла index.js** bookmarklet (см. ниже).
2. Откройте закладки браузера.
3. Создайте новую закладку.
4. В поле "URL" вставьте скопированный код.
5. Назовите её, например, `Pomodoro`.

## 🧠 Использование

1. Нажмите на закладку — появится модальное окно с вводом времени.
2. Укажите желаемую длительность работы и отдыха (по умолчанию 25 и 5 минут).
3. Нажмите **"Старт"**.
4. В правом нижнем углу появится таймер:
    - ⏳ показывает оставшееся время.
    - Клик по таймеру переключает фазу вручную (работа ↔ отдых).
    - При наведении появляется кнопка **⏹ Стоп**, которая останавливает и удаляет таймер.

## 🛑 Стоп таймера

-   Наведите курсор на таймер — появится кнопка "⏹".
-   Нажмите её, чтобы полностью остановить Pomodoro.

## 🛠 Технические детали

-   Всё на чистом JavaScript.
-   Работает без сохранения состояния при перезагрузке.
-   Таймер действует только на активной вкладке.
-   Нет сторонних зависимостей или подключения к интернету.

## 🔐 Безопасность

-   Bookmarklet работает **только в текущем DOM** — никаких серверов, трекеров или утечек данных.
-   Код полностью открытый и читаемый.

![Превью](./preview.mov)
