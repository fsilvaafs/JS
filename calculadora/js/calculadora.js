/*TODO Atualizar no histórico de operações os textos para as funções sqrt, 1/x, raiz*/

const operadores = ['+', '-', '×', '÷'];
let numero;
let entradaNumerica;
let historico = "";
let expressaoLadoA;
let expressaoLadoB;
let expressaoLadoBTemp;
let operador;
let operadorTemp;
let operacaoTemp;
let resultado;
let valorEntradaAlterado = false;
let tarefaAtiva;
let tarefaEmpilhada = []

/***
 * Concatena qualquer entrada numérica da calculadora.
 * É permitido no máximo 10 caracteres na tela da calculadora
 * @param novoNumero {number} Novo valor numérico a ser concatenado
 */
function concatenarNumero(novoNumero)
{
    /*report*/ console.log(`Função concatenarNúmero iniciada \n`)

    let n = getNumero()
    if(String(n).length >= 10){
        /*report*/ console.log(`String excede 10 caracteres. Entrada ignorada \n`)
        return;
    }

    if(n === undefined || n === 0)
        setNumero(Number(novoNumero));
    else
        setNumero(Number(String(n).concat(String(novoNumero))));

    /*report*/ console.log(`Inteiro '${novoNumero}' concatenado. \nString atual: ${getNumero()} \n`)
}

/***
 * Inicializa a variável 'numero' com o valor '0'
 */
function definirValorInicial()
{
    if(getNumero() === undefined){
        setNumero(0);
        /*report*/ console.log(`Valor inicial indefinido, definindo valor inicial como inteiro zero`)
    }
}

/***
 * Define o valor do número que será usado em um dos lados da expressão
 * @param valor {number} Valor numérico que será usado em um dos lados da expressão
 */
function setNumero(valor){
    numero = valor;
}

/***
 * Retorna o valor numérico digitado pelo usuário e que está sendo usado em um dos lados da expressão
 * @returns {number} Retorna o valor numérico que atualmente está sendo usado em um dos lados da expressão
 */
function getNumero() {
    return numero;
}

/***
 * Define a entrada de dados do usuário
 * @param valor {number} Valor numérico escolhido pelo usuário
 */
function setEntradaNumerica(valor){
    entradaNumerica = valor;
}

/***
 * Retorna o valor numérico digitado pelo usuário
 * @returns {number}
 */
function getEntradaNumerica() {
    return entradaNumerica;
}

/***
 * Lado esquerdo da operação
 * @returns {number} Retorna o valor numérico da expressão do lado esquerdo da operação
 */
function getExpressaoLadoA(){
    return Number(expressaoLadoA);
}

/***
 * Define o valor numérico do lado esquerdo da expressão
 * @param param {number} Valor numérico do lado esquerdo da expressão
 */
function setExpressaoLadoA(param) {
    expressaoLadoA = param;
}

/***
 * Define o valor numérico do lado direito da expressão
 * @param param {number} Valor numérico do lado direito da expressão
 */
function setExpressaoLadoB(param) {
    expressaoLadoB = param;
}

/***
 * Retorna o valor numérico do lado direito da expressão
 * @returns {number} Retorna o valor numérico do lado direito da expressão
 */
function getExpressaoLadoB(){
    return Number(expressaoLadoB);
}

/***
 * Retorna o valor temporário do lado direito da expressão
 * @returns {number} Retorna o valor numérico temporário do lado direito da expressão
 */
function getExpressaoLadoBTemp(){
    return expressaoLadoBTemp
}

/***
 * Define o valor numérico temporário do lado direito da expressão
 * @param param {number} Valor numérico temporário do lado direito da expressão
 */
function setExpressaoLadoBTemp(param){
    expressaoLadoBTemp = param
}

/***
 * Histórico de operações
 * @returns {string} Retorna o histórico das operações
 */
function getHistorico() {
    return historico;
}

/***
 * Define o histórico de operações
 * @param novoHistorico {string, null} Digite a string que será armazenada. Use 'null' para zerar o histórico.
 */
function setHistorico(novoHistorico)
{
    if(novoHistorico === '' || typeof novoHistorico === undefined){
        historico = ''
        document.getElementsByClassName('calculadora-visor-historico')[0].innerHTML = ""
    }
    else{
        historico = novoHistorico
    }
}

/***
 * Define se houve a entrada de algum valor númerico
 * @param valorAlterado {boolean} Use true para definir que houve uma entrada de dado numérico. Use false para definir que houve um outro tipo de entrada
 */
function setValorEntradaAlterado(valorAlterado){
    valorEntradaAlterado = valorAlterado;
}

