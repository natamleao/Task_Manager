// Adiciona um ouvinte de evento que aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Obtém os elementos de título e descrição pelos IDs
    const titleElement = document.getElementById('title');
    const descriptionElement = document.getElementById('description');
    
    // Função para carregar os detalhes da tarefa
    function loadTaskDetails() {
        // Obtém os parâmetros da URL
        const urlParams = new URLSearchParams(window.location.search);
        // Extrai o ID da tarefa da URL
        const taskId = urlParams.get('id');
        
        // Verifica se o ID da tarefa está presente e é um número válido
        if (!taskId || isNaN(taskId)) {
            // Se o ID não for válido, redireciona para a página de tarefas
            window.location.href = 'view-tasks.html';
            return;
        }
        
        // Faz uma solicitação para obter os detalhes da tarefa do servidor
        fetch(`http://localhost:3000/tasks/${taskId}`)
            .then(response => response.json()) // Converte a resposta em JSON
            .then(task => {
                // Verifica se a tarefa possui título e descrição
                if (task && task.title && task.description) {
                    // Preenche os campos de título e descrição com os dados da tarefa
                    titleElement.value = task.title;
                    descriptionElement.value = task.description;
                } else {
                    // Se a tarefa não for encontrada, exibe um alerta
                    alert('Tarefa não encontrada.');
                }
            })
            .catch(error => {
                // Trata erros na solicitação
                console.error('Error loading task details:', error);
                alert('Ocorreu um erro ao carregar os detalhes da tarefa.');
            });
    }
    
    // Chama a função para carregar os detalhes da tarefa
    loadTaskDetails();
});