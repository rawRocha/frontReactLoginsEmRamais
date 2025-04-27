# 📞 Frontend - Gestão de Ramais (React + Vite)

Interface web para gerenciamento de ramais telefônicos conectada à [API Spring Boot](https://github.com/rawRocha/apiLoginsEmRamais).

## 🚀 Começando

### Pré-requisitos

- Node.js 20+
- API backend em execução
- npm

### Instalação

```bash
git clone https://github.com/seu-usuario/frontReactLoginsEmRamais
cd frontend-ramais
npm install
```

### Executando

```bash
npm run dev
```

- Se estiver no windows pode executar o arquivo run-dev.bat

- Acesse: http://localhost:5173

### 🛠️ Tecnologias

- React 18 + TypeScript
- Vite
- Axios
- React Router DOM
- Redux
- CSS

## 📝 Endpoints Consumidos

- **Login em Ramal**

  - `POST /extensions/login`
  - Corpo:
    ```json
    {
      "username": "usuario",
      "password": "senha",
      "extensionNumber": 101
    }
    ```

- **Logout do Ramal**

  - `DELETE /extensions/logout`
  - Corpo:

    ```json
    {
      "username": "usuario",
      "password": "senha",
      "extensionNumber": 101
    }
    ```

  - **lista dos Ramais disponíveis**

  - `GET /extensions/available?start=105&end=110`

  - **lista dos Ramais ocupados**

  - `GET /extensions/unvailable`

  - **Criar um Ramal**

  - `POST /extensions/create`
  - Corpo:

    ```json
    {
      "extensionNumber": 101
    }
    ```

  - **Criar uma range de Ramais**

  - `POST /extensions/create-range`
  - Corpo:

    ```json
    {
      "start": 101,
      "end": 110
    }
    ```

  - **Configurar uma range de Ramais DISPONÍVEIS**

  - `POST /extensions/configure-range`
  - Corpo:

    ```json
    {
      "start": 101,
      "end": 110
    }
    ```

  - **RESETAR range de Ramais DISPONÍVEIS**

  - `POST /extensions/reset-range`

### 📝 Endpoints Disponíveis Users

- **lista usuários**

  - `GET /users`

- **Cadastrar usuário**

  - `POST /users/register`
  - Corpo:
    ```json
    {
      "username": "usuario",
      "password": "senha"
    }
    ```

### 📄 Licença

- Distribuído sob licença MIT. Veja [LICENSE](LICENSE) para mais informações.
