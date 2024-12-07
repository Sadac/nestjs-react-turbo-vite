## Project setup

```bash
$ npm install
```

## Check .env file

Remember you need to setup your DATABASE_URL connection string in order to be able to connect to your local database instance
https://youtu.be/HLoTP_ZBEY4?t=756

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Seed

Execute the command `npx prisma db seed` to run the prisma/seeder.ts file

## Generate and apply a migration

Execute the command `npx prisma migrate dev --name <migration_name>` to automatically generate and apply a migration after a change on the schema.prisma file

## Run tests

Execute the commnad `npm run test`
