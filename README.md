# twitchbotNode
Um Bot feito em Node JS para acompanhamento do Chat da sua stream via Web Página dedicada

Enquanto ainda não implementado campo para preenchimento das configurações,use o arquivo config.json para passar as mesmas.

Necessário criar um arquivo na raiz chamado "config.json" com as seguintes informações:
{
  "LerMensagem" : true,
  "Canal" : ["canal a acompanhar"],
  "Usuario" : "username do bot",
  "SenhaOATH" : "oauth:accesstoken"
}
