<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Description

[Nest](https://github.com/nestjs/nest) framework implemented trello-like backend. And [test frontend also](https://github.com/A-lex-Ra/TSello-frontend)

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Database structure

Described in [Prisma Scheme](./prisma/schema.prisma). 
#### Database initialization
1) Update file ".env", adding database connection string:
```
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```
Where `user, password, localhost & dbname` replaced with real values (of your DB).

2) Apply Prisma:
```
npx prisma migrate dev --name init
```
