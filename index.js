const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bot = require('./bot');
const tts = require('./leitor');
const configuracao = require('./config.json');
const abrirnavegador = require('open');


app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/'));

module.exports = app;

bot.connect();

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
       console.log(msg);
        bot.say(configuracao.Canal[0],msg);
    });
});


bot.on('chat', function (channel, user, message, self) {

    let mensagem = `${user["display-name"]} : ${message}`;

    if (configuracao["LerMensagem"] === true) {
        tts(mensagem,1.2);
    }

    io.emit('chat message', mensagem);
});

http.listen(3000, function () {
    console.log('Servidor rodando na porta:' + 3000);
});

abrirnavegador('http://localhost:3000');