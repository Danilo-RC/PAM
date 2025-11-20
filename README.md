# Projeto Banco Inter (Full Stack)

Este é um projeto de estudos full stack que simula funcionalidades básicas do aplicativo do Banco Inter, desenvolvido com um frontend em **React Native (Expo)** e um backend em **PHP (Laravel)**.

O repositório está organizado como um monorepo, contendo as duas partes do projeto:

- `./app/`: O código-fonte do aplicativo mobile (frontend).
- `./api/`: O código-fonte da API RESTful (backend).

---

## ⚠️ AVISOS IMPORTANTES

- **O app não funciona mais via web** (`npx expo start --web`) devido à implementação do mapa
- **Não é possível testar pelo Expo Go** - apenas através de build nativa
- **É necessário usar ngrok** para expor a API localmente para o app

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
- **Ngrok:** [Download aqui](https://ngrok.com/download) - necessário para expor a API local

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
Start-Process "http://localhost/phpmyadmin";
```

### 3. Configuração do Ngrok

⚠️ **IMPORTANTE:** Configure o token do ngrok antes de prosseguir!

1. **Crie uma conta no [ngrok](https://ngrok.com/)**
2. **Copie seu token de autenticação** do dashboard
3. **Execute no terminal:** `ngrok config add-authtoken SEU_TOKEN_AQUI`

### 4. Uso Diário (Iniciar e Parar o Projeto)

#### Para INICIAR o ambiente:

_Inicia os servidores da API, do Ngrok e abre o phpMyAdmin._

```powershell
# Iniciar servidor da API
Start-Process powershell -ArgumentList "Write-Host 'Servidor da API (Backend) rodando...'; php api/artisan serve --host=0.0.0.0 --port=8000";

# Iniciar Ngrok na porta 8000
Start-Process powershell -ArgumentList "Write-Host 'Ngrok rodando...'; ngrok http 8000";

# Abrir phpMyAdmin
Start-Process "http://localhost/phpmyadmin";
```

#### Para PARAR todos os servidores:

_Fecha todos os processos do PHP e Node.js iniciados pelo VS Code._

```powershell
Get-Process -Name "php", "node", "ngrok" | Stop-Process -Force -ErrorAction SilentlyContinue;
Write-Host "Servidores finalizados." -ForegroundColor Yellow;
```

### 5. Configuração do App Mobile

1. Após iniciar o ngrok, **copie a URL gerada** (ex: `https://strainlessly-polyhydric-kizzy.ngrok-free.dev`)
2. No app, na **tela de login**, clique na **engrenagem ⚙️** no canto superior direito
3. No campo URL, **cole apenas a parte do domínio** (ex: `strainlessly-polyhydric-kizzy.ngrok-free.dev`)
   - O app automaticamente adiciona `https://` no início e `/api` no final
4. Clique em **"Salvar"**
5. Agora faça login ou cadastro normalmente

---

## 📱 Executando o Aplicativo

### Opção 1: Expo Run Android (Desenvolvimento)

#### Pré-requisitos:
- **Android Studio:** [Download aqui](https://developer.android.com/studio)
- **JDK 17 (Recomendado):** [Download OpenJDK 17](https://adoptium.net/temurin/releases/?version=17)
  - ⚠️ **Use a versão 17 do JDK** - versões mais recentes podem ter problemas
  - Verifique a instalação com: `java -version`
  - Deve mostrar: `openjdk version "17.x.x"`

#### Configuração do local.properties:
1. Navegue até a pasta `app/android`
2. Crie um arquivo chamado `local.properties`
3. Adicione a linha com o caminho do seu SDK:
   ```properties
   sdk.dir = C:\\Users\\SEU_USUARIO\\AppData\\Local\\Android\\Sdk
   ```
   *Substitua pelo caminho real do SDK na sua máquina*

#### Executar:
```bash
cd app
npx expo run:android
```

### Opção 2: EAS Build (Builds Nativas)

#### Build de Desenvolvimento:
```bash
cd app
# Configure o EAS (primeira vez)
npx eas build:configure

# Build para desenvolvimento
npx eas build --platform android --profile development
```

#### Build de Produção:
```bash
cd app
npx eas build --platform android --profile production
```

#### Instalar o Build:
1. Após o build concluir, escaneie o QR code gerado
2. Ou baixe o APK pelo link fornecido
3. Instale no dispositivo Android

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
| ✅ Integração com mapa                               | ✅ CORS configurado para ngrok                 |

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
  1.  Verifique se o servidor da API (`php artisan serve`) está rodando na porta 8000.
  2.  Confirme se o ngrok está rodando e a URL está correta.
  3.  No app, use apenas a parte do domínio do ngrok (sem `https://` e sem `/api`).
  4.  Certifique-se de que configurou o token do ngrok.

- **Problemas com `npx expo run:android`?**
  1.  Verifique se o arquivo `local.properties` existe em `app/android/`
  2.  Confirme se o caminho do SDK está correto
  3.  **Use JDK 17** - versões mais recentes podem causar problemas
  4.  Execute `npx expo install` para garantir todas as dependências

- **API não conecta ao banco de dados?**
  1.  Verifique se o MySQL está ativo no XAMPP.
  2.  Confirme se o nome do banco de dados (`banco_inter`) e as credenciais no arquivo `api/.env` estão corretos.

- **Upload de foto não funciona?**
  1.  Verifique se você executou o comando `php artisan storage:link` (o script automático já faz isso). Se a pasta `public/storage` não existir dentro de `api/`, rode o comando manualmente.

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e serve como um portfólio de habilidades em desenvolvimento full stack.
