var voltron = require('./bot.js');

voltron.controller.on('bot_channel_join', introduce);

function introduce(bot, message) {
    txt = "Hi :grimacing: I'm Marin. I'll *_respond_* to the following commands:\n" +
        "> ` Under Development` - No, I'll not respond to your commands. :wave:";
    bot.reply(message, txt);
}
