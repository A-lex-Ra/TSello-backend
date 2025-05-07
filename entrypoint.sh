#!/bin/bash

# run PostgreSQL
service postgresql start

# create user and db
su - postgres -c "psql -tc \"SELECT 1 FROM pg_roles WHERE rolname='${POSTGRES_USER}'\" | grep -q 1 || psql -c \"CREATE USER ${POSTGRES_USER} WITH PASSWORD '${POSTGRES_PASSWORD}';\""
su - postgres -c "psql -lqt | cut -d \| -f 1 | grep -qw ${POSTGRES_DB} || psql -c \"CREATE DATABASE ${POSTGRES_DB} OWNER ${POSTGRES_USER};\""

# prisma migrations
npx prisma generate
npx prisma migrate deploy

# run NestJS
npm run start:prod

