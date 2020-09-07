const say = require('say');

//module.exports = say;

function falar(mensagem,velocidade = 1){
 say.speak(mensagem,'Microsoft Daniel Desktop',velocidade);
}
module.exports = falar;