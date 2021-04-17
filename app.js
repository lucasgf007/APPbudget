class Despesas{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for(let i in this){
            if(this[i] == null || this[i] == undefined || this[i] == ''){
                return false // vai retornar para o if da function
            }
        }// vai percorrer o construct
        return true
    }
}

class Bd{

    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id', 0)
        }

    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(A){
        

        let id = this.getProximoId()

        // localStorage perimite armazenar dados do usuario apartir do browser
        localStorage.setItem(id, JSON.stringify(A)) // transformando em uma notação JSON
                    // setItem= inserir em localstorange

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros(){
        // array de despesas
        let despesas = Array()

        let id = localStorage.getItem('id')

        // recuperar todas as despesas
        for(let i=1; i <= id; i++ ){
            
            // recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i)) //FAZ o processo inverso, passa de JSON para objeto literal

            // verificar se exixte indices que foram removidos
            if(despesa == null){
                continue
                // vai pular o push, fzd o larço repetir dnv
            }
            despesa.id = i 
            despesas.push(despesa)
        }
        
        return despesas
    }

    pesquisar(despesa){
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()

        // ano
        if(despesa.ano != ''){
           despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano) // ver se o valor obtido do campo estar dentro de despesa.ano
        }   
        // mes
        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes) // ver se o valor obtido do campo estar dentro de despesa.ano
        }
        
        // dia 
        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia) // ver se o valor obtido do campo estar dentro de despesa.ano
        }

        // tipo
        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo) // ver se o valor obtido do campo estar dentro de despesa.ano
        }

        //descrição
        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao) // ver se o valor obtido do campo estar dentro de despesa.ano
        }
        // valor
        if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor) // ver se o valor obtido do campo estar dentro de despesa.ano
        }
        console.log(despesasFiltradas)
        return despesasFiltradas
        
    }

    remover(id){
        localStorage.removeItem(id)
    }
}

let bd = new Bd()

function cadastrarDespesas() {
                                    // Id
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesas = new Despesas(
        ano.value, // recupero o valor do ID
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if(despesas.validarDados()){
        // passagem correta
        bd.gravar(despesas)

        // modal programático
        // titulo
        document.getElementById('modal_titulo').innerHTML = 'Sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        // texto
        document.getElementById('modal_texto').innerHTML = 'Seu registro foi adicionado com sucesso'
        // botão
        document.getElementById('modal_botao').innerHTML = 'OK'
        document.getElementById('modal_botao').className = 'btn btn-success'

        // Jquery
        $('#modalGravacao').modal('show')

        // limpando os campos do formulario 
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    } else { // qd for falso

        // titulo
        document.getElementById('modal_titulo').innerHTML = 'Error na iclusão do registro'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        // texto
        document.getElementById('modal_texto').innerHTML = 'Você deixou campos obrigatórios em branco!'
        // botão
        document.getElementById('modal_botao').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal_botao').className = 'btn btn-danger'

        // error 
        // Jquery
        $('#modalGravacao').modal('show')
    }

}
// vai carregar a partir do carrgamento do Body
function carregaLitsaDespesas(despesas = Array(), filtro = false){

    if(despesas.length == 0 && filtro == false){
        despesas = bd.recuperarTodosRegistros()
    }

    let lista_despesas = document.getElementById('lista_despesas')
    lista_despesas.innerHTML = ''

    // percorrer o array despesas
    despesas.forEach(function(d){ //foreach percorre o array todo
        // criando a linha <tr>
        let linha = lista_despesas.insertRow() // insetar linhas no codigo 

        //colunas <td>
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        
        // ajustar o tipo
        switch(d.tipo){
            case '1' : d.tipo = 'Alimentação'
                break
            case '2' : d.tipo = 'Educação'
                break
            case '3' : d.tipo = 'Lazer'
                break
            case '4' : d.tipo = 'Saúde'
                break
            case '5' : d.tipo = 'Transporte'
                break
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesas_${d.id }` 
        btn.onclick= function(){
            

            let id = this.id.replace('id_despesas_', '')

            
            bd.remover(id)

            window.location.reload()
        }
        linha.insertCell(4).append(btn)
    })
}


function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesas(ano, mes, dia, tipo, descricao, valor)

    
    let despesas = bd.pesquisar(despesa)

    carregaLitsaDespesas(despesas, true)

    if(despesas == ''){
        // titulo
        
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        // texto
        document.getElementById('modal_texto').innerHTML = 'Nenhum registro com essa referência foi encontrado'
        // botão
        document.getElementById('modal_botao').innerHTML = 'Voltar'
        document.getElementById('modal_botao').className = 'btn btn-danger'

        // error 
        // Jquery
        $('#modalGravacao').modal('show')
    }

}