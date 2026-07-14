const mesAtualTexto = document.getElementById('mes-atual');
const diasGrid = document.getElementById('dias-grid');
const statusDataTitulo = document.getElementById('status-data-titulo');
const statusConteudo = document.getElementById('status-conteudo');
const btnAnterior = document.getElementById('btn-anterior');
const btnProximo = document.getElementById('btn-proximo');
const btnCriar = document.getElementById('btn-criar');
const btnHorarios = document.getElementById('btn-horarios');
const btnEditar = document.getElementById('btn-editar');
const listasContainer = document.getElementById('listas-container');

let contadorListas = 1;
let modoExclusaoAtivo = false;

const feriadosNacionais = {
    "1-1": "Ano Novo",
    "5-1": "Dia do Trabalhador",
    "10-7": "Independência do Brasil",
    "7-7": "Feriado test",
    "10-12": "Nossa Sra. Aparecida",
    "11-2": "Finados",
    "10-15": "Proclamação da República",
    "11-25": "Natal"
};
 const dataHoje = new Date();
    let mes = dataHoje.getMonth();
    let ano = dataHoje.getFullYear();
    const diaAtual = dataHoje.getDate();

    const nomeMeses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];


function criarListaTarefas() {
    const novoQuadro = document.createElement('div');
    novoQuadro.className = 'quadro-tarefas';
    novoQuadro.id = `lista-${contadorListas}`;

    novoQuadro.innerHTML = `
    <h4 class="quadro-titulo">nome da lista${contadorListas}</h4>
    <div class="quadro-corpo">
        <div class="tarefa-linha">
            <span class="tarefa-texto">
                <span class="tarefa-nome">Tarefa Exemplo</span>
            </span>
       
            <div>
                <span style="font-size: 0.7rem; display:block;">prioridade</span>
                <select style="border: 2px solid #000; border-radius: 4px;">
                    <option></option>
                </select>
            </div>

            <div>
                <span style="font-size: 0.7rem; display:block;">status</span>
                <select style="border: 2px solid #000; border-radius: 4px;">
                    <option></option>
                </select>
            </div>
        </div>
    </div>

    <div class="quadro-rodape">
            <span class="icon-rodape" title="Adicionar tarefa">+</span>
            <span class="icon-rodape" title="Editar">🖌️</span>
            <span class="icon-rodape" title="Excluir">🗑️</span>
    </div>
    
    `
    listasContainer.appendChild(novoQuadro);
    contadorListas++;

    const lixeira = novoQuadro.querySelector('.icon-rodape[title="Excluir"]');
    lixeira.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Tem certeza que deseja excluir esta lista?')) {
            novoQuadro.remove();
        }
    });
}

function atualizarRelogio(){
    const relogioObjeto = document.getElementById('relogio-digital');
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');
    relogioObjeto.textContent = `${horas}:${minutos}:${segundos}`;
}

function gerarCalendario() {
   

    mesAtualTexto.textContent = `${nomeMeses[mes]} ${ano}`
    diasGrid.innerHTML = '';

    const primeiroDiaMes = new Date(ano, mes, 1).getDay();

    const diasNoMes = new Date(ano, mes + 1, 0).getDate();

    for (let i = 0; i< primeiroDiaMes; i++) {
        const blocoVazio = document.createElement('div');
        blocoVazio.style.border = 'none';
        diasGrid.appendChild(blocoVazio);
    }

    for (let dia = 1; dia <= diasNoMes; dia++){
        const blocoDia = document.createElement('div');
        blocoDia.textContent = dia;

        const chaveFeriado = `${mes + 1}-${dia}`;

        if (feriadosNacionais[chaveFeriado]) {
            blocoDia.classList.add('feriado');
            blocoDia.title = feriadosNacionais[chaveFeriado];
        }

        if (dia === dataHoje.getDate() && mes === dataHoje.getMonth() && ano === dataHoje.getFullYear()) {
            blocoDia.classList.add('dia-atual');
        }

        blocoDia.addEventListener('click', () => {
            const jaEstavaSelecionado = blocoDia.classList.contains('selecionado');
            if (jaEstavaSelecionado) {
                blocoDia.classList.remove('selecionado');
                statusDataTitulo.textContent = "Selecione um dia para ver os detalhes";
                statusConteudo.innerHTML = '<p class="status-vazio">Nenhum dia selecionado.</p>';
                return;
            }
            const diaAnterior = document.querySelector('.calendario-grid div.selecionado');
            if (diaAnterior) {
                diaAnterior.classList.remove('selecionado');   
            }
                blocoDia.classList.add('selecionado');
                statusDataTitulo.textContent = `Dia ${dia} de ${nomeMeses[mes]}`;
                statusConteudo.innerHTML = '';

                if (feriadosNacionais[chaveFeriado]) {
                    const nomeFeriado = feriadosNacionais[chaveFeriado];
                    statusConteudo.innerHTML += `
                    <div class = "status-feriado-linha">
                        <span class = "bolinha-feriado"></span>
                        <span> Feriado: ${nomeFeriado}</span>
                    </div>
                    `;
                }
                statusConteudo.innerHTML += '<p class="status-vazio">Você não possui tarefas para hoje.</p>';
                const dataFormatada = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        });
        

        diasGrid.appendChild(blocoDia);
    }
}

btnAnterior.addEventListener('click', () => {
    mes--;
    if (mes < 0) {
        mes = 11;
        ano--;
    }
    gerarCalendario();
});

btnProximo.addEventListener('click', () => {
    mes++;
    if(mes > 11) {
        mes = 0;
        ano++;
    }
    gerarCalendario();
});

btnCriar.addEventListener('click', () => {
    criarListaTarefas();
});


atualizarRelogio();
setInterval(atualizarRelogio, 1000);

gerarCalendario();