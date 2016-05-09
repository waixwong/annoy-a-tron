/**
 * Created by wei on 4/27/16.
 */

require('dotenv').config({path: '../.env'});

var Botkit = require('botkit');
var request = require('request');
var unirest = require('unirest');



if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

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


require('./ambient.js');
