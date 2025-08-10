const logger = require('../utils/logger');

// Middleware для обработки ошибок
const errorHandler = (error, req, res, next) => {
    logger.error('Ошибка сервера', { 
        error: error.message, 
        stack: error.stack,
        url: req.originalUrl,
        method: req.method
    });
    
    // Определяем тип ошибки и отправляем соответствующий ответ
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Ошибка валидации',
            message: error.message
        });
    }
    
    if (error.name === 'UnauthorizedError') {
        return res.status(401).json({
            error: 'Неавторизованный доступ',
            message: 'Требуется авторизация'
        });
    }
    
    // По умолчанию отправляем 500 ошибку
    res.status(500).json({
        error: 'Внутренняя ошибка сервера',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Что-то пошло не так'
    });
};

module.exports = errorHandler;
