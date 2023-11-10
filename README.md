#Test tecnico - Fluxstation

## Description

A aplicação realiza um cadastro de usuário e listagem:

![alt text](https://i.imgur.com/vCr3cng.png)

Bem como uma tela de edição, onde é possível lançar um valor de abastecimento de acordo com os dados informados:

![alt text](https://i.imgur.com/RKRqSid.png)

As tecnologias utilizadas foram:

#### Frontend
  - NextJs 14 com Typescript
  - React Hook Form
  - SWR
  - Axios
  - Tailwind Css
  - Jest

#### Backend
  - NestJS com Typescript
  - Prisma
  - Swagger
  - Jest

#### Bando de dados
  - Postgres
  - Docker

## Rodar o app

Frontend:
```bash
$ npm install
$ npm run build
$ npm run start
```

Backend:
```bash
$ npm install
$ docker-compose up -d
$ npx prisma migrate dev
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test
```

## Desenvolvimento do projeto

Os end-points desenvolvidos foram:

  - User => "/user"
  - Abastecimentos => "/abastecimentos"

    * Após rodar o backend, acessar a url [http://localhost:3000/api/](http://localhost:3010/api/) para visualizar o Swagger.

Apesar de ter feito todo o CRUD para cada end-point, somente utilizei no front o que foi necessário para preencher os requisitos:

  - CreateUser => POST => /user
  - GetAllUsers => GET => /user
  - GetUserById => GET => /user/:id
  - CreateAbastecimento => POST => /abastecimentos

Na criação de um abastecimento, o userId é informado e o banco relaciona as entidades, retornando no getUser um array com todos o seu histórico de abastecimentos conforme o DTO abaixo:

```bash
type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  abastecimentos: Abastecimento[];
};
```

Os testes realizados foram sobre todas as requisições das services no backend.

Foram realizadas as validações necessárias nos formulários do frontend.

O backend está com tratativa de erros para todos os endpoints.

