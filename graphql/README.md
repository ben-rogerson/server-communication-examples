# 🌱 Culinary Florae App - GraphQL Edition

This is a simple GraphQL based app to create, read, update and delete culinary florae from Australia.

## Run locally

You'll need to run two processes - one for the server and one for the client.

### Get started

After cloning the repo, cd into the folder and run the following:

```shell
# 1. Start the node graphql server and generate the types from the schema
cd server && npm install && npm run generate && npm start
# 2. Start the vite client as a parallel process
cd client && npm install && npm run dev
```

## Tech stack

- GraphQL
- TypeScript
- Vite
- React
- TailwindCSS
- Apollo Client
- Apollo Server
- GraphQL Codegen
- Zod
- React Router
