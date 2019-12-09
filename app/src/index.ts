import { GraphQLServer } from 'graphql-yoga';
import { default as types } from './types';
import { default as resolvers } from './resolvers';

const server = new GraphQLServer({
    typeDefs: types,
    resolvers
});

const options = { port: 3001 };
server.start(options, () =>
    console.log(`Server is running ⚡ on localhost:${options.port}`),
)
.catch(err => console.error('connection Error', err));



