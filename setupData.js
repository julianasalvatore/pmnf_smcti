document.addEventListener('DOMContentLoaded', () => {
 // Defina os dados para instituições, cursos e locais de estágio
 const instituicoes = [
     { id: 1, nome: 'Instituição A' },
     { id: 2, nome: 'Instituição B' }
 ];

 const cursos = [
     { id: 1, nome: 'Curso A' },
     { id: 2, nome: 'Curso B' }
 ];

 const locaisEstagio = [
     { id: 1, nome: 'Local A' },
     { id: 2, nome: 'Local B' }
 ];

 // Armazene os dados no localStorage
 localStorage.setItem('instituicoes', JSON.stringify(instituicoes));
 localStorage.setItem('cursos', JSON.stringify(cursos));
 localStorage.setItem('locaisEstagio', JSON.stringify(locaisEstagio));
});
