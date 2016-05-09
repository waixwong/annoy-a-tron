/**
 * Created by wei on 5/9/16.
 */
var controller = require('./controller');
var unirest = require('unirest');

controller.hears(['hearthstone'], ['direct_message','ambient'], function (bot, message) {
    // start a conversation to handle this response.
    bot.startConversation(message, function (err, convo) {

        convo.ask('I heard Hearthstone! Do you want to search for a card? :flower_playing_cards:', [

            {
                pattern: bot.utterances.yes,
                callback: function (response, convo) {
                    convo.ask('Great! Which card do you want to take a look at?', askCard);
                    convo.next();
                }
            },
            {
                pattern: bot.utterances.no,
                callback: function (response, convo) {
                    convo.say('Alright I will shut up.');
                    // do something else...
                    convo.next();
                }
            },
            {
                default: true,
                callback: function (response, convo) {
                    // just repeat the question
                    convo.say("I don't understand you");
                    convo.next();
                }
            }
        ]);

    });

    askCard = function(response, convo) {
        var query = response.text;
        unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/"+query+'?collectible=1')
            .header("X-Mashape-Key", "VnaZ84zDSCmsheZOx6fxemZeyzmFp1RrmWTjsnHSZE1TEfbcX8")
            .end(function (result) {
                if (!result.error && result.statusCode == 200)
                {
                    var cards = result.body;
                    if (cards.length > 3) {
                        convo.say('Found more than 3 cards. Showing you the first 3');
                    }

                    var card = cards[0];
                    // make cards attachment
                    var reply =
                    {
                        'text': card.text,
                        'attachments': [
                            {
                                'title': card.name,
                                'text': card.flavor,
                                'color': '#7CD197',
                                'image_url': card.imgGold
                            }
                        ]
                    };

                    convo.say(reply);
                }
                else {
                    convo.say('No card found.');
                }

            });

        convo.next();
    };
});
