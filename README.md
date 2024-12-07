# Monorepo

Base fullstack project managed with Turborepo

### API

NestJS

### Databse

PostgreSQL wrapped on Prisma

### Web

React application generated with [Vite](https://vite.dev/guide/) `npm create vite@latest web --template react-ts`

### Installing dependencies

Set workspace to define the dependency place. Dependencies must be installed from root folder outside all apps.
`npm install --save [dependency] --workspace api`

### Serve app

NestJS is serving the web app as static module in app.module.ts