/***
 * Retorna o true se o usuário digitou algum número após um operador, ou retorna falso se a premissa anterior for falsa
 * @returns {boolean}
 */
function getValorEntradaAlterado(){
    return valorEntradaAlterado;
}

/**
 * Retorna qual a tarefa atualmente ativa na calculadora
 * @return {*}
 */
function getTarefaAtiva(){
   return tarefaAtiva
}

/**
 * Define qual tarefa atualmente está ativa na calculadora.
 * @param tarefa String.
 * Parâmetros suportados:
 * 'operacao': Empilha tarefa de operação para que a calculadora efetue;
 * 'ocioso': define estado ocioso para calculadora (esperando tarefas);
 * 'entradaNumerica': Empilha tarefas relaticas à entrada de dados numérica
 * 'resetar': Empilha tarefa para resetar a calculadora
 */
function setTarefaAtiva(tarefa){
    tarefaAtiva = tarefa
}

/***
 * Atualiza o operador escolhido pelo usuário no histórico de operações
 */
function atualizarOperadorHistorico() {
    /*report*/ console.log(`Atualizando operador \n`)

    let ope = getOperador()
    let numr = getNumero()
    let hst = getHistorico()

    if(ope == null || ope === '' || ope === undefined || typeof (numr) === undefined){
        /*report*/ console.log('Operador ou número não definido. Atualização de operador de histórico abortada ')
        return
    }

    hst === '' ?  setHistorico(`${numr} ${ope}`) : setHistorico(`${hst.slice(0, hst.length-1)} ${ope}`)

    document.getElementsByClassName('calculadora-visor-historico')[0].innerHTML = getHistorico();

    /*report*/ console.log(`Operador atualizado`)
}

/***
 * Atualiza o histórico de operações
 * @param tipoAtualizacao {String} Parâmetro opicional para definir qual o tipo de atualização será afetuado.
 * 'inicial': Define atualização como número e operador
 * 'resultado': Define atualização como histórico acrescido do sinal '='
 */
function atualizarHistorico(tipoAtualizacao = undefined)
{
    /*report*/ console.log(`Processo de atualização de histórico iniciado\n`)

    let num = getNumero()
    let operador = getOperador()
    let historico = getHistorico()

    if(operador === undefined){
        /*report*/ console.log(`Erro: operador não definido\n`)
        return
    }

    if(tipoAtualizacao === "inicial") {
        setHistorico(`${num} ${operador}`);
    }
    else if(tipoAtualizacao === 'resultado'){
        setHistorico(`${getHistorico()} ${getNumero()} =`)
    }
    else {
        setHistorico(`${historico} ${getExpressaoLadoBTemp()} ${operador}`)
    }

    document.getElementsByClassName('calculadora-visor-historico')[0].innerHTML = getHistorico();
    /*report*/ console.log(`Histórico atualizado\n`)
}

/**
 * Limpa o histórico de operações
 */
function limparHistorico() {
    setHistorico(null);
    document.getElementsByClassName('calculadora-visor-historico')[0].innerHTML = getHistorico();
    /*report*/ console.log(`Histórico de operações limpo\n`)
}

/***
 * Define qual operador está sendo usado
 * @param {string} novoOperador Operador que será usado na resolução da operação.
 * Parâmetros aceitos: '+', '-', '/', '*'
 */
function setOperador(novoOperador) {
    operadores.includes(novoOperador) ? operador = novoOperador : console.log('Erro: operador inválido')
    /*report*/ console.log(`Operador definido: '${novoOperador}' \n`);
}

/***
 * Retorna qual operador está sendo usado na operação atual
 * @returns {string} Retorna o operador usado na operação atual
 */
function getOperador() {
    return operador;
}

/***
 * Retorna um operador temporário global
 * @returns {string} Retorna o operador temporário global
 */
function getOperadorTemp(){
    return operadorTemp;
}

/***
 * Define um operador temporário
 * @param {string} param Operador que será guardado como temporário
 */
function setOperadorTemp(param){
    operadores.includes(param) ? operadorTemp = param : console.log('Erro: operador passado como temporário não é válido')
}

/***
 * Retorna true case exista uma operação que precise ser feita antes da inserção de um novo operador na equação
 * @return {Boolean}
 */
function getOperacaoTemp(){
    return operacaoTemp
}

/***
 * Define true ou false para uma operação que precise ser realizada antes da inserção de um novo operador na equação
 * @param param
 */
function setOperacaoTemp(param){
    typeof param === "boolean" ? operacaoTemp = param : console.log("Erro: O parâmetro passado para operação precisa ser do tipo 'boolean'")
}

