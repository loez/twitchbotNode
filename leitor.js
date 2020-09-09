const say = require('say');

//module.exports = say;

function falar(mensagem, velocidade = 1) {
    say.speak(mensagem, null, velocidade);
}

module.exports = falar;