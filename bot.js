const tmi = require('tmi.js');
const configuracoes = require('./config.json');
const indexexport = require('./index');


const opts = {
    identity:{
        username: configuracoes.Usuario,
        password: configuracoes.SenhaOATH
    },
    channels: configuracoes.Canal
}

module.exports = cliente = new tmi.client(opts);


cliente.on('connected',onConnectedHandler);

function onDesconnectedHandler(cliente) {
    console.log('Desconectado' + cliente);
    if(cliente.includes('Invalid')){
       indexexport.io.emit('Erro',true);
    }
    this.connect();
}
cliente.on('disconnected',onDesconnectedHandler)

function onConnectedHandler(addr,port){
    console.log('Conectado na porta: ' + port);
}