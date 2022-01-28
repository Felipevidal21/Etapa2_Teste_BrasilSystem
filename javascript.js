var id = 1;      //id que referencia a os valores armazenados
var arrayVal = []; // array que irá armazenar os valores digitados
var visivel = document.getElementById("vis"); //variável que recebera a div donde se encontra a tabela

function LerDados() {
    var valores = {}; //criando um hash onde irá referencia as colunas aos valores,mapeando os dados

    //criando as variáveis referente as colunas que irá receber os dados como valor os dados dos campos
    valores.id = this.id;
    valores.vinculo = document.getElementById('vinculo').value;
    valores.autor = document.getElementById('autor').value;
    valores.issn = document.getElementById('issn').value;
    valores.editora = document.getElementById('editora').value;
    valores.titulo = document.getElementById('titulo').value;
    valores.edicao = document.getElementById('edicao').value;
    valores.ano = document.getElementById('ano').value;

    return valores; //retornando os valores
}
function validarcampos(valor) {//parâmetro "valor" vai se referir aos campos digitados 
    var msg = '';  // var  que irá receber a mensagem dos campos onde estão vazios

    if (valor.vinculo == "") {
        msg += "informe o vinculo \n";

    }
    if (valor.autor == "") {
        msg += "informe o autor \n";

    }
    if (valor.issn == "") {
        msg += "informe o issn \n";

    }
    if (valor.editora == "") {
        msg += "informe a editora \n";

    }
    if (valor.titulo == "") {
        msg += "informe o titulo \n";

    }
    if (valor.edicao == "") {
        msg += "informe a edição \n";

    }
    if (valor.ano == "") {
        msg += "informe o ano \n";

    }
    if (valor.ano < 1900 || valor.ano > 2019) {//ano só pode ser maior que 1900 ou menor que 2019
        msg += "Data de Ano invalida \n";
    }
    if (msg != '') {//caso hajá alguma mensagem ,sera mostrada e irá retorna falso
        alert(msg);
        return false;
    }
    return true;
}

function salvar() {
    var dados = this.LerDados(); //var dados vai receber a função LerDados com os valores 

    if (this.validarcampos(dados)) {//caso o retorno da validação dos dados retorne true
        this.adicionar(dados);      //chamara a função "adicionar" onde os dados vão ser passados como parâmetro e adicionados na tabela 
        visivel.style.display = 'block'; // como a div da tabela esta oculta , está parte do codigo vai torna-la visivel

    }

    this.listaTabela(); //chama função listaTabela
}

function adicionar(valor) {
    this.arrayVal.push(valor); //vai atribuir os valores vindo como parâmetro um por vez na ultima colocação 
    this.id++; //id irá somar 1

    LerDados();//chama função LerDados para que os campos após adicionados sejam limpos

    vinculo.value = "";
    autor.value = "";
    issn.value = "";
    editora.value = "";
    titulo.value = "";
    edicao.value = "";
    ano.value = "";
}

function listaTabela() {
    var tbody = document.getElementById('tbody'); // var que vai receber o tbody da tabela ,onde seram inseridas as tr e td
    tbody.innerText = ''; //irá limpa toda vez que for inserido outro valor , para que não um mesma linha não seja clonada 

    for (var i = 0; i < this.arrayVal.length; i++) { // enquanto o indice for menor que o tamanho do array onde os valores estão inseridos ele vai...
        var tr = tbody.insertRow(); // criar uma "tr" dentro de "tbody",ou seja, uma linha

        //criar uma "td" uma celula para cada coluna
        var td_id = tr.insertCell();
        var td_vinculo = tr.insertCell();
        var td_autor = tr.insertCell();
        var td_issn = tr.insertCell();
        var td_editora = tr.insertCell();
        var td_titulo = tr.insertCell();
        var td_edicao = tr.insertCell();
        var td_ano = tr.insertCell();

        //inserir dentro dessa celula os valores do array referente a cada coluna
        td_id.innerText = this.arrayVal[i].id;
        td_vinculo.innerText = this.arrayVal[i].vinculo;
        td_autor.innerText = this.arrayVal[i].autor;
        td_issn.innerText = this.arrayVal[i].issn;
        td_editora.innerText = this.arrayVal[i].editora;
        td_titulo.innerText = this.arrayVal[i].titulo;
        td_edicao.innerText = this.arrayVal[i].edicao;
        td_ano.innerText = this.arrayVal[i].ano;

        tr.setAttribute("ondblclick", "DeletarLinha(" + this.arrayVal[i].id + ")");//e a cada "tr" irá ser criado um evento double click e tambem a função "DeletarLinha" recebendo como parâmetro o "id" referente a linha
    }

}

function DeletarLinha(id) {
    var tbody = document.getElementById('tbody');// var que vai receber o tbody da tabela ,onde será excluida as tr

    for (let i = 0; i < this.arrayVal.length; i++) {//enquanto i for menor que o tamanho do array onde estão os valores...
        if (this.arrayVal[i].id == id) {//se o "id" da linha for igual ao "id" passado como parâmetro ou seja o selecionado
            this.arrayVal.splice(i, 1);//vai excluir os valores na qual indica o indice 
            tbody.deleteRow(i);       //irá excluir a "tr" ou seja a linha 
        }

    }
}







//                          --Cronometro--
function startTempo(m_inic) {
    var t_minuto = document.getElementById("t_minutos"); // Criando a variável que vai receber a tag minutos
    var t_segundo = document.getElementById("t_segundo"); // Criando a variável que vai receber a tag segundos


    t_minuto.innerHTML = ((m_inic - 1) > 9) ? ('' + (m_inic - 1)) : ('0' + (m_inic - 1)); //minutos vai receber a variável passada como parametro menos 1 ,e com o operador ternario que atribuira um zero a esquerda da variavel caso seja menor que 10
    t_segundo.innerHTML = '59'; //o segundo vai se inicializar de 59


    var min = m_inic - 1; //variável vai receber o valor inicial da tag do html menos 1
    var seg = 59;         //variável "seg" inicializada de 59


    //setInterval é a função do js que a cada 1000 milisegundo,ou seja,1 segundo vai efetuar um determinada função
    var cont = setInterval(function () {
        t_minuto.innerHTML = (min > 9) ? ('' + min) : ('0' + min);  // na variável que se refere a os minutos caso seja menor que 10 vai atribuir "0" a esquerda  
        t_segundo.innerHTML = (seg > 9) ? ('' + seg) : ('0' + seg); // na variável que se refere a os segundos caso seja menor que 10 vai atribuir "0" a esquerda
        LerDados();  //chamando as função LerDados para referênciar aos inputs

        if (seg > 0) { //caso segundos for maior que "0" irá subtrair 1
            seg -= 1;
        } else if (seg == 0 && min > 0) { // se os segundos for igual a "0" e minutos maior que "0" ,minutos ira subtrair e segundos irá ser igual 59 ,fazendo o processo novamenta até tudo ser zerado   
            seg = 59;
            min -= 1;
        } else { // caso tudo tenha acabado os minutos e segundos serão zerados e os campos serão desabilitados
            min = 0;
            seg = 0;
            vinculo.disabled = true;
            autor.disabled = true;
            issn.disabled = true;
            editora.disabled = true;
            titulo.disabled = true;
            edicao.disabled = true;
            ano.disabled = true;


        }

    }, 1000);


}

startTempo(60); //chamando a função do cronometro com o valor inicial de 60 minutos
