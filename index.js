const express = require('express')
const app = express()
const Telegraf = require('telegraf')
const {bot_token, port, id} = require('./config')

app.use(require('helmet')())

const bot = new Telegraf(bot_token)

app.set('port', process.env.PORT || port)
bot.start((ctx) => ctx.reply('Welcome'))

app.use(bot.webhookCallback(`/${bot_token}`))
bot.telegram.setWebhook(`https://telegram-nfc.herokuapp.com/${bot_token}`||`https://8a56230c.ngrok.io/${bot_token}`)

app.get(`/${bot_token}`, async (req,res)=> {
    if (req.query.message) {
        // send the message to a numberquery with bot.
        try {
        await    bot.telegram.sendMessage(id, req.query.message)    
        res.send('Enviado')
        } catch (error) {
            res.send(error)    
        }
    }else {
        res.send('miss one param: either the auth code or the message')
    }
})

app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
})