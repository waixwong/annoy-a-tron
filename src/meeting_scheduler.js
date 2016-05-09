/**
 * Created by wei on 5/9/16.
 */
require('./botkit-middleware-witai');

var controller = require('./controller');

controller.hears(['set up a meeting'], ['direct_message', 'direct_mention'], function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.say('Heard ya');
    });

    bot.startPrivateConversation(message, function (err, dm) {
        dm.say('I will help you set up a meeting! :relaxed:');
        dm.say('What is this meeting about ?');
    });
});
