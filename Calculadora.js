        let valorAnterior = 0;
        let valorAtual = 0;
        let operacaoAtual = null;
        let limparVisor = false;
        estadosBtn();
        $(document).ready(function () { });
        $('.btn_num, .operacao').click(function () {
            let valorTeclado = $(this).text();
            if (valorTeclado != '='){
                $('#visor').val($('#visor').val() + valorTeclado);
            }
            estadosBtn();
        });
        //Tecla CE apaga o visor quando é pressionada
        $('#btn_ce').click(function () {
            $('#visor').val('');
            estadosBtn();
        });
        //Tecla C apaga o último caractere do visor quando é pressionada
        $('#btn_c').click(function () {
            valorAtual = $('#visor').val();
            $('#visor').val(valorAtual.slice(0, -1));
            estadosBtn();
        });
        $('.operacao').click(function () {
            valorAnterior = parseFloat($('#visor').val());
            let operadorClicado = $(this).text();
            if (operadorClicado != '=') {
                operacaoAtual = operadorClicado;
            }
        })
        function terminComOperador() {
            //Se o visor estiver vazio, retorna falso
            if ($('#visor').val() == '') {
                return false;
            }
            //Pega o texto do visor e coleta apenas o último caractere
            let ultimoCaractere = $('#visor').val().slice(-1);
            //Verifica se o último caractere é um operador, se for, retorna true se não false
            if (ultimoCaractere === '+' || ultimoCaractere === '-' || ultimoCaractere === 'x' || ultimoCaractere === '/' || ultimoCaractere === '%') {
                return true;
            }
            return false;
        }
        $('#btn_igual').click(function () {
            let partes = $('#visor').val().split(/[\+\-\x\/\%]/);
            if (partes.length > 1) {
                let segundoNumero = partes[1];
                if (segundoNumero == 0 && operacaoAtual == "/") {
                    $('#visor').val("Error")
                }
                else {
                    let resultadoFinal = calcular(valorAnterior, segundoNumero, operacaoAtual)
                    $('#visor').val(resultadoFinal);
                }
                estadosBtn();
            }
        })
        function calcular(valorAtual, num, operacaoAtual) {
            valorAtual = parseFloat(valorAtual);
            num = parseFloat(num);
            const operacoes = {
                '+': (valorAtual, num) => valorAtual + num,
                '-': (valorAtual, num) => valorAtual - num,
                'x': (valorAtual, num) => valorAtual * num,
                '/': (valorAtual, num) => valorAtual / num,
                '%': (valorAtual, num) => valorAtual * (num / 100)
            }
            let resultado = operacoes[operacaoAtual](valorAtual, num);
            return resultado;
        }
        function calculoParcial() {
            try {
                let partes = $('#visor').val().split(/[\+\-\x\/\%]/);
                if (partes.length >= 2) {
                    let segundoNumero = parseFloat(partes[1]);
                    let resultadoParcial = calcular(valorAnterior, segundoNumero, operacaoAtual)
                    $('#visor').val(resultadoParcial);
                    valorAtual = resultadoParcial;
                }
            }
            catch (error) {
                alert('Erro no cálculo: ' + error.message);
            }
        }
        function estadosBtn() {
            let visorVal = $('#visor').val();
            if (visorVal != '') {
                if (visorVal == 'Error') {
                    $('.operacao, .btn_num, #btn_c').prop('disabled', true);
                    
                }
                else if (terminComOperador()) {
                    $('.operacao, #btn_ponto').prop('disabled', true);
                   
                }
                else{
                    $('.operacao, .funcional, .btn_num').prop('disabled', false)    
                }
            }
            else if (visorVal == '') {
                $('.operacao, .funcional, #btn_ponto').prop('disabled', true)
                
            }
            else {
                $('.operacao, .funcional, .btn_num').prop('disabled', false)
            }
        }