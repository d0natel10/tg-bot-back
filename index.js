
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const token = '6509416021:AAHdGegAKSns25J61prhpOrl6JiTBuQhC2M';

const webAppUrl = 'https://velvety-marshmallow-5800e6.netlify.app';

const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(express.json());
app.use(cors());

bot.on('message', async (msg) => {
 const chatId = msg.chat.id;
 const text = msg.text;

 if(text== '/start'){
    await bot.sendMessage(chatId, 'Для запуска приложения тыкни ниже', {
        reply_markup: {
        inline_keyboard: [
            [{text: 'start app', web_app: {url: webAppUrl}}]
        ]
        }
    })
 }
});

app.post('/web-data', async (req, res) => {
    const {queryId, products = []} = req.body;
    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Успешная покупка',
            input_message_content: {
                message_text: ` Поздравляю с покупкой, вы приобрели товар на сумму  ${products.map(item => item.title).join(', ')}`
            }
        })
        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
})

const PORT = 8000;

app.listen(PORT, () => console.log('server started on PORT ' + PORT))