#!/bin/bash

# Скрипт запуска терминала самообслуживания

echo "Запуск терминала самообслуживания..."

# Проверяем наличие .env файла
if [ ! -f .env ]; then
    echo "Файл .env не найден!"
    echo "Создаю файл .env на основе env.example"
    cp env.example .env
    echo "Добавьте необходимые переменные окружения:"
    echo "   - TGTOKEN (токен Telegram-бота)"
    echo "   - IDGROUP (ID группы Telegram)"
    echo "   - PORT (порт сервера, по умолчанию 1500)"
    exit 1
fi

# Проверяем наличие node_modules
if [ ! -d "node_modules" ]; then
    echo "Устанавливаем зависимости..."
    npm install
fi

# Запускаем сервер
echo "Запуск сервера..."
npm start
