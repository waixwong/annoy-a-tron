/**
 * Created by wei on 5/9/16.
 */

// Remove this line in production.
//require('dotenv').config({path: '../.env'});

var Botkit = require('botkit');

// Expect a SLACK_TOKEN environment variable
var slackToken = process.env.SLACK_TOKEN;
if (!slackToken) {
  console.error('SLACK_TOKEN is required!');
  process.exit(1);
}

var controller = Botkit.slackbot(
    {
        debug: false
    }
);
var bot = controller.spawn({
  token: slackToken
});

bot.startRTM(function (err, bot, payload) {
  if (err) {
    throw new Error('Could not connect to Slack');
  }
});

module.exports = controller;

// Loading modules:
require('./doodle');
require('./hearthstone');

// todo: integrate with wit.ai
require('./meeting_scheduler');
