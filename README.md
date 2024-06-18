# Запуск
1. Установить NodeJS версии 18.16.0
2. Установить зависимости (`npm install` в корне репозитория)
3. Создать в корне репозитория файл `.env` и заполнить его по аналогии с файлом `example.env`
    3.1. `CONVEYS_BACKEND_URL` - адрес, на котором развёрнут backend приложения, [ссылка на репозиторий с кодом бэкэнда](https://github.com/LightScrool/conveys_server).
    3.2. `YP_API_CLIENT_ID` - ClientID для авторизации из приложения Яндекс ID
4. Запустить NextJS приложение (режим разработки - `npm run dev`, сборка приложения - `npm run buid`, запуск собранного приложения - `npm run start`)
