# CUBOS BANK
## Documentação API REST
### Visão Geral
Esta API permite que o usuário exerça algumas ações num pseudo banco. O usuário pode atualizar, criar, deletar e listar contas bancárias.

### Autenticação
Para usar esta API, os usuários devem fornecer a senha de autenticação válido de cada usuário cadastrado.

E a senha do banco para listar todas as contas.

### Requisitos
*NodeJs v18 (a LTS atual até o momento)*

### Tecnologias utilizadas
![javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![nodejs](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![expressjs](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)




### Funcionalidades
* Listagem de contas bancárias
* Criar conta bancária
* Atualizar os dados do usuário da conta bancária
* Excluir uma conta bancária
* Depositar em uma conta bancária
* Sacar de uma conta bancária
* Transferir valores entre contas bancárias
* Consultar saldo da conta bancária
* Emitir extrato bancário

### Rodar Localmente

* Clone o repositório usando a chave *ssh*

```bash

```

* Clone o repositório usando a chave *https*

```bash
    
```

* Entre na pasta

```bash
    
```

* instale as dependências

```bash
    npm install
```

* Inicie a API

```bash
    npm start
```

* Vá para a rota *3000*

```bash
    http://localhost:3000/
```

## **Endpoints**

### **Listar contas bancárias**

#### `GET` `/contas?senha_banco=123`

Essa é a rota que será utilizada para listar todas as contas bancárias existentes.

- **Requisição**

  Parâmetro do tipo query **`senha_banco`**.  
  Não deverá possuir conteúdo no corpo (body) da requisição.

#### **Exemplo de requisição**

```javascript
// GET /contas?senha_banco=senha-do-banco
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// 2 contas encontradas
[
    {
        numero: "1",
        saldo: 0,
        usuario: {
            nome: 'Foo Bar',
            cpf: '00011122233',
            data_nascimento: '2021-03-15',
            telefone: '71999998888',
            email: 'foo@bar.com',
            senha: '1234'
        }
    },
    {
        numero: "2",
        saldo: 1000,
        usuario: {
            nome: 'Foo Bar 2',
            cpf: '00011122234',
            data_nascimento: '2021-03-15',
            telefone: '71999998888',
            email: 'foo@bar2.com',
            senha: '12345'
        }
    }
]

// HTTP Status 200 / 201
// nenhuma conta encontrada
[]
```

### **Criar conta bancária**

#### `POST` `/contas`

Essa é a rota que será utilizada para criar uma conta bancária, onde será gerado um número único para identificação de cada conta.

- **Requisição**

  Sem parâmetros de rota ou de query.  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - nome
  - cpf
  - data_nascimento
  - telefone
  - email
  - senha

#### **Exemplo de requisição**

```javascript
// POST /contas
{
    "nome": "Foo Bar",
    "email": "foo@bar.com",
    "cpf": "00011122233",
    "data_nascimento": "15/03/2001",
    "telefone": "11999998888",
    "senha": "1234"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// sucesso ao cadastrar
{
    numero:  "1",
    saldo: 0,
    usuario: {
        nome: "Foo Bar",
        cpf: "00011122233",
        data_nascimento: "2001-03-15",
        telefone: "11999998888",
        email: "foo@bar.com",
        senha: "1234"
    }
}

// HTTP Status 400, 404
// erro ao cadastrar
{
    mensagem: 'Mensagem de erro'
}
```

### **Atualizar usuário da conta bancária**

#### `PUT` `/contas/:numeroConta/usuario`

Essa é a rota que será utilizada para atualizar os dados do usuário de uma conta bancária.

- **Requisição**

  Parâmetro do tipo rota **`numeroConta`**.  
  O corpo (body) deverá possuir um objeto contendo uma ou até mesmo todas as seguintes propriedades (respeitando estes nomes):

      -   nome
      -   cpf
      -   data_nascimento
      -   telefone
      -   email
      -   senha

#### **Exemplos de requisição**

```javascript
// PUT /contas/1/usuario
// informando apenas um campo para atualizar
{
    "nome": "Bar Foo"
}

// informando todos os campos para atualizar
{
    "nome": "Bar Foo",
    "email": "bar@foo.com",
    "cpf": "33322211100",
    "data_nascimento": "03/05/2010",
    "telefone": "11988889999",
    "senha": "4321"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// sucesso ao atualizar
{
  mensagem: "Conta atualizada com sucesso";
}

// HTTP Status 400, 404
// erro ao atualizar
{
  mensagem: "Mensagem de erro";
}
```

### **Excluir Conta**

#### `DELETE` `/contas/:numeroConta`

Essa é a rota que será utilizada para excluir uma conta bancária existente.

- **Requisição**

  Parâmetro do tipo rota **`numeroConta`**.
  Não deverá possuir conteúdo no corpo (body) da requisição.

#### **Exemplo de requisição**

```javascript
// DELETE /contas/1
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// sucesso ao excluir
{
  mensagem: "Conta excluída com sucesso";
}

// HTTP Status 400, 404
// erro ao excluir
{
  mensagem: "Mensagem de erro";
}
```

### **Depositar**

#### `POST` `/transacoes/depositar`

Essa é a rota que será utilizada para somar o valor do depósito ao saldo de uma conta válida e registrar essa transação.

- **Requisição**

  Sem parâmetros de rota ou de query  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - numero_conta
  - valor

#### **Exemplo de requisição**

```javascript
// POST /transacoes/depositar
{
    "numero_conta": "1",
    "valor": 10000
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// sucesso ao depositar
{
  mensagem: "Depósito realizado com sucesso";
}

// HTTP Status 400, 404
// erro ao depositar
{
  mensagem: "Mensagem de erro";
}
```

#### **Exemplo do registro de um depósito**

```javascript
{
    data: "2021-08-10 23:40:35",
    numero_conta: "1",
    valor: 10000
}
```

### **Sacar**

#### `POST` `/transacoes/sacar`

Essa é a rota que será utilizada para realizar o saque de um valor em uma determinada conta bancária e registrar essa transação.

- **Requisição**

  Sem parâmetros de rota ou de query.  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - numero_conta
  - valor
  - senha

#### **Exemplo de requisição**

```javascript
// POST /transacoes/sacar
{
    "numero_conta": "1",
    "valor": 10000,
    "senha": "1234"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// sucesso ao sacar
{
  mensagem: "Saque realizado com sucesso";
}

// HTTP Status 400, 404
// erro ao sacar
{
  mensagem: "Mensagem de erro";
}
```

#### **Exemplo do registro de um saque**

```javascript
{
    data: "2021-08-10 23:40:35",
    numero_conta: "1",
    valor: 10000
}
```

### **Transferir**

#### `POST` `/transacoes/transferir`

Essa é a rota que será utilizada para para realizar a transferência de saldo de uma conta bancária para outra e registrar essa transação.

- **Requisição**

  Sem parâmetros de rota ou de query.  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - numero_conta_origem
  - numero_conta_destino
  - valor
  - senha

#### **Exemplo de requisição**

```javascript
// POST /transacoes/transferir
{
    "numero_conta_origem": "1",
    "numero_conta_destino": "1",
    "valor": 10000,
    "senha": "1234"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// sucesso ao transferir
{
  mensagem: "Transferência realizado com sucesso";
}

// HTTP Status 400, 404
// erro ao transferir
{
  mensagem: "Mensagem de erro";
}
```

#### **Exemplo do registro de uma transferência**

```javascript
{
    data: "2021-08-10 23:40:35",
    numero_conta_origem: "1",
    numero_conta_destino: "2",
    valor: 10000
}
```

### **Consultar Saldo**

#### `GET` `/contas/saldo?numero_conta=123&senha=123`

Essa é a rota que será utilizada para retornar o saldo de uma conta bancária.

- **Requisição**

  Parâmetros do tipo query:

  - numero_conta.
  - senha.  
    Não deverá possuir conteúdo no corpo (body) da requisição.

#### **Exemplo de requisição**

```javascript
// GET /contas/saldo?numero_conta=numero-da-conta&senha=senha-da-conta
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// sucesso ao obter saldo
{
  saldo: 10000;
}

// HTTP Status 400, 404
// erro ao obter saldo
{
  mensagem: "Mensagem de erro";
}
```

### Extrato

#### `GET` `/contas/extrato?numero_conta=123&senha=123`

Essa é a rota que será utilizada para listar as transações realizadas de uma conta específica.

- **Requisição**

  Parâmetros do tipo query:

  - numero_conta.
  - senha.  
    Não deverá possuir conteúdo no corpo (body) da requisição.

#### **Exemplo de requisição**

```javascript
// GET /contas/extrato?numero_conta=numero-da-conta&senha=senha-da-conta
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
// sucesso ao obter extrato
{
  depositos: [
    {
      data: "2021-08-18 20:46:03",
      numero_conta: "1",
      valor: 10000
    },
    {
      data: "2021-08-18 20:46:06",
      numero_conta: "1",
      valor: 10000
    }
  ],
  saques: [
    {
      data: "2021-08-18 20:46:18",
      numero_conta: "1",
      valor: 1000
    }
  ],
  transferenciasEnviadas: [
    {
      data: "2021-08-18 20:47:10",
      numero_conta_origem: "1",
      numero_conta_destino: "2",
      valor: 5000
    }
  ],
  transferenciasRecebidas: [
    {
      data: "2021-08-18 20:47:24",
      numero_conta_origem: "2",
      numero_conta_destino: "1",
      valor: 2000
    },
    {
      data: "2021-08-18 20:47:26",
      numero_conta_origem: "2",
      numero_conta_destino: "1",
      valor: 2000
    }
  ]
}

// HTTP Status 400, 404
// erro ao obter extrato
{
    mensagem: 'Mensagem do erro!'
}
```
<br>

### Agradecimentos

Espero que tenham gostado do projeto, qualquer dúvida estou a disposição :D
<br> 

## Para me encontrar:

[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/matheus-tavares-viana/)
<a href="mailto:tavaresviana82@gmail.com">
  <img src="https://media.tenor.com/0gV2Cl5u1bQAAAAi/cute-mail.gif" width="50px" />
</a>



