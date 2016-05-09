/**
 * Created by wei on 5/9/16.
 */

// Remove this line in production.
require('dotenv').config({path: '../.env'});

var Botkit = require('botkit');

var controller = Botkit.slackbot({
    debug: false
});

controller.spawn({
    token: process.env.token
}).startRTM(function (err) {
    if (err) {
        throw new Error(err);
    }
});

module.exports = controller;

// Loading modules:
require('./doodle');
require('./hearthstone');

// todo: integrate with wit.ai
require('./meeting_scheduler');


