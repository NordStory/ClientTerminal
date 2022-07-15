const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const Parser = bodyParser.urlencoded({ extended: false, });
const bot = new TelegramBot(process.env.TGTOKEN, {polling: true});
const option = {
    "parse_mode": "Markdown"
};

let PORT = 1500;
app.listen(PORT, function (err) {
    if (err) console.log("Error in server setup")
    console.log(`http://localhost:${PORT}`);
});

app.use(express.static('./public'));

app.post('/bot', Parser, (req, res) => {
    if (!req.body) return res.sendStatus(400)
    console.log(`${req.body.InventoryID}`);
    bot.sendMessage(process.env.IDGROUP, `Клиент ждёт товар \nInvetory ID: *${req.body.InventoryID}*`,option);
    res.redirect('.')
});