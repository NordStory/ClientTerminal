const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { bot, AVITO_URL, WAREHOUSE_URL, BOT_OPTIONS } = require('../config/bot');
const { validateInventoryId } = require('../middleware/validation');
const logger = require('../utils/logger');

// Middleware для парсинга данных формы
const Parser = bodyParser.urlencoded({ extended: false });

// Маршрут для обработки запроса от терминала
router.post('/', Parser, validateInventoryId, async (req, res) => {
    try {
        const inventoryId = req.body.InventoryID;
        
        logger.info('Получен запрос на поиск товара', { inventoryId });
        
        // Создаем inline клавиатуру для Telegram-бота
        const inlineKeyboard = [
            [{ 
                text: 'Товар на Авито', 
                url: `${AVITO_URL}${inventoryId}` 
            }],
            [{ 
                text: 'Товар на складе', 
                url: `${WAREHOUSE_URL}${inventoryId}&search=${inventoryId}&sort=%5B%5D&table=Inventory` 
            }]
        ];

        // Формируем сообщение для отправки
        const message = `Клиент ждёт товар \nInventory ID: *${inventoryId}*`;
        
        // Отправляем сообщение в Telegram
        await bot.sendMessage(process.env.IDGROUP, message, {
            ...BOT_OPTIONS,
            reply_markup: JSON.stringify({ inline_keyboard: inlineKeyboard })
        });

        logger.info('Уведомление отправлено в Telegram', { inventoryId, groupId: process.env.IDGROUP });

        // Перенаправляем пользователя обратно на главную страницу
        res.redirect('.');
        
    } catch (error) {
        logger.error('Ошибка при обработке запроса', { error: error.message, stack: error.stack });
        res.status(500).send('Внутренняя ошибка сервера');
    }
});

module.exports = router;
