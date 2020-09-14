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
        bot.say(configuracao.Canal[0], msg);
    });
});

api.retornaDadosCanal(ClienteID, function (retorno) {
    io.emit('view', retorno["data"].length > 0 ? retorno["data"][0]["viewer_count"] : 'Offline');
})

setInterval(function () {
    api.retornaDadosCanal(ClienteID, function (retorno) {
        io.emit('view', retorno["data"].length > 0 ? retorno["data"][0]["viewer_count"] : 'Offline');
    })
}, 60000)

bot.on('chat', function (channel, user, message, self) {
    let data = moment().format('LT'),
        usuario = user["display-name"];

    if (configuracao["LerMensagem"] === true) {
        tts(message, 1.2);
    }

    api.retornaLogo(user['user-id'], ClienteID, function (logo) {
        io.emit('chat message', usuario, message, data, logo, self);
    });
});

http.listen(3000, function () {
    console.log('Servidor rodando na porta:' + 3000);
});

// app.get('/webhook',function (req,res){
//
// });

abrirnavegador('http://localhost:3000');

exports.app = app;
exports.html = http;
exports.io = io;