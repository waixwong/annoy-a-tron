var request = require('request');

var controller = require('./controller');

controller.on('bot_channel_join', introduce);
controller.on('user_channel_join', welcome);

function introduce(bot, message) {
    txt = "Hi :grimacing: I'm Marin. I'll *_respond_* to the following commands:\n" +
        "> ` Under Development` - No, I'll not respond to your commands. :wave:";
    bot.reply(message, txt);
}

function welcome(bot, message) {
    bot.replyWithTyping(message, {
        text: "Hello <@" + message.user + ">  Welcome!!",
        username: "Wei Wang",
        icon_emoji: ":heart_eyes:"
    });
}

controller.hears(['hello', 'hi'], ['direct_mention'], function (bot, message) {
    bot.replyWithTyping(message, 'Hello.');
});

controller.hears(['hello', 'hi'], ['direct_message'], function (bot, message) {
    bot.replyWithTyping(message, 'Hello.');
    bot.replyWithTyping(message, 'It\'s nice to talk to you directly.');
});

// tell a joke
controller.hears(['joke'], ['direct_message', 'direct_mention'], function (bot, message) {
    request('http://api.icndb.com/jokes/random', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var joke = JSON.parse(body).value.joke;
            bot.replyWithTyping(message, joke);
        }
        else {
            bot.replyWithTyping(message, 'No jokes today.');
        }
    });
});

controller.hears(['cool'], ['ambient', 'direct_message'], function (bot, message) {
    bot.replyWithTyping(message, {
        text: "Cool beans!",
        username: "marin",
        icon_url: "https://s-media-cache-ak0.pinimg.com/736x/8f/4d/74/8f4d74b4ce40a8a30ee95bf142be8650.jpg"
    });
});

controller.hears(['awesome'], ['ambient', 'direct_message'], function (bot, message) {
    bot.replyWithTyping(message, {
        text: "Awesome sauce!",
        username: "marin",
        icon_url: "http://brainfoodtv.com/site/wp-content/uploads/2013/09/awesome_sauce_by_goblinworkshop-d61aykm.jpg"
    });
});

controller.hears(['help'], ['direct_message', 'direct_mention'], introduce);

controller.on(['direct_mention'], function (bot, message) {
    bot.replyWithTyping(message, 'Here!:raising_hand:');
});

controller.hears(['marin'], ['ambient'], function (bot, message) {
    bot.replyWithTyping(message, 'Here!:raising_hand:');
});
