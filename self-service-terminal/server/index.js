const express = require('express');
const path = require('path');
require('dotenv').config();

// Импорт middleware и утилит
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

// Инициализация Express приложения
const app = express();

// Настройка порта
const PORT = process.env.PORT || 1500;

// Middleware для статических файлов
app.use(express.static(path.join(__dirname, '../public')));

// Подключение маршрутов
const botRoutes = require('./routes/bot');
app.use('/bot', botRoutes);

// Роут для главной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Роуты для HTML страниц
app.get('/site', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/site.html'));
});

app.get('/contract', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/contract.html'));
});

app.get('/repair-form', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/repair-form.html'));
});

// Обработка ошибок 404
app.use('*', (req, res) => {
    logger.warn('Запрошена несуществующая страница', { url: req.originalUrl });
    res.status(404).send('Страница не найдена');
});

// Middleware для обработки ошибок (должен быть последним)
app.use(errorHandler);

// Запуск сервера
app.listen(PORT, (err) => {
    if (err) {
        logger.error('Ошибка при запуске сервера', { error: err.message });
        return;
    }
    logger.info('Сервер успешно запущен', { port: PORT });
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    console.log(`📱 Telegram-бот активен`);
    console.log(`🌐 Статические файлы обслуживаются из папки public`);
});