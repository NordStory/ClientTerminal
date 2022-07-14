const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let PORT = 1500;
app.listen(PORT, function (err) {
    if (err) console.log("Error in server setup")
    console.log(`http://localhost:${PORT}`);
});

const Parser = bodyParser.urlencoded({ extended: false, });

app.use(express.static('./public'));


app.post('/bot', Parser, (req, res) => {
    if (!req.body) return res.sendStatus(400)
    console.log(`${req.body.InventoryID}`);
    res.redirect('.')
});