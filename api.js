const request = require('request'),
      url = "https://api.twitch.tv/kraken/users/";

function retornaLogo(userId, client, callback) {
    request(
        {
            url : url + userId,
            headers : {
                "Client-ID" : client,
                "Accept": 'application/vnd.twitchtv.v5+json'
            }
        },
        function (error, response, body) {
            if(!error && response.statusCode == 200) {
                retorno = JSON.parse(body);
                callback(retorno["logo"]);
            } else {
                callback(null);
            }
        }
    );
}

module.exports = retornaLogo;