// Carregar instituições do localStorage
let instituicoes = JSON.parse(localStorage.getItem('instituicoes')) || [];

// Função para atualizar a lista de instituições na tela
function atualizarListaInstituicoes() {
    const lista = document.getElementById('instituicoesLista');
    lista.innerHTML = '<h3>Instituições Cadastradas</h3>';
    instituicoes.forEach(instituicao => {
        lista.innerHTML += `
            <p>Nome: ${instituicao.nome} | Início: ${instituicao.dataInicio} | Fim: ${instituicao.dataFim}
                <button class="action-btn edit-btn" onclick="editarInstituicao(${instituicao.id})">Editar</button>
                <button class="action-btn delete-btn" onclick="deletarInstituicao(${instituicao.id})">Excluir</button>
            </p>
        `;
    });
}

// Cadastrar nova instituição
document.getElementById('instituicaoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('instituicaoNome').value;
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;

    const novaInstituicao = { id: Date.now(), nome, dataInicio, dataFim };
    instituicoes.push(novaInstituicao);
    localStorage.setItem('instituicoes', JSON.stringify(instituicoes));

    alert('Instituição cadastrada com sucesso!');
    this.reset();
    atualizarListaInstituicoes();
});

// Editar instituição
function editarInstituicao(id) {
    const instituicao = instituicoes.find(inst => inst.id === id);
    document.getElementById('instituicaoNome').value = instituicao.nome;
    document.getElementById('dataInicio').value = instituicao.dataInicio;
    document.getElementById('dataFim').value = instituicao.dataFim;
}

// Deletar instituição
function deletarInstituicao(id) {
    instituicoes = instituicoes.filter(inst => inst.id !== id);
    localStorage.setItem('instituicoes', JSON.stringify(instituicoes));
    atualizarListaInstituicoes();
}

// Atualizar lista ao carregar a página
atualizarListaInstituicoes();
