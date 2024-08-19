// Adiciona um ouvinte de evento que aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Captura os valores dos campos
        const title = form.querySelector('textarea[name="title"]').value;
        const description = form.querySelector('textarea[name="description"]').value;

        // Criar objeto com os dados da tarefa
        const taskData = {
            title: title,
            description: description
        };

        // Enviar dados para o servidor
        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Redirecionar ou limpar o formulário
            window.location.href = 'view-tasks.html'; // Redirecionar para a página de visualização de tarefas após o sucesso
        })
        .catch((error) => {
            alert('O servidor não está respondendo!');
            console.error('Error:', error);
        });
    });
});