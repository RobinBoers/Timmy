# Timmy
Timmy is a bot that can pull images from reddit at a interval. It is using my AutoReddit script,<br>and has a custom control panel on a local server.
I built it using Express, discord.js, the Reddit API and snoowrap.

The bot also has some basic commands. I have listed them here:

- Ping & Beep: these commands are to check if the bot is online.
- Userinfo: display userinfo like username, id and avatar.
- Serverstats: display server stats like servername and membercount.
- Clear: prune the chat, it deletes 100 messages max.
- GetReddit: get content from reddit.

## Settings to configure
The config file has various settings to configure, like the prefix, the botname, token, reddittoken and some other things.<br>
Some settings are not used by this bot, but are just in all my bots.

This is what every setting does. Most of them speak for themselves

- botName: the name of your bot. the bot will automaticly set its nickname to whatever you put here.
- botID: the ID of your bot. you can get this by rightclicking on your bot, and choosing "Copy ID"
- prefix: used as prefix for commands
- token: your bots token. never show anyone your token!
- redditToken: the token used for the reddit api.
- subredditName: the default subreddit used.
- redditChannel: the default channel used by AutoReddit
- enMessage: a visuale thing for logs to see where messages end (see console)
