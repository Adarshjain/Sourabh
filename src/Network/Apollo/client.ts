import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: '/graphql',
    // uri: 'http://suniljewellerscatalog-env.eba-qzd8ixja.ap-south-1.elasticbeanstalk.com/graphql',
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