/***
 * Retorna o resultado de uma operação
 * @return {Number}
 */
function getResultado(){
    return resultado
}

/***
 * Define o resultado de uma operação
 * @param novoResultado {Number} Resultado da operação
 */
function setResultado(novoResultado){
    resultado = novoResultado
}

/***
 * Verifica qual o tipo de operador será utilizado na operaçãon(+, -, * ou /)
 * @param {string} param String usada para encontrar o operador
 */
function definirOperador(param) {
    /*report*/ console.log(`Função definirOperador iniciada \n`)
    operadores.includes(param) ? setOperador(param) : /*report*/ console.log(`Parâmetro inválido, tarefa abortada \n`)
}

/**
 * Define o texto que será exibido na tela da calculadora
 * @param param {String} Texto que será exibido na tela da calculadora
 */
function setTexto(param)
{
    if(typeof param !== "string")
        String(param)

    document.getElementsByClassName('calculadora-visor-texto')[0].innerHTML = String(param);
}

function atualizarVisor(param = null) {
    param == null ? setTexto(limitarTamanhoString(String(getNumero()))) : setTexto(limitarTamanhoString(String(param)))
    /*report*/ console.log(`Visor atualizado`)
}

/***
 * Apaga o último dígito
 * Valores negativos entre -1 e -9 são substituídos por 0, para evitar que o JS retorne NaN
 */
function backspace()
{
    /*report*/console.log('Função backspace iniciada')

    if(getNumero() === 0)
        return;

    if(getNumero() < 0 && getNumero() > (-9))
        setNumero(0);

    setNumero(Number(String(getNumero()).slice(0, -1)));
    atualizarVisor();
}

/***
 * Realiza a operação entre a Expressão A e Exressão B
 * @returns {*} Retorna o resultado da expressão, ou undefined se os parâmetros forem passados incorretamente
 */
function realizarOperacao(paramLadoA = undefined, paramLadoB = undefined, paramOperador = undefined)
{
    /*report*/ console.log(`Realizando operação: ${paramLadoA} ${paramOperador} ${paramLadoB}`)
    let ladoA = getExpressaoLadoA()
    let ladoB = getExpressaoLadoB()

    //Realiza a operação com base nos parâmetros passados
    if(typeof paramLadoA !== 'undefined' && typeof paramLadoB !== 'undefined' && typeof paramOperador !== 'undefined')
    {
        switch (paramOperador)
        {
            case '+': setResultado(paramLadoA + paramLadoB); break

            case '-': setResultado(paramLadoA - paramLadoB); break

            case '÷': setResultado(paramLadoA / paramLadoB); break

            case '×': setResultado(paramLadoA * paramLadoB); break

            default :  /*report*/ console.log("Erro: operador incorreto"); return undefined
        }
    }
    else{ //Realiza a operação sem os parâmetros passados

        if(isNaN(ladoA) || isNaN(ladoB)){
            /*report*/ console.log('Erro: os dois lados da expressão precisam estar definidos', '\n');
            return undefined;
        }
        switch (getOperador())
        {
            case '+': setResultado(ladoA + ladoB); break

            case '-': setResultado(ladoA - ladoB); break

            case '÷': setResultado(ladoA / ladoB); break

            case '×': setResultado(ladoA * ladoB); break

            default :  /*report*/ console.log("Erro: operador incorreto"); return undefined
        }
    }
    posOperacao(getResultado())
}

function resetarCalculadora(){
    setExpressaoLadoA(undefined)
    setExpressaoLadoB(undefined)
    setExpressaoLadoBTemp(undefined)
    setOperacaoTemp(undefined)
    setOperacaoTemp(undefined)
    setTarefaAtiva(undefined)
    setNumero(0)
    setTexto(String(getNumero()))
    setResultado(undefined)
    setHistorico('')
    setValorEntradaAlterado(false)
}

/**
 * Limita o tamanho da do texto que aparece na tela da calculadora
 * @param tamanhoDefinido {Number} Tamanho máximo que a string final terá. Sem argumento, o tamanho será definido como 10
 * @param texto {String} Texto que será formatado
 * @return {String} Retorna o texto com tamanho alterado
 */
function limitarTamanhoString(texto, tamanhoDefinido = undefined){
    /*report*/console.log('Limitando tamanho do texto\n')

    if(texto == null || typeof texto == 'undefined'){
        /*report*/ console.log('Erro ao limitar texto: Uma string não foi passada para que o texto fosse limitado\n')
        return undefined
    }

    if(typeof texto != "string")
        texto = String(texto)

    if(typeof tamanhoDefinido == 'undefined'){
        if (texto.length > 10)
            texto = texto.slice(0, 11)
    }
    else{
        if (texto.length > tamanhoDefinido)
            texto = texto.slice(0, tamanhoDefinido)
    }

    return texto
}

