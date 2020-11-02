jQuery(function () {
    let canal,
        mensagensLeitura = [],
        audioPlayer = $('#audioPlayer'),
        urlLeitura ='';
    let socket = io();
    $('#carregaModal').load('config.modal.html');
    $("#barraRolagem").overlayScrollbars({overflowBehavior: {x: 'hidden', y: 'scroll'}});
    $('#barraRolagemUsuarios').overlayScrollbars({});

    audioPlayer.on('ended',function (){
        mensagensLeitura.shift();
        if(mensagensLeitura.length > 0){
            audioPlayer.attr('src',mensagensLeitura[0]);
            audioPlayer[0].play();
        }
    });

    socket.on('chat message', function (user, msg, data, logo, self, lermensagem) {

        if (lermensagem) {
            if(mensagensLeitura.length <=0){
                urlLeitura = encodeURI('/hear?Mensagem=' + msg);
                mensagensLeitura.push(urlLeitura);
                audioPlayer.attr('src', mensagensLeitura[0]);
                audioPlayer[0].play();
            }else{
                urlLeitura = encodeURI('/hear?Mensagem=' + msg);
                mensagensLeitura.push(urlLeitura);
            }
        }

        let paragrafo = (self ? '' +
            '<li class="animation-target" style="width:100%">' +
            '<div class="msj macro">' +
            '<div class="avatar">' + (logo != null ? '<img class="logo-user rounded-circle" alt="logo" src="' + logo + '" />' : '<i class="fab fa-twitch fa-3x">') + '</i></div>' +
            '<div class="text text-l">' +
            '<p>' + msg + '</p>' +
            '<p><small>' + data + '</small></p>' +
            '</div>' +
            '</div>' +
            '</li>'
            :
            '<li class="animation-target" style="width:100%;">' +
            '<div class="msj-rta macro">' +
            '<div class="text text-r">' +
            '<p>' + msg + '</p>' +
            '<p class="d-flex justify-content-between">' +
            '<strong>' + user + '</strong>' +
            '<small>' + data + '</small>' +
            '</p>' +
            '</div>' +
            '<div class="avatar" style="padding:0 0 0 10px !important">' + (logo != null ? '<img class="logo-user rounded-circle" alt="logo" src="' + logo + '" />' : '<i class="fab fa-twitch fa-3x text-primary"></i>') + '</div>' +
            '</li>');
        $('#chatMensagem').append(paragrafo);
        $("#barraRolagem").overlayScrollbars().scroll({x: "0%", y: "100%"});
    });
    socket.on('view', function (qtdview) {
        let status = $('.status');
        qtdview === 'Offline' ? status.removeClass('online').removeClass('fa-user').addClass('offline').addClass('fa-user-slash').find('.badge').addClass('d-none').end() : status.removeClass('offline').removeClass('fa-user-slash').addClass('online').addClass('fa-user').find('.badge').removeClass('d-none').html(qtdview).end();
    });
    socket.on('Erro', function () {
        //  tela de login a ser implementada
        //  toastr.options.onHidden = function () {
        //     window.location = "/login.html";
        // }
        mostraToastr("Erro ao Logar na Twitch", "Erro no Login", ToastrEnum.error);
    });

    $('#inputMensagem').on("keydown", function (event) {
        if (event.keyCode === 13) {
            $('#btnEnviaMensagem').click();
        }
    });

    $('#btnEnviaMensagem').click(function () {
        let mensagem = $('#inputMensagem');

        if (mensagem.val() !== "") {
            socket.emit('chat message', mensagem.val());
            mensagem.val("");
        }
    });

    $('#btnchamamodal').click(function () {
        $('#modalConfig').modal('show');
    });

    $('.btn-users').on('click', function () {
        $('.card-users').toggleClass('show');
        retornaqtdViews();
    });

    setInterval(retornaqtdViews, 30000);

    retornaqtdViews();

    function retornaqtdViews() {

        retornaDadosAjax('/nviews', null)
            .then((retorno) => {

                let qtdview = retorno["data"].length > 0 ? retorno["data"][0]["viewer_count"] : 'Offline';
                qtdview === 'Offline' ? $('.status').removeClass('online').removeClass('fa-user').addClass('offline').addClass('fa-user-slash').find('.badge').addClass('d-none').end() : $('.status').removeClass('offline').removeClass('fa-user-slash').addClass('online').addClass('fa-user').find('.badge').removeClass('d-none').html(qtdview).end();

                if (retorno["data"].length > 0) {
                    if ($('#usuariosChat').hasClass('show')) {
                        canal = retorno["data"][0]["user_name"]
                        retornaDadosAjax('https://tmi.twitch.tv/group/user/' + canal.toLowerCase() + '/chatters', null, 'GET', 'jsonp')
                            .then((retornoAjax) => {
                                $('#usuariosNoChat').text(retornoAjax["data"]["chatter_count"]);
                                retornaViewrsChat(retornoAjax["data"]["chatters"]);
                            })
                            .catch((erroAjax) => {
                                console.log(erroAjax);
                            });
                    }
                }
            });
    }


});

function retornaViewrsChat(viewersChat) {
    let chatlista = '';
    $('#listaUsuariosChat').empty();
    $.each(viewersChat, function (index, value) {
        if (value.length > 0) {
            chatlista += '<li class="list-group-item active">' + '<strong>' + index + '</strong>' + '</li>';
            chatlista += '<ul class="list-group list-group-flush">'
            $.each(value, function (index, value) {
                chatlista += '<li class="list-group-item">' + value + '</li>';
            })
        }
        chatlista += '</ul>'
    })
    $('#listaUsuariosChat').append(chatlista)
}