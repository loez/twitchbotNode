jQuery(function () {
    let socket = io();

    socket.on('chat message', function (msg) {
        let paragrafo = new $('<li>');
        paragrafo.addClass('list-group-item alinhamentomensagem');
        paragrafo.text(msg);
        $('#chatMensagem').append(paragrafo);
    });

    $('#btnEnviaMensagem').click(function (e) {
        let mensagem = $('#inputMensagem')
        if (mensagem.val() !== "") {

            socket.emit('chat message', mensagem.val());

            let paragrafo = new $('<li>');
            paragrafo.addClass('list-group-item alinhamentomensagem');
            paragrafo.text('Você : ' + mensagem.val());
            $('#chatMensagem').append(paragrafo);

            mensagem.val("");
        }
    });
});