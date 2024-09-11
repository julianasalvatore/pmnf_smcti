// Carregar locais de estágio do localStorage
let locaisEstagio = JSON.parse(localStorage.getItem('locaisEstagio')) || [];

// Função para atualizar a lista de locais de estágio na tela
function atualizarListaLocaisEstagio() {
    const lista = document.getElementById('locaisEstagioLista');
    lista.innerHTML = '<h3>Locais de Estágio Cadastrados</h3>';
    locaisEstagio.forEach(local => {
        lista.innerHTML += `
            <p>Nome: ${local.nome}
                <button class="action-btn edit-btn" onclick="editarLocal(${local.id})">Editar</button>
                <button class="action-btn delete-btn" onclick="deletarLocal(${local.id})">Excluir</button>
            </p>
        `;
    });
}

// Cadastrar novo local de estágio
document.getElementById('localEstagioForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('localNome').value;

    const novoLocal = { id: Date.now(), nome };
    locaisEstagio.push(novoLocal);
    localStorage.setItem('locaisEstagio', JSON.stringify(locaisEstagio));

    alert('Local de estágio cadastrado com sucesso!');
    this.reset();
    atualizarListaLocaisEstagio();
});

// Editar local de estágio
function editarLocal(id) {
    const local = locaisEstagio.find(l => l.id === id);
    document.getElementById('localNome').value = local.nome;
}

// Deletar local de estágio
function deletarLocal(id) {
    locaisEstagio = locaisEstagio.filter(l => l.id !== id);
    localStorage.setItem('locaisEstagio', JSON.stringify(locaisEstagio));
    atualizarListaLocaisEstagio();
}

// Atualizar lista ao carregar a página
atualizarListaLocaisEstagio();
