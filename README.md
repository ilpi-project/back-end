# 📱 ILPI App API

Esta API RESTful é o backend do aplicativo mobile **ILPI**, focado no gerenciamento de usuários, membros (como idosos ou dependentes) e eventos. Ela é construída com **Node.js**, **Express** e **MongoDB**, e fornece endpoints seguros para operações **CRUD**, autenticação com **JWT**, e upload de imagens via **form-data**.

---

## 📑 Índice

- [Instalação](#Instalação)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Formato das Requisições](#formato-das-requisições)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)

---

## 🛠️ Instalação

Siga os passos abaixo para instalar e rodar o projeto localmente.

### 1. Clonar o repositório
```bash
git clone https://github.com/ilpi-project/back-end.git
```
### 2. Entrar no diretório do backend
```bash
cd back-end
```
### 3. Instalar as dependências
```bash
npm install
```
### 4. Criar o arquivo .env baseado no .env.example
Linux/Mac/Git Bash
```bash
cp .env.example .env
```
Windows PowerShell
```powershell
Copy-Item .env.example .env
```
Windows CMD
```cmd
copy .env.example .env
```
## 🚀 Uso
Iniciar o servidor
```bash
npm start
```
## 🔐 Autenticação
⚠️ Todas as rotas protegidas exigem o token JWT no cabeçalho:
```console
Authorization: Bearer <seu_token_aqui>
```

## 📡 Endpoints

### 🧑‍💼 Usuários

| MÉTODO | ENDPOINT               | DESCRIÇÃO                                 |
|--------|------------------------|--------------------------------------------|
| POST   | /users/login           | Valida email e senha e retorna o token JWT |
| GET    | /users/validate-user   | Valida o token JWT                         |
| GET    | /users                 | Lista todos os usuários (sem imagem)       |
| GET    | /users/{id}            | Busca dados de um usuário específico       |
| GET    | /users/{id}/image      | Retorna a imagem de perfil do usuário      |
| POST   | /users/create          | Cria novo usuário                          |
| PUT    | /users/update/{id}     | Atualiza dados do usuário                  |
| DELETE | /users/delete/{id}     | Remove usuário pelo ID                     |


### 👥 Membros

| MÉTODO | ENDPOINT                          | DESCRIÇÃO                                      |
|--------|-----------------------------------|------------------------------------------------|
| GET    | /members                          | Lista membros associados ao usuário autenticado (requer token) |
| GET    | /members/{id}                     | Busca dados de um membro específico             |
| GET    | /members/{id}/image               | Retorna a imagem do membro                      |
| POST   | /members/create/{userId}          | Cria novo membro vinculado a um usuário         |
| PUT    | /members/update/{id}              | Atualiza dados do membro                        |
| DELETE | /members/delete/{id}              | Remove membro pelo ID                           |

### 📅 Eventos

| MÉTODO | ENDPOINT                          | DESCRIÇÃO                                      |
|--------|-----------------------------------|------------------------------------------------|
| GET    | /events                           | Lista eventos do usuário autenticado (requer token)           |
| GET    | /events/{id}                      | Busca dados de um evento específico             |
| POST   | /events/create/{userId}           | Cria novo evento vinculado ao usuário           |
| DELETE | /events/delete/{id}               | Remove evento pelo ID                           |

## 🧾 Formato das Requisições

### POST /users/login

```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

### POST /users/create (form-data)

| Campo      | Tipo    | Descrição                                       |
|------------|---------|-------------------------------------------------|
| name       | string  | Nome do usuário                                 |
| image      | file    | Imagem de perfil                                |
| cpf        | string  | CPF                                             |
| email      | string  | Email                                           |
| password   | string  | Senha                                           |
| phone      | string  | Telefone                                        |
| birthdate  | string  | Data de nascimento (ISO)                        |


### POST /members/create/{userId} (form-data)

| Campo            | Tipo      | Descrição                                      |
|------------------|-----------|------------------------------------------------|
| name             | string    | Nome do membro                                 |
| image            | file      | Foto do membro                                 |
| cpf              | string    | CPF                                            |
| birthdate        | string    | Data de nascimento (ISO)                       |
| healthInsurance  | string    | Convênio médico                                |
| medicalConditions | string[]  | Condições médicas (múltiplos)                  |


### POST /events/create/{userId}

```json
{
  "name": "Consulta médica",
  "date": "2025-05-10T14:00:00.000Z"
}
```

## ✅ Funcionalidades

- Autenticação com JWT
- CRUD completo para usuários, membros e eventos
- Upload de imagens com form-data
- Integração com MongoDB usando Mongoose
- Estrutura RESTful limpa e escalável

## 🧰 Tecnologias

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/mongoose-%2300f.svg?style=for-the-badge&logo=mongoose&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
