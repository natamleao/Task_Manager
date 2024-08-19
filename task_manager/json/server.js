const express = require('express'); // Importa o framework Express para criar o servidor
const bodyParser = require('body-parser'); // Importa o middleware body-parser para processar dados de formulários
const { Pool } = require('pg'); // Importa Pool para gerenciar conexões com o PostgreSQL
const cors = require('cors'); // Importa o módulo cors para permitir solicitações entre origens

const app = express(); // Cria uma instância do aplicativo Express
const port = 3000; // Define a porta onde o servidor vai escutar

// Configuração do middleware
app.use(bodyParser.json()); // Adiciona middleware para processar dados JSON no corpo das requisições
app.use(bodyParser.urlencoded({ extended: true })); // Adiciona middleware para processar dados URL-encoded (como dados de formulários)
app.use(cors()); // Habilita CORS para permitir solicitações de diferentes origens

// Configuração do pool de conexão com o banco de dados
const pool = new Pool({
    user: 'natam_ferreira', // Nome de usuário do banco de dados
    host: 'localhost', // Host onde o banco de dados está localizado
    database: 'task_manager', // Nome do banco de dados
    password: '123456', // Senha do banco de dados
    port: 5432, // Porta do banco de dados PostgreSQL
});

// Rota GET para a raiz
app.get('/', (req, res) => {
    res.send('Servidor está funcionando!'); // Responde com uma mensagem simples quando a raiz do servidor é acessada
});

// Rota POST para adicionar tarefas
app.post('/tasks', async (req, res) => {
    const { title, description } = req.body; // Extrai título e descrição do corpo da requisição
 
    try {
        // Insere uma nova tarefa no banco de dados e retorna a nova tarefa
        const result = await pool.query(
            'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
            [title, description]
        );
        res.status(201).json(result.rows[0]); // Responde com status 201 Created e a nova tarefa
    } catch (error) {
        console.error('Error inserting data:', error); // Loga o erro no console
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' }); // Envia uma resposta de erro caso ainda não tenha sido enviada
        }
    }
});

// Rota GET para buscar todas as tarefas
app.get('/tasks', async (req, res) => {
    try {
        // Busca todas as tarefas no banco de dados
        const result = await pool.query('SELECT * FROM tasks');
        res.json(result.rows); // Responde com a lista de tarefas
    } catch (error) {
        console.error('Error fetching tasks:', error); // Loga o erro no console
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' }); // Envia uma resposta de erro caso ainda não tenha sido enviada
        }
    }
}); 

// Rota GET para buscar uma tarefa específica por ID
app.get('/tasks/:id', async (req, res) => {
    const taskId = parseInt(req.params.id); // Extrai e converte o ID da tarefa da URL

    try {
        // Busca a tarefa específica pelo ID
        const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [taskId]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]); // Responde com a tarefa encontrada
        } else {
            res.status(404).json({ message: 'Tarefa não encontrada' }); // Responde com 404 se a tarefa não for encontrada
        }
    } catch (error) {
        console.error('Error fetching task:', error); // Loga o erro no console
        res.status(500).json({ message: 'Erro ao buscar a tarefa' }); // Envia uma resposta de erro
    }
});

// Rota DELETE para excluir uma tarefa
app.delete('/tasks/:id', async (req, res) => {
    const taskId = parseInt(req.params.id); // Extrai e converte o ID da tarefa da URL

    try {
        // Deleta a tarefa específica pelo ID
        const result = await pool.query('DELETE FROM tasks WHERE id = $1', [taskId]);
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Tarefa excluída com sucesso' }); // Responde com 200 OK se a tarefa for deletada
        } else {
            res.status(404).json({ message: 'Tarefa não encontrada' }); // Responde com 404 se a tarefa não for encontrada
        }
    } catch (error) {
        console.error('Error deleting task:', error); // Loga o erro no console
        res.status(500).json({ message: 'Erro ao excluir a tarefa' }); // Envia uma resposta de erro
    }
});

// Rota PUT para atualizar uma tarefa existente
app.put('/tasks/:id', async (req, res) => {
    const taskId = parseInt(req.params.id); // Extrai e converte o ID da tarefa da URL
    const { title, description } = req.body; // Extrai título e descrição do corpo da requisição

    try {
        // Atualiza a tarefa específica pelo ID
        const result = await pool.query(
            'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *',
            [title, description, taskId]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]); // Responde com a tarefa atualizada
        } else {
            res.status(404).json({ message: 'Tarefa não encontrada' }); // Responde com 404 se a tarefa não for encontrada
        }
    } catch (error) {
        console.error('Error updating task:', error); // Loga o erro no console
        res.status(500).json({ message: 'Erro ao atualizar a tarefa' }); // Envia uma resposta de erro
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`); // Loga uma mensagem no console indicando que o servidor está rodando
});