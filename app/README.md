# Graphql Gateway

API Gateway modular escrita em `typescript` usando `graphql-yoga` permitindo a criação de 
módulos que exponham as APIs REST dos microserviços. 

## Get Started

**Criando um novo Schema:**

- 

```sh
cd ./src
mkdir NOME_DO_MODULO
cd NOME_DO_MODULO
mkdir 
git clone https://github.com/graphcool/graphql-yoga.git
cd graphql-yoga/examples/modular-resolvers
```

**Install dependencies and run the app:**

```sh
npm install # or yarn install
npm start   # or yarn start
```

## Run the Queries

Open your browser at [http://localhost:4004](http://localhost:4004) and start sending queries in the Playground.

**In the left pane, run the `welcome` Query:**

```graphql
{
  welcome(yourNickname:"Superstar")
}
```

The server returns the following response:

```json
{
  "data": {
    "welcome": "Welcome, Superstar!"
  }
}
```

**Query a specific `user` by id:**

```graphql
{
  user(id:2){
    id
    userName
    firstName
    lastName
  }
}
```

The server returns the following response:

```json
{
  "data": {
    "user": {
      "id": 2,
      "firstName": "Kimberly",
      "lastName": "Jones",
      "userName": "kim"
    }
  }
}
```

**Query all `users`:**

```graphql
{
  users{
    userName
  }
}
```

The server returns the following response:

```json
{
  "data": {
    "users": [
      {
        "userName": "john"
      },
      {
        "userName": "kim"
      }
    ]
  }
}
```

## Implementation

The merging takes place in the [/resolvers/index.ts](src/resolvers/index.ts) 
and the [/typeDefs/index.ts](./typeDefs/index.ts) files. 

Using this approach, you're free to structure resolver and typeDef files as you see fit. 

>To avoid issues, unique naming of Queries, Mutations and Subscriptions is your responsibility.

Now you can structure by **function**...
```
+-- graphql
|   +-- resolvers
|   |   +-- user.resolvers.ts/ts
|   |   +-- welcome.resolvers.ts/ts
|   |   +-- index.ts  << Merges all `*.resolvers.*` files
|   +-- typeDefs
|   |   +-- user.graphql
|   |   +-- welcome.graphql
|   |   +-- index.ts  <<< Merges all `typeDef` files
```

Or by **type**...
```
+-- graphql
|   +-- entity
|   |   +-- user
|   |   |   +-- user.graphql
|   |   |   +-- user.resolvers.ts/ts
|   |   +-- welcome
|   |   |   +-- welcome.graphql
|   |   |   +-- welcome.resolvers.ts/ts
|   |   +-- index.ts << Merges all `*.resolvers.*` and typeDef files
```