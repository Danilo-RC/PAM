# Projeto Banco Inter (Full Stack)

Este é um projeto de estudos full stack que simula funcionalidades básicas do aplicativo do Banco Inter, desenvolvido com um frontend em **React Native (Expo)** e um backend em **PHP (Laravel)**.

O repositório está organizado como um monorepo, contendo as duas partes do projeto:

- `./app/`: O código-fonte do aplicativo mobile (frontend).
- `./api/`: O código-fonte da API RESTful (backend).

---

## 🔧 Guia de Instalação e Uso

### 1. Pré-requisitos

Garanta que os seguintes programas estão instalados e funcionando:

- **Git:** [Link para download](https://git-scm.com/downloads)
- **XAMPP:** Essencial para o banco de dados e servidor web. [Link para download](https://www.apachefriends.org/index.html)
- **Composer:** [Link para download](https://getcomposer.org/download/)
- **Node.js (v18+):** [Link para download](https://nodejs.org/en/)
- **Expo CLI:** `npm install -g @expo/cli`
- **VS Code:** [Link para download](https://code.visualstudio.com/)

### 2. Instalação Automatizada (Apenas na Primeira Vez)

Este script clona o projeto, instala as dependências, configura o ambiente e inicia todos os servidores e painéis necessários.

**Instruções:**

1.  Abra o **XAMPP Control Panel** e inicie os módulos **Apache** e **MySQL**.
2.  Abra o **VS Code**, vá em `File > Open Folder...` e escolha uma **pasta vazia** para o projeto.
3.  Abra o terminal integrado no VS Code (`Ctrl + '`).
4.  **Copie o bloco de código abaixo, cole no terminal e pressione Enter.**

```powershell
git clone https://github.com/Danilo-RC/PAM.git .;
npm install;
composer install --working-dir=api;
cd app; npm install; cd ..;
cp "api\.env.xampp" "api\.env";
php api/artisan key:generate;
php api/artisan storage:link;
php api/artisan migrate --force;
Start-Process powershell -ArgumentList "Write-Host 'Servidor da API (Backend) rodando...'; php api/artisan serve --host=0.0.0.0 --port=8000";
Start-Process powershell -ArgumentList "Write-Host 'Servidor do App (Frontend - Web e Mobile) rodando...'; cd app; npx expo start --web";
Start-Process "http://localhost/phpmyadmin";
```

### 3. Uso Diário (Iniciar e Parar o Projeto)

Após a primeira instalação, use os comandos abaixo para gerenciar o ambiente de desenvolvimento.

#### Para INICIAR o ambiente:

_Inicia os servidores da API, do App e abre o phpMyAdmin._

```powershell
Start-Process powershell -ArgumentList "Write-Host 'Servidor da API (Backend) rodando...'; php api/artisan serve --host=0.0.0.0 --port=8000";
Start-Process powershell -ArgumentList "Write-Host 'Servidor do App (Frontend - Web e Mobile) rodando...'; cd app; npx expo start --web";
Start-Process "http://localhost/phpmyadmin";
```

#### Para PARAR todos os servidores:

_Fecha todos os processos do PHP e Node.js iniciados pelo VS Code._

```powershell
Get-Process -Name "php", "node" | Stop-Process -Force -ErrorAction SilentlyContinue;
Write-Host "Servidores finalizados." -ForegroundColor Yellow;
```

### 4. Ajuste Final: Conectar o App à API

1.  No VS Code, abra o arquivo `app/src/api/index.js`.
2.  Encontre a linha `baseURL` e **substitua 'SEU_IP_DE_REDE' pelo IP da sua máquina**.

    ```javascript
    // Exemplo: 'http://192.168.1.100:8000/api'
    baseURL: 'http://SEU_IP_DE_REDE:8000/api';
    ```

    > **Dica:** Para descobrir seu IP, rode o comando `ipconfig` no terminal do Windows.

---

## 📱 Testando o Aplicativo

Após a instalação, siga os passos abaixo para testar as funcionalidades.

### No navegador (Web)

1.  O script de instalação/uso diário já inicia o servidor web.
2.  Acesse `http://localhost:8081` (ou a porta indicada no terminal do Expo).
3.  Teste as funcionalidades de login, cadastro e visualização de transações.

### No dispositivo físico (Recomendado)

1.  Instale o app **Expo Go** pela Play Store ou App Store.
2.  Garanta que o celular e o computador estejam na **mesma rede Wi-Fi**.
3.  No terminal do Expo (iniciado pelo script), escaneie o **QR Code** com o app Expo Go.
4.  O aplicativo irá carregar e você poderá testá-lo em um ambiente real.

### Fluxo de teste recomendado

1.  **Cadastro:** Crie um novo usuário.
2.  **Login:** Faça login com as credenciais recém-criadas.
3.  **Adicionar Transações:** Adicione algumas transações de entrada e saída usando o botão (+).
4.  **Verificar Saldo:** Confirme se o saldo na tela Home é atualizado corretamente.
5.  **Atualizar Dados:** Puxe a lista de transações para baixo (pull-to-refresh) para recarregar os dados.
6.  **Upload de Foto:** Vá para a tela de Perfil e teste o upload de uma nova foto de perfil.
7.  **Logout:** Na tela de Perfil, clique em "Sair" para testar o encerramento da sessão.

---

## 🎨 Design System

### Cores

- **Primária**: `#FF7A00` (Laranja Banco Inter)
- **Secundária**: `#000000` (Preto)
- **Background**: `#F5F5F5` (Cinza claro)
- **Texto**: `#333333` (Cinza escuro)
- **Sucesso**: `#28a745` (Verde)
- **Erro**: `#dc3545` (Vermelho)

### Componentes

- **FAB (Floating Action Button)**: Botão laranja no canto inferior direito para ações principais.
- **Cards**: Elementos de interface com sombra e bordas arredondadas para agrupar informações.
- **Modal**: Overlay que surge sobre a tela para ações focadas, como a criação de transações.
- **Headers**: Cabeçalhos padronizados com fundo laranja e texto branco.

---

## 🚀 Funcionalidades Principais

| Frontend (App)                                       | Backend (API)                                  |
| :--------------------------------------------------- | :--------------------------------------------- |
| ✅ Autenticação completa (Login, Cadastro)           | ✅ API RESTful com endpoints seguros           |
| ✅ Gestão de transações (Adicionar, Listar, Remover) | ✅ Autenticação via token com Laravel Sanctum  |
| ✅ Upload de foto de perfil (Câmera/Galeria)         | ✅ Gestão de usuários e transações no DB       |
| ✅ Atualização de saldo em tempo real                | ✅ Validação de dados de entrada               |
| ✅ Interface inspirada no design do Banco Inter      | ✅ Cálculo e atualização de saldo automático   |
| ✅ Navegação intuitiva e pull-to-refresh             | ✅ Armazenamento de arquivos (fotos de perfil) |

---

## 📚 Endpoints da API

Todas as rotas são prefixadas com `/api`. A autenticação (`Authorization: Bearer <token>`) é necessária para a maioria delas.

| Método   | Endpoint             | Descrição                                           |
| :------- | :------------------- | :-------------------------------------------------- |
| `POST`   | `/register`          | Registra um novo usuário.                           |
| `POST`   | `/login`             | Autentica um usuário e retorna um token.            |
| `POST`   | `/logout`            | Invalida o token do usuário (requer auth).          |
| `GET`    | `/user`              | Retorna os dados do usuário logado (requer auth).   |
| `POST`   | `/profile/photo`     | Faz upload da foto de perfil (requer auth).         |
| `GET`    | `/transactions`      | Lista todas as transações do usuário (requer auth). |
| `POST`   | `/transactions`      | Cria uma nova transação (requer auth).              |
| `DELETE` | `/transactions/{id}` | Remove uma transação específica (requer auth).      |

---

## 🐛 Troubleshooting Comum

- **Erro de conexão com a API no App?**
  1.  Verifique se o servidor da API (`php artisan serve`) está rodando. O parâmetro `--host=0.0.0.0` é essencial para permitir conexões da rede local.
  2.  Confirme se o IP no arquivo `app/src/api/index.js` está correto (não use `localhost`!).
  3.  Certifique-se de que seu celular e computador estão na mesma rede Wi-Fi.
  4.  Desative temporariamente o Firewall do Windows para testar se ele está bloqueando a porta `8000`.

- **API não conecta ao banco de dados?**
  1.  Verifique se o MySQL está ativo no XAMPP.
  2.  Confirme se o nome do banco de dados (`banco_inter`) e as credenciais no arquivo `api/.env` estão corretos.

- **Upload de foto não funciona?**
  1.  Verifique se você executou o comando `php artisan storage:link` (o script automático já faz isso). Se a pasta `public/storage` não existir dentro de `api/`, rode o comando manualmente.

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e serve como um portfólio de habilidades em desenvolvimento full stack.
