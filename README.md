<div align="justify">

# Exercício de Desenvolvimento de Software para Web: Gerenciador de Tarefas

![Página inicial do gerenciador](https://i.imgur.com/FdIszKB.png)

> [!NOTE]
> Este projeto é um exemplo de um gerenciador de tarefas simples, nele o usuário pode cadastrar, visualizar, editar e remover tarefas.

## Funcionalidades Principais

### 1. Criar Tarefa
Esta funcionalidade permite ao usuário cadastrar uma tarefa fornecendo o título e descrição.

### 2. Visualizar Tarefas
Aqui o usuário poderá ver, pelo título, todas as suas tarefas cadastradas. Ele também poderá acessar a descrição da tarefa, atualizá-la e excluí-la.

### 3. Visualizar
Clicando neste botão, o usuário poderá visualizar o título e a descrição da tarefa.

### 4. Atualizar
Clicando neste botão, o usuário poderá atualizar o título e a descrição da tarefa.

### 5. Excluir
Clicando neste botão, o usuário poderá excluir a tarefa. 

</div>

![Página de visualização do gerenciador](https://i.imgur.com/MXCZoEG.png)

<div align="justify">

> [!WARNING]
> Este projeto é apenas uma demonstração acadêmica e não deve ser utilizado para fins comerciais. As telas e funcionalidades são simplificadas, assim como o banco de dados e o servidor, portanto, não representam um produto final.

> [!IMPORTANT]
> ## Como Utilizar o Gerenciador
> 1. Clone este repositório em sua máquina local.
> 2. Certifique-se de ter o PostgreSQL instalado em sua máquina.
> 3. Abra um terminal e navegue até o diretório do projeto.
> 4. Restaure o banco de dados (instruções abaixo).
> 5. Inicie o servidor (instruções abaixo) e acesse a aplicação web.

> ## Como Restaurar o Banco de Dados
> ### No Windows:
> 1. Abra o Prompt de Comando e navegue até o diretório `bin` do PostgreSQL, geralmente em `"C:\Program Files\PostgreSQL\<versão>\bin"`.
> 2. Crie um banco de dados vazio com o comando:
>    ```cmd
>    createdb -U <username> task_manager
>    ```
> 3. Restaure o banco de dados com o comando:
>    ```cmd
>    psql -U <username> -d task_manager -f "C:\path\to\backup\task_manager.sql"
>    ```
> 
> ### No Linux:
> 1. Abra um terminal.
> 2. Crie um banco de dados vazio com o comando:
>    ```bash
>    createdb -U <username> task_manager
>    ```
> 3. Restaure o banco de dados com o comando:
>    ```bash
>    psql -U <username> -d task_manager -f /caminho/para/task_manager.sql
>    ```

> ## Como Ligar o Servidor e Acessar a Página
> ### No Windows:
> 1. No Prompt de Comando, navegue até o diretório do projeto, em seguida vá para o diretório `./json`.
> 2. Execute o servidor com o comando:
>    ```cmd
>    npm start
>    ```
> 3. Abra o navegador e acesse o arquivo `index.html` no diretório do projeto. Você pode fazer isso arrastando e soltando o arquivo `index.html` na janela do navegador ou, no diretório `./html`, usando o comando:
>    ```cmd
>    start index.html
>    ```
> 
> ### No Linux:
> 1. Abra um terminal e navegue até o diretório do projeto, em seguida vá para o diretório `./json`.
> 2. Execute o servidor com o comando:
>    ```bash
>    npm start
>    ```
> 3. Abra o navegador e acesse o arquivo `index.html` no diretório do projeto. Você pode fazer isso arrastando e soltando o arquivo `index.html` na janela do navegador ou, no diretório `./html`, usando o comando:
>    ```bash
>    xdg-open index.html
>    ```

> [!Note]
> Este projeto é uma implementação simples de um gerenciador de tarefas utilizando Node.js e PostgreSQL. Ele serve como uma oportunidade de aprendizado para entender os conceitos de desenvolvimento web com JavaScript.

* **Autor:** Natam Leão Ferreira
* **Instituição:** Universidade Federal do Ceará (UFC) - Campus Russas
* **Disciplina:** Desenvolvimento de Software para Web
* **Data de Conclusão:** 13/08/2024

</div>
