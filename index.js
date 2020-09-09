const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bot = require('./bot');
const tts = require('./leitor');
const configuracao = require('./config.json');
const abrirnavegador = require('open');
const moment = require('moment');
const api = require('./api');
const ClienteID = 'm2yrzkzgqq30hvgk24ng41smuucpsd';


app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/'));

bot.connect();

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
       console.log(msg);
        bot.say(configuracao.Canal[0],msg);
    });
});


bot.on('chat', function (channel, user, message, self) {

    let data = moment().format('LT'),  
        mensagem = `${message}`,
        usuario = `${user["display-name"]}`;

    if (configuracao["LerMensagem"] === true) {
        tts(mensagem,1.2);
    }

    api(user['user-id'], ClienteID, function(logo){
        io.emit('chat message', usuario, mensagem, data, logo);
    });
});

http.listen(3000, function () {
    console.log('Servidor rodando na porta:' + 3000);
});

abrirnavegador('http://localhost:3000');

exports.app = app;
exports.html = http;
exports.io = io;