/**
 * Realiza os procedimentos de pós operação. Esta função deve ser usada após a realização de uma operação
 * @param resultadoOperacao {Number} Resultado de uma operação
 */
function posOperacao(resultadoOperacao)
{
    /*report*/console.log(`Realizando procedimentos pós operação`)
    if(isNaN(resultadoOperacao)) {
        console.log('Alerta: Resultado da operção não pode ser vazio ou inválido, operação cancelada', '\n');
        return
    }

    limitarTamanhoString(String(resultadoOperacao))

    atualizarHistorico()
    setNumero(resultadoOperacao)
    setExpressaoLadoA(resultadoOperacao)
    setExpressaoLadoB(undefined)
    setExpressaoLadoBTemp(undefined)
    setOperacaoTemp(false)
    atualizarVisor(resultadoOperacao)
}

/***
 * Verifica qual a função passada pela calculadora
 * @param param {String} Função passada pela calculadora
 */
function executarFuncaoCalculadora(param)
{
    switch (param.slice(7))
    {
        case 'ce':  setTarefaAtiva('ce'); break;

        case 'c': setTarefaAtiva('resetar'); break;

        case 'backspace' : setTarefaAtiva('backspace'); break;

        case 'inverte-sinal' : setTarefaAtiva('inverterSinal'); break;

        case 'resultado' : setTarefaAtiva('calcularResultado'); break;

        case 'quadrado' : setTarefaAtiva('elevarQuadrado'); break;

        case 'raiz-quadrada' : setTarefaAtiva('raizQuadrada'); break;

        case 'um-por-x' : setTarefaAtiva('1-por-x'); break;

        case 'ponto-decimal' : setTarefaAtiva('inserirPontoDecimal'); break;
    }
}

/***
 * Lê o estado atual da calculadora
 * 0 - Lado A não definido, lado B não definido
 * 0.1 - Lado A não definido, lado B definido (Nesse caso, há algum possível erro)
 * 1 - Lado A definido, lado B não definido
 * 1.1 - Lado A definido e lado B definido
 * 2 - Operador não definido
 * 2.1 - Operador definido e compatível com os operadores existentes
 * 2.2 - Operador definido e não compatível com os operadores existentes (Nesse caso, há algum erro)
 * 2.3 - É preciso executar uma operação antes de adicionar um novo operador á equação
 * @returns {[]} Retorna um vetor com um conjunto de valores que representam o estado atual da calculadora
 */
function lerEstadoCalculadora()
{
    let ladoA = getExpressaoLadoA()
    let ladoB = getExpressaoLadoB()
    let operador = getOperador()
    let vetorResultado = []
    /*report*/ console.log("lendo estado da calculadora")

    if(isNaN(ladoA))
        isNaN(ladoB) ? vetorResultado.push(0) : vetorResultado.push(0.1)
    else
        isNaN(ladoB) ? vetorResultado.push(1) : vetorResultado.push(1.1)

    if(typeof operador == "undefined")
        vetorResultado.push(2)
    else
        operador.includes(operador) ? vetorResultado.push(2.1) : vetorResultado.push(2.2)

    if(getOperacaoTemp()){
        vetorResultado.push(2.3)
    }

    /*report*/ console.log(`Estados detectados: ${vetorResultado}`)
    return vetorResultado
}

/***
 * Define a ação a ser tomada, baseado no(s) estado(s) atual(is) da calculadora
 * @param arrayEstados Array com os estados da calculadora. Para ler os estados, use a função lerEstadoCalculadora()
 */
