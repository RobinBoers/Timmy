// require the discord.js module
const Discord = require('discord.js');
const client = new Discord.Client();

// get tokens, prefix and other settings
const { botName, prefix, token, redditToken, nswfAllowed, AdminRole } = require('./config.json');


// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    console.log('Fabby is Ready to Roll!');
    // message.channel.send('Boop.');
});

// listen for messages
client.on('message', message => {
    console.log(message.author.username+": "+message.content);
    msg = message.content.toLowerCase();
    // console.log("Lowercase message: "+ msg);

    if (msg === prefix + `ping`) {
        var reply = "Pong.";
        console.log(botName+": "+reply);
        message.channel.send(reply);
    } 
    else if(msg === prefix + `beep`) {

        var reply = "Boop.";
        console.log(botName+": "+reply);
        message.channel.send(reply);

    }
    else if (msg === prefix + `stats`) {

        var reply = `
        Server name: ${message.guild.name}\n
        Total members: ${message.guild.memberCount}
        `;
        console.log(botName+": "+reply);
        message.channel.send(reply);

    }
    else if (msg === prefix + `user-info`) {

        var reply = `
        Your avatar:\n
        <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>\n
        Your username: ${message.author.username}\n
        Your ID: ${message.author.id}
        `;
        console.log(botName+": "+reply);
        message.channel.send(reply);

    }
    else if (msg === prefix + `clear`) {

        console.log("Deleting 100 messages.");

        message.channel.bulkDelete(100, true).catch(err => {
            console.error(err);
            var reply = "There was an error trying to delete messages in this channel!";
            console.log(botName+": "+reply);
            message.channel.send(reply);
        });

    }
    
    
    
    
});

// login to Discord with your app's token
client.login(token);
