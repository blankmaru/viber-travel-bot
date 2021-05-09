require('dotenv').config();

const ViberBot = require('viber-bot');
const BotEvents = require('viber-bot').Events,
const express = require('express');
const app = express();

if (!process.env.BOT_TOKEN) {
    console.log('Could not find bot account token key.');
    return;
}

if (!process.env.EXPOSE_URL) {
    console.log('Could not find exposing url');
    return;
}

const bot = new ViberBot({
    authToken: process.env.BOT_TOKEN,
    name: "Czech Travel Bot",
    avatar: "https://www.tullyluxurytravel.com/wp-content/uploads/2019/11/czech-republic-aspect-ratio-2500x1400.jpg"
});

bot.on(BotEvents.SUBSCRIBED, response => {
    response.send(new TextMessage(`Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me anything.`));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
    bot.setWebhook(`${process.env.EXPOSE_URL}/viber/webhook`).catch(error => {
      console.log('Can not set webhook on following server. Is it running?');
      console.error(error);
      process.exit(1);
    });
  });