// Adiciona um ouvinte de evento para executar o código quando o DOM estiver totalmente carregado
document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('task_list'); // Obtém o elemento onde a lista de tarefas será exibida

    // Função para buscar e exibir as tarefas
    function loadTasks() {
        // Faz uma solicitação GET para obter todas as tarefas do servidor
        fetch('http://localhost:3000/tasks')
            .then(response => response.json()) // Converte a resposta em JSON
            .then(tasks => {
                // Verifica se não há tarefas
                if (tasks.length === 0) {
                    taskList.innerHTML = '<li class="alt">Não há tarefas para exibir.</li>'; // Exibe uma mensagem indicando que não há tarefas
                } else {
                    // Cria uma lista de tarefas com botões para visualizar, modificar e excluir
                    taskList.innerHTML = tasks.map(task => `
                        <li class="task-item">
                            <h4>${task.title}</h4>
                            <div class="btn-conteiner">
                                <button class="btn" onclick="viewTask(${task.id})">Visualizar</button>
                                <button class="btn" onclick="editTask(${task.id})">Atualizar</button>
                                <button class="btn" onclick="deleteTask(${task.id})">Excluir</button>
                            </div>
                        </li>
                    `).join(''); // Concatena todas as tarefas em uma única string HTML
                }
            })
            .catch(error => {
                // Trata erros na solicitação
                console.error('Error loading tasks:', error);
                taskList.innerHTML = '<li class="alt">Ocorreu um erro ao carregar as tarefas. Por favor, tente novamente mais tarde.</li>'; // Exibe uma mensagem de erro
            });
    }

    loadTasks(); // Chama a função para carregar as tarefas quando a página é carregada

    // Função para visualizar uma tarefa
    window.viewTask = function(taskId) {
        window.location.href = `task-detail.html?id=${taskId}`; // Redireciona para a página de detalhes da tarefa
    };

    // Função para atualizar uma tarefa
    window.editTask = function(taskId) {
        window.location.href = `update-task.html?id=${taskId}`; // Redireciona para a página de edição da tarefa
    };

    // Função para excluir uma tarefa
    window.deleteTask = function(taskId) {
        if (confirm('Você tem certeza que deseja excluir esta tarefa?')) {
            // Se o usuário confirmar, faz uma solicitação DELETE para remover a tarefa do servidor
            fetch(`http://localhost:3000/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Se a solicitação for bem-sucedida, recarrega a página para atualizar a lista de tarefas
                    window.location.reload();
                } else {
                    alert('Ocorreu um erro ao excluir a tarefa.'); // Exibe um alerta se houver um erro
                }
            })
            .catch(error => {
                // Trata erros na solicitação
                console.error('Error deleting task:', error);
                alert('Ocorreu um erro ao excluir a tarefa.'); // Exibe um alerta se ocorrer um erro
            });
        }
    };
});