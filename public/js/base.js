const ToastrEnum = {
    success: 0,
    info: 1,
    warning: 2,
    error: 3,
}

function mostraToastr(msg, titulo, ToastrEnum) {
    switch (ToastrEnum) {
        case 0:
            toastr.success(msg, titulo, {"positionClass": "toast-top-center", "progressBar": true});
            break;
        case 1:
            toastr.info(msg, titulo, {"positionClass": "toast-top-center", "progressBar": true});
            break;
        case 2:
            toastr.warning(msg, titulo, {"positionClass": "toast-top-center", "progressBar": true});
            break;
        case 3:
            toastr.error(msg, titulo, {"positionClass": "toast-top-center", "progressBar": true});
            break;
    }
}

function retornaDadosAjax(caminho, conteudo, metodo = 'GET', tipodata = 'json') {
    let resultado;
    $.ajax({
        url: caminho,
        method: metodo,
        dataType: tipodata,
        data: conteudo,
    }).done((retorno) => {
        resultado = retorno;
    });

    return resultado;
}