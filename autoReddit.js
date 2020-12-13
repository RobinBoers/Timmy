const Discord = require('discord.js');
const Client = new Discord.Client();

const { botName, botID, prefix, token, redditToken, subredditName, nswfAllowed, redditChannel, AdminRole, endMessage } = require('./config.json');

// redditChannel overwrite for testing
// redditChannel = "775991341431521280";

Client.once('ready', () =>  {

    Client.channels.cache.get(redditChannel).send("AutoReddit Module is online.");

    setInterval(nsfw, 1000);

});

function nsfw() {
    var snoowrap = require('snoowrap');

    const r = new snoowrap({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0',
        clientId: 'wxF4146B4858Sg',
        clientSecret: redditToken,
        username: 'Sea-Box5852',
        password: 'Sea-Box5852'
    });

    post = r.getRandomSubmission(subredditName).then((post) => {
        var link = post.url;

        console.log(link);
        Client.channels.cache.get(redditChannel).send(link);
    });
}

Client.login(token);