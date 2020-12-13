const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')

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

        // http://localhost:port?token=123456
        this.app.get('/', (req, res) => {
            var _token = req.query.token
            var serverID = req.query.serverID

            console.log(serverID)

            if(!this.checkToken(_token)) {
                res.render('error', { title: 'ERROR', errtype: 'INVALID TOKEN'})
                return;
            }

            if(serverID !== "") {

                var channelList = []
                this.client.guilds.cache.get(serverID).channels.cache
                .filter(c => c.type == "text")
                .forEach(c => {
                    channelList.push({ id: c.id, name : c.name})
                })

                res.render('index', { 
                    title: 'FabbyJS',
                    token: _token,
                    guild: serverID,
                    channelList
                })

            } else {
                var serverList = []
                this.client.guilds.cache.forEach(s => {
                    serverList.push({ id: s.id, name : s.name})
                })

                res.render('selectserver', { 
                    title: 'FabbyJS',
                    token: _token,
                    serverList
                })
            }
            
        })

        this.app.post('/sendMessage', (req, res) => {

            var _token = req.body.token
            var text = req.body.text
            var channelID = req.body.channelID
            var serverID = req.body.guild

            if(!this.checkToken(_token)) {
                res.render('error', { title: 'ERROR', errtype: 'INVALID TOKEN'})
                return;
            }

            var channel = this.client.guilds.cache.get(serverID).channels.cache.get(channelID)

            if(channel) {
                channel.send(text);
            }

        })

    }

}

module.exports= WebSocket