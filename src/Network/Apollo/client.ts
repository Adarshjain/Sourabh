import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: '/graphql',
    // uri: 'http://localhost:9002/graphql',
});

export default client;