function definirAcaoBaseadoNoEstado(arrayEstados)
{   /*report*/ console.log(`Definindo ação baseado nos estados ${arrayEstados}`)
    /*report*/ console.log(`Tarefa atual: ${getTarefaAtiva()}`)
    let tarefaAtual = getTarefaAtiva()

    switch (tarefaAtual)
    {
        case 'operacao':
            if(arrayEstados.includes(1.1) && arrayEstados.includes(2.1)){ //Lado A e B definidos. Operação será realizada
                realizarOperacao()
            }
            else if(arrayEstados.length === 2 && arrayEstados.includes(1) && arrayEstados.includes(2.1)) //Lado A definido, lado B não definido
            {
                if(getValorEntradaAlterado()){
                    setExpressaoLadoB(getNumero())
                    realizarOperacao()
                    atualizarHistorico()
                }
                else {
                    atualizarOperadorHistorico()
                }
            }
            else if(arrayEstados.includes(0)) // Nenhum dos lados definidos
            {
                getNumero() !== undefined ?  setExpressaoLadoA(getNumero()) : setExpressaoLadoA(0)
                atualizarHistorico("inicial")
            }
            else if(arrayEstados.includes(0.1)) //A não definido, B definido
            {
                resetarCalculadora()
                alert("Houve um erro crítico e a calculadora será resetada")
            }
            else if(arrayEstados.length === 1 && arrayEstados.includes(1)) // Somente lado A definido
            {
                if(getValorEntradaAlterado()) {
                    setExpressaoLadoB(getNumero())
                    realizarOperacao()
                }
                else {
                    atualizarHistorico('operador')
                    setValorEntradaAlterado(false)
                }
            }
            else if(arrayEstados.length === 3 && arrayEstados.includes(1) && arrayEstados.includes(2.1) && arrayEstados.includes(2.3)) //É preciso executar uma operação antes de adicionar um novo operador á equação
            {
                if(!getValorEntradaAlterado()) { //Nesse caso, há a necessidade de atualizar o sinal sem efetuar uma operação
                    atualizarOperadorHistorico()
                    return
                }

                setExpressaoLadoBTemp(getNumero())
                realizarOperacao(getExpressaoLadoA(), getExpressaoLadoBTemp(), getOperadorTemp())
            }
            setValorEntradaAlterado(false)
            break

        case 'entradaNumerica':
            if(!isNaN(getExpressaoLadoA()) && operadores.includes(getOperador()) && !getValorEntradaAlterado()){ //Um operador foi incluído na expressão. É preciso limpar a tela para concatenar o lado B da operação
                setNumero(undefined)
                concatenarNumero(getEntradaNumerica())
                atualizarVisor(getEntradaNumerica())
            }
            else
            {
                if(typeof getNumero() === "undefined")
                    setNumero(getEntradaNumerica())

                concatenarNumero(getEntradaNumerica())
                atualizarVisor()
            }

            setValorEntradaAlterado(true);
            break;

        case 'calcularResultado':
            setExpressaoLadoB(getNumero())
            setExpressaoLadoBTemp(getNumero())
            setTarefaAtiva('operacao')
            definirAcaoBaseadoNoEstado(lerEstadoCalculadora())
            break

        case 'backspace':
            backspace()
            break

        case 'ce':
            setNumero(0)
            setTexto(String(getNumero()))
            atualizarVisor()
            break

        case 'resetar':
            resetarCalculadora()
            break

        case 'inverterSinal':
            getNumero() > 0 ? setNumero(-Math.abs(getNumero())) : setNumero(Math.abs(getNumero()))
            atualizarVisor()
            break

        case 'elevarQuadrado':
            setNumero(Math.pow(getNumero(), 2))
            atualizarVisor()
            break

        case 'raizQuadrada':
            setNumero(Number(limitarTamanhoString(String(Math.sqrt(getNumero())), 10)))
            atualizarVisor()
            break

        case '1-por-x':
            setNumero(Number(limitarTamanhoString(String(1/getNumero()), 10)))
            atualizarVisor()
            break

        case 'inserirPontoDecimal':
            /*TODO formatar string para receber ponto decimal :( */
            break
    }
}

function executarTarefaOperador(operador){
    let num = getNumero()
    let operadorT = getOperador()

    //Realizar uma operação
    if(!isNaN(getExpressaoLadoA()) && operadores.includes(operadorT) && !isNaN(num)){
        setOperacaoTemp(true)
        setNumero(num)
        setOperadorTemp(operadorT)
    }

    setOperador(operador)
    setTarefaAtiva("operacao")
}

function executarTarefaEntradaNumerica(numeroRecebido){
    setEntradaNumerica(numeroRecebido)
    setTarefaAtiva('entradaNumerica')
}

function definirTarefa(param)
{
    /*report*/ console.log(`Função definirTarefa iniciada. Parâmetro: '${param}'\n`)

    switch (typeof param)
    {
        case "string":
            if(param.slice(0, 8) === 'operacao')
                executarTarefaOperador(param.slice(-1))

            else if(param.slice(0, 6) === 'funcao')
                executarFuncaoCalculadora(param);

            break

        case "number":
            executarTarefaEntradaNumerica(param)
            break;

        default: alert("Erro de parâmetro")
    }
    definirAcaoBaseadoNoEstado(lerEstadoCalculadora())
}

function calculadora(param) {
    console.log('---------------------------------------------------------');
    console.log('\nFunção calculadora iniciada');
    definirValorInicial();
    definirTarefa(param)
}
