const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Конфигурация Telegram-бота
const bot = new TelegramBot(process.env.TGTOKEN, { 
    polling: true 
});

// Константы для URL
const AVITO_URL = "https://www.avito.ru/moskva_i_mo?cd=1&q=inventory+id+";
const WAREHOUSE_URL = "https://www.appsheet.com/start/#appName=Items-6068356&group=%5B%5D&row=";

// Настройки для сообщений бота
const BOT_OPTIONS = {
    parse_mode: "Markdown"
};

module.exports = {
    bot,
    AVITO_URL,
    WAREHOUSE_URL,
    BOT_OPTIONS
};
