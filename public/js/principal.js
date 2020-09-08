jQuery(function () {
    let socket = io();

    $('#carregaModal').load('config.modal.html')

    socket.on('chat message', function (user, msg, data) {
        let paragrafo = (user == 'twoguederbot' ? '' +
                '<li class="animation-target" style="width:100%">' +
                    '<div class="msj macro">' +
                    '<div class="avatar"><i class="fab fa-twitch fa-3x"></i></div>' +
                        '<div class="text text-l">' +
                            '<p>'+ msg +'</p>' +
                            '<p><small>'+data+'</small></p>' +
                        '</div>' +
                    '</div>' +
                '</li>'
                :
                '<li class="animation-target" style="width:100%;">' +
                '<div class="msj-rta macro">' +
                    '<div class="text text-r">' +                        
                        '<p>'+ msg +'</p>' +
                        '<p class="d-flex justify-content-between">' +
                            '<strong>'+user+'</strong>' +
                            '<small>'+data+'</small>' +
                        '</p>' +
                    '</div>' +
                '<div class="avatar" style="padding:0px 0px 0px 10px !important"><i class="fab fa-twitch fa-3x text-primary"></i></div>' +                                
          '</li>');                
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