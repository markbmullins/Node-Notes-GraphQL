import React from 'react';
import App from './components/App/App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

const httpLink = createHttpLink({
    uri: 'http://localhost:3001/graphql'
});

//link: authLink.concat(httpLink),
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

export default (
    () => { 
        return (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>);
    }
);
