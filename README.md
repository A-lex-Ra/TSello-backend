<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Description

[Nest](https://github.com/nestjs/nest) framework implemented trello-like backend. And [test frontend also](https://github.com/A-lex-Ra/TSello-frontend)

## Project setup

:warning: **Important:** Before running the container, make sure to place your SSL certificates in `./src/cert`, named exactly as `certificate.crt` and `private.key`. Self-signed certificates should work fine for local testing.

---

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

### Docker

**Intended for testing only**, the backend and PostgreSQL will start together in a single container.
A default database (`mydb`) and user (`myuser` / `mypassword`) will be created automatically.
The Prisma migrations will be applied on startup.

Build the image:

```bash
docker build -t tsello-backend .
```

Run the container (exposing port 443):

```bash
docker run -p 443:443 tsello-backend
```

> ⚠️ For testing and development only. Not recommended for production.
