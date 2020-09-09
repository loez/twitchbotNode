const request = require('request'),
    configuracao = require('./config.json'),
    url = "https://api.twitch.tv/kraken/users/";

exports.retornaDadosCanal = function retornaDadosCanal(client, callback) {
    request({
            url: 'https://api.twitch.tv/helix/streams?user_login=' + configuracao.Canal[0].replace('#', ''),
            headers: {
                'client-id': client,
                'Authorization': 'Bearer ' + configuracao.SenhaBearer

            }
        },
        function (erro, resposta, corpo) {
            if (!erro && resposta.statusCode == 200) {
                resultado = JSON.parse(corpo);
                callback(resultado)
            } else {
                callback(erro + resposta + corpo);
            }
        }
    );
}

exports.retornaLogo = function retornaLogo(userId, client, callback) {
    request(
        {
            url: url + userId,
            headers: {
                "Client-ID": client,
                "Accept": 'application/vnd.twitchtv.v5+json'
            }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                retorno = JSON.parse(body);
                callback(retorno["logo"]);
            } else {
                callback(null);
            }
        }
    );
}
