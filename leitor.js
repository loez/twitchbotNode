const say = require('say');

//module.exports = say;

async function falar(mensagem, velocidade = 1) {
    await say.speak(mensagem, null, velocidade);
}

module.exports = falar;