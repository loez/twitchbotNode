const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bot = require('./bot');
const tts = require('./leitor');
const configuracao = require('./config.json');
const abrirnavegador = require('open');
const moment = require('moment');
const api = require('./api');
const gtts = require('node-gtts')('pt-br');


app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/'));

bot.connect();

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        bot.say(configuracao.Canal[0], msg);
    });
});

bot.on('chat', function (channel, user, message, self) {
    let data = moment().format('LT'),
        usuario = user["display-name"];

    api.retornaLogo(user['user-id'], configuracao["ClientID"], function (logo) {
        io.emit('chat message', usuario, message, data, logo, self,configuracao.LerMensagem);
    });
});

http.listen(3000, function () {
    console.log('Servidor rodando na porta:' + 3000);
});

abrirnavegador('http://localhost:3000');

//rota falsa
app.get('/nviews', function (req, res) {
    api.retornaDadosCanal(configuracao["ClientID"], function (retorno) {
        res.json(retorno);
        res.end();
    })
});

app.get('/hear', function (req, res) {
    res.set({'Content-Type': 'audio/mpeg'});
    gtts.stream(req.query.Mensagem).pipe(res);
})

exports.app = app;
exports.html = http;
exports.io = io;