const slackBot = require('slackbots');
const http = require('axios');

const bot = new slackBot({
    name: 'JokeBot',
    token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx'    //oAuth token 
});

//Welcome message
bot.on('start', () => {
    var params = {
        icon_emoji: ':black_joker:'
    };

    bot.postMessageToChannel('general', 'Joker welcomes you! Lets have some fun', params);  //post the message in the group "general"

});

//Message Handler
bot.on('message', (data) => {
    // console.log(data);
    if (data.type !== 'message') {    //Acknowledge only for message types
        return;
    }
    messageHandler(data.text);
});

var messageHandler = function (message) {
    if (message && message.includes(' chuck')) {
        chuckJokes();   //Generate chuck Norris Jokes
    } else if (message && message.includes(' yomama')) {
        yomamaJokes();  //Generate Yo Momma Jokes
    } else if (message && message.includes(' random')) {
        randomJoke();   //Generate a random Joke
    } else if (message && message.includes(' help')) {
        help();     //Ask for a help
    }
}
var chuckJokes = function () {
    http.get('http://api.icndb.com/jokes/random/').then(response => {
        var chuck = response.data.value.joke;
        var params = {
            icon_emoji: ':laughter:'
        };

        bot.postMessageToChannel('general', `Chuck Norris: ${chuck}`, params);
    });
}
var yomamaJokes = function () {
    http.get('https://api.yomomma.info/').then(response => {
        var chuck = response.data.joke;
        var params = {
            icon_emoji: ':laughter:'
        };

        bot.postMessageToChannel('general', `Yo Mama: ${chuck}`, params);
    });
}

var randomJoke = function () {
    var joke = Math.floor((Math.random() * 2) + 1);
    switch (joke) {
        case 1:
            chuckJokes();
            break;
        case 2:
            randomJoke();
            break;
        default:
            chuckJokes();
            break;
    }
}

var help = function () {
    var params = {
        icon_emoji: ':question:'
    };

    bot.postMessageToChannel('general', 'Type @Joker, "chuck"  or "yomama" or "random" to get a joke', params);
}

//Error Handler
bot.on('error', (error) => {
    console.log(error);
});
