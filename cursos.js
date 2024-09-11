// Carregar cursos do localStorage
let cursos = JSON.parse(localStorage.getItem('cursos')) || [];

// Função para atualizar a lista de cursos na tela
function atualizarListaCursos() {
    const lista = document.getElementById('cursosLista');
    lista.innerHTML = '<h3>Cursos Cadastrados</h3>';
    cursos.forEach(curso => {
        lista.innerHTML += `
            <p>Nome: ${curso.nome}
                <button class="action-btn edit-btn" onclick="editarCurso(${curso.id})">Editar</button>
                <button class="action-btn delete-btn" onclick="deletarCurso(${curso.id})">Excluir</button>
            </p>
        `;
    });
}

// Cadastrar novo curso
document.getElementById('cursoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('cursoNome').value;

    const novoCurso = { id: Date.now(), nome };
    cursos.push(novoCurso);
    localStorage.setItem('cursos', JSON.stringify(cursos));

    alert('Curso cadastrado com sucesso!');
    this.reset();
    atualizarListaCursos();
});

// Editar curso
function editarCurso(id) {
    const curso = cursos.find(c => c.id === id);
    document.getElementById('cursoNome').value = curso.nome;
}

// Deletar curso
function deletarCurso(id) {
    cursos = cursos.filter(c => c.id !== id);
    localStorage.setItem('cursos', JSON.stringify(cursos));
    atualizarListaCursos();
}

// Atualizar lista ao carregar a página
atualizarListaCursos();
