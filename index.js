const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const Parser = bodyParser.urlencoded({ extended: false, });
const bot = new TelegramBot(process.env.TGTOKEN, { polling: true });
const avitoUrl = "https://www.avito.ru/moskva_i_mo?cd=1&q=inventory+id+";

let PORT = 1500;
app.listen(PORT, function (err) {
    if (err) console.log("Error in server setup")
    console.log(`http://localhost:${PORT}`);
});

app.use(express.static('./public'));

app.post('/bot', Parser, (req, res) => {
    if (!req.body) return res.sendStatus(400)
    let id = req.body.InventoryID;
    let option = {
        "parse_mode": "Markdown",
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Поиск на Авито', url: `${avitoUrl + req.body.InventoryID}` }],
                [{ text: 'Поиск на складе', url: `https://www.appsheet.com/start/#appName=Items-6068356&group=%5B%5D&row=${id}&search=${id}&sort=%5B%5D&table=Inventory` }]
            ]
        })
    };
    bot.sendMessage(process.env.IDGROUP, `Клиент ждёт товар \nInvetory ID: *${req.body.InventoryID}*`, option);
    res.redirect('.');
});