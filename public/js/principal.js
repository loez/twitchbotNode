jQuery(function () {
    let socket = io();
    $('#carregaModal').load('config.modal.html')

    socket.on('chat message', function (user, msg, data, logo,self) {
        let paragrafo = (self ? '' +
                '<li class="animation-target" style="width:100%">' +
                    '<div class="msj macro">' +
                    '<div class="avatar">' + (logo != null ? '<img class="logo-user rounded-circle" src="'+ logo +'" />' : '<i class="fab fa-twitch fa-3x">') + '</i></div>' +
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
                '<div class="avatar" style="padding:0px 0px 0px 10px !important">' + (logo != null ? '<img class="logo-user rounded-circle" src="'+ logo +'" />' : '<i class="fab fa-twitch fa-3x text-primary"></i>') + '</div>' +                                
          '</li>');                
        $('#chatMensagem').append(paragrafo);
    });

    socket.on('Erro', function (ocorreu) {
        //  tela de login a ser implementada
        //  toastr.options.onHidden = function () {
        //     window.location = "/login.html";
        // }
        mostraToastr("Erro ao Logar na Twitch", "Erro no Login", ToastrEnum.error);
    });

    $('.toast').toast('show');

    $('#inputMensagem').on("keydown", function (event) {
        if (event.keyCode === 13) {
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

    $('#btnchamamodal').click(function () {
        $('#modalConfig').modal('show');
    });

    let url = 'https://id.twitch.tv/oauth2/authorize' +
        '?client_id=m2yrzkzgqq30hvgk24ng41smuucpsd' +
        '&redirect_uri=http://localhost:3000' +
        '&response_type=token' +
        '&scope=viewing_activity_read';

});