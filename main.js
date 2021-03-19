// require the discord.js module
const Discord = require('discord.js');
const client = new Discord.Client();
const WS = require('./ws/ws')

// get tokens, prefix and other settings
const { botName, botID, prefix, token, redditToken, subredditName, nswfAllowed, AdminRole, endMessage } = require('./config.json');

var ws = new WS('123456', 5665, client)

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {

    // List servers the bot is connected to
    console.log("Connected to these Servers:")
    client.guilds.cache.forEach((guild) => {

        console.log(" - " + guild.name)

    });
    console.log('\n'+botName+' is Ready to Roll!'+endMessage);
    // message.channel.send('Boop.');

});

// listen for messages
client.on('message', message => {

    // // Set correct nickname
    // if (message.guild.members.cache.get(botID).hasPermission("MANAGE_NICKNAMES") && message.guild.members.cache.get(botID).hasPermission("CHANGE_NICKNAME")) {
    //     message.guild.members.cache.get(botID).setNickname(botName);
    // } else {
    //     message.channel.send("I dont have the permissons to change my nickname in this server.");
    // }

    if(message.author.bot) return;
    console.log(message.author.username+": "+message.content+endMessage);
    // msg = message.content.toLowerCase();
    msg = message.content;
    // console.log("Lowercase message: "+ msg);

    if (msg === prefix + `ping`) {
        var reply = "Pong.";
        console.log(botName+": "+reply+endMessage);
        message.channel.send(reply);
    } 
    else if(msg === prefix + `beep`) {

        var reply = "Boop.";
        console.log(botName+": "+reply+endMessage);
        message.channel.send(reply);

    }
    else if (msg === prefix + `serverinfo` || msg === prefix + `serverstats`) {

        var reply = `Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`;
        console.log(botName+": "+reply+endMessage);
        message.channel.send(reply);

        // List all channels
        console.log("\n"+botName+" has found these channels in this server:")

        message.guild.channels.cache.forEach((channel) => {
            console.log(` - ${channel.name} (${channel.type}) - ${channel.id}`)
        })
        
        console.log(endMessage)

    }
    else if (msg === prefix + `userinfo` || msg === prefix + `stats`) {

        const imageEmbed = new Discord.MessageEmbed().setImage(message.author.displayAvatarURL({ format: "jpg", dynamic: false }));
        message.channel.send(imageEmbed);

        var reply = `Your username: ${message.author.username}\nYour ID: \` ${message.author.id} \``;
        console.log(botName+": "+reply+endMessage);
        message.channel.send(reply);

    }
    else if (msg === prefix + `clear`) {

        console.log("Deleting 100 messages."+endMessage);

        message.channel.bulkDelete(100, true).catch(err => {
            console.error(err);
            var reply = "There was an error trying to delete messages in this channel!";
            console.log(botName+": "+reply+endMessage);
            message.channel.send(reply);
        });

    }
    else if (msg === prefix + `getReddit`) {

        // Using snoowrap to access reddit API
        var snoowrap = require('snoowrap');

        // Snoowrap config, logging into a burner account with username + password
        const r = new snoowrap({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0',
            clientId: 'wxF4146B4858Sg',
            clientSecret: redditToken,
            username: 'Sea-Box5852',
            password: 'Sea-Box5852'
        });

        // Get random submission (=post) from the subreddit configured in config.json
        post = r.getRandomSubmission(subredditName).then((post) => {

            var link = post.url;

            console.log(botName+": "+link+endMessage);
            message.channel.send(link);

        });
    }
    
});

// login to Discord with your app's token
client.login(token);
