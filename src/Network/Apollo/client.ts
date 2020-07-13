import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: '/graphql',
    // uri: 'http://lancincatalog.me/graphql',
    request: (operation) => {
        const token = localStorage.getItem('logTok');
            operation.setContext({
                headers: {
                    ...(token && {Authorization: `Bearer ${token}`}),
                },
            });
    }
});

export default client;