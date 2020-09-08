jQuery(function () {
    let socket = io();
    $('#carregaModal').load('config.modal.html')

    socket.on('chat message', function (msg) {
        let paragrafo = new $('<li>');
        paragrafo.addClass('list-group-item alinhamentomensagem');
        paragrafo.text(msg);
        $('#chatMensagem').append(paragrafo);
    });
    $('#inputMensagem').on("keydown",function (event){
       if(event.keyCode === 13){
           $('#btnEnviaMensagem').click();
       }
    });

    $('#btnEnviaMensagem').click(function (e) {
        let mensagem = $('#inputMensagem');

        if (mensagem.val() !== "") {
            socket.emit('chat message', mensagem.val());
            mensagem.val("");
        }
    });

    $('#btnchamamodal').click(function (){
        $('#modalConfig').modal('show');
    });
});