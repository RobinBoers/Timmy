const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')

const { botName, botID, prefix, token, redditToken, subredditName, nswfAllowed, AdminRole, endMessage } = require('../config.json');
const { unwatchFile } = require('fs');
const { ENGINE_METHOD_DH } = require('constants');

class WebSocket {

    constructor(token, port, client) {
        this.token = token;
        this,port = port;
        this.client = client;

        this.app = express()
        this.app.engine('hbs', hbs({
            extname: 'hbs',
            defaultLayout: 'layout',
            layoutsDir: __dirname + '/layouts'
        }))
        this.app.set('views', path.join(__dirname, 'views'))
        this.app.set('view engine', 'hbs')
        this.app.use(express.static(path.join(__dirname, 'public')))
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())

        this.registerRoots();

        this.server = this.app.listen(port, () => {
            console.log(`Websocket listening on port ${this.server.address().port}`)
        })
    }

    checkToken(_token) {
        return (_token == this.token)
    }

    registerRoots() {

        this.app.get('/', (req, res) => {

            var _token = req.query.token

            if(!this.checkToken(_token)) {
                res.render('error', { title: 'login failed', errtype: 'INVALID TOKEN'})
                return;
            }

            res.render('openpanel', { 
                title: 'loading',
                token: _token,
            })

        })

        // http://localhost:port?token=123456
        this.app.get('/adminPanel', (req, res) => {
            var _token = req.query.token
            var channelID = req.query.channelID
            var serverID = req.query.serverID

            console.log ("Connection at admin panel, with serverID "+serverID+" and channelID "+channelID+endMessage)

            if(!this.checkToken(_token)) {
                res.render('error', { title: 'login failed', errtype: 'INVALID TOKEN', sol: '<a href="?token='+_token+'>Login</a>'})
                return;
            }

            if(serverID !== "" && channelID !== "") {

                res.render('index', { 
                    title: 'timmy',
                    token: _token,
                    guild: serverID,
                    channel: channelID
                })

            } else if(channelID === "") {

                var channelList = []
                this.client.guilds.cache.get(serverID).channels.cache
                .filter(c => c.type == "text")
                .forEach(c => {
                    channelList.push({ id: c.id, name : c.name})
                })

                res.render('selectchannel', { 
                    title: 'timmy',
                    token: _token,
                    guild: serverID,
                    channelList
                })

            }
            else {
                var serverList = []
                this.client.guilds.cache.forEach(s => {
                    serverList.push({ id: s.id, name : s.name})
                })

                res.render('selectserver', { 
                    title: 'timmy',
                    token: _token,
                    serverList
                })
            }
            
        })

        this.app.post('/sendMessage', (req, res) => {

            var _token = req.body.token
            var text = req.body.text
            var channelID = req.body.channel
            var serverID = req.body.guild

            if(!this.checkToken(_token)) {
                res.render('error', { title: 'login failed', errtype: 'INVALID TOKEN'})
                return;
            }

            var channel = this.client.guilds.cache.get(serverID).channels.cache.get(channelID)

            if(channel) {

                var reply = text;
                console.log(botName+": "+reply+endMessage);
                channel.send(reply);

            }

        })

        this.app.post('/runAutoReddit', (req, res) => {

            var _token = req.body.token
            var interval = req.body.interval
            var subreddit = req.body.sub
            var channelID = req.body.channel
            var serverID = req.body.guild

            if(!this.checkToken(_token)) {
                res.render('error', { title: 'login failed', errtype: 'INVALID TOKEN'})
                return;
            }

            var channel = this.client.guilds.cache.get(serverID).channels.cache.get(channelID)

            function autoReddit() {
                var snoowrap = require('snoowrap');
            
                const r = new snoowrap({
                    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0',
                    clientId: 'wxF4146B4858Sg',
                    clientSecret: redditToken,
                    username: 'Sea-Box5852',
                    password: 'Sea-Box5852'
                });

                if(channel) {
            
                    var post = r.getRandomSubmission(subreddit).then((post) => {
                        var link = post.url;
                        var reply = link;

                        console.log(botName+": "+reply+endMessage);
                        channel.send(reply);

                    });
                }
            }

            setInterval(autoReddit, interval);
        })

    }

}

module.exports= WebSocket