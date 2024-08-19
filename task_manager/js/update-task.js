// Adiciona um ouvinte de evento que aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Obtém os elementos HTML necessários
    const titleElement = document.getElementById('title'); // Campo de título
    const descriptionElement = document.getElementById('description'); // Campo de descrição
    const updateForm = document.getElementById('update-form'); // Formulário de atualização

    // Obtém o ID da tarefa a partir dos parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get('id');

    // Verifica se o ID da tarefa é válido
    if (!taskId || isNaN(taskId)) {
        // Se o ID não for válido, exibe um alerta e redireciona para a página de tarefas
        alert('ID da tarefa não fornecido ou inválido.');
        window.location.href = 'view-tasks.html';
        return;
    }

    // Função para carregar os detalhes da tarefa
    function loadTaskDetails() {
        // Faz uma solicitação GET para obter os detalhes da tarefa
        fetch(`http://localhost:3000/tasks/${taskId}`)
            .then(response => response.json()) // Converte a resposta em JSON
            .then(task => {
                // Verifica se a tarefa foi encontrada e possui título e descrição
                if (task && task.title && task.description) {
                    // Preenche os campos com os dados da tarefa
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

    // Função para atualizar a tarefa
    function updateTask(event) {
        event.preventDefault(); // Previne o comportamento padrão do formulário

        // Obtém os valores atualizados dos campos
        const updatedTitle = titleElement.value;
        const updatedDescription = descriptionElement.value;

        // Faz uma solicitação PUT para atualizar a tarefa no servidor
        fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: updatedTitle,
                description: updatedDescription
            })
        })
        .then(response => response.json()) // Converte a resposta em JSON
        .then(result => {
            // Verifica se a atualização foi bem-sucedida
            if (result) {
                alert('Tarefa atualizada com sucesso!');
                window.location.href = 'view-tasks.html'; // Redireciona para a página de tarefas
            } else {
                alert('Erro ao atualizar a tarefa.');
            }
        })
        .catch(error => {
            // Trata erros na solicitação
            console.error('Error updating task:', error);
            alert('Ocorreu um erro ao atualizar a tarefa.');
        });
    }

    // Adiciona um ouvinte de evento para o envio do formulário
    updateForm.addEventListener('submit', updateTask);
    
    // Carrega os detalhes da tarefa quando a página é carregada
    loadTaskDetails();
});