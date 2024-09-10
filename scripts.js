document.addEventListener('DOMContentLoaded', () => {
 fetch('/api/interns')
     .then(response => response.json())
     .then(data => {
         const tableBody = document.querySelector('#internsTable tbody');
         tableBody.innerHTML = '';
         data.forEach(intern => {
             const row = document.createElement('tr');
             row.innerHTML = `
                 <td>${intern.id}</td>
                 <td>${intern.name}</td>
                 <td>${intern.email}</td>
                 <td>${intern.date_of_birth}</td>
                 <td>
                     <button class="edit-btn" onclick="editIntern(${intern.id})">Editar</button>
                     <button class="delete-btn" onclick="deleteIntern(${intern.id})">Excluir</button>
                 </td>
             `;
             tableBody.appendChild(row);
         });
     })
     .catch(error => console.error('Erro ao carregar dados:', error));
});

function editIntern(id) {
 // Função para editar um estagiário
 console.log('Editar estagiário com ID:', id);
}

function deleteIntern(id) {
 // Função para excluir um estagiário
 console.log('Excluir estagiário com ID:', id);
}
