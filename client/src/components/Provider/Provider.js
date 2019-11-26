import React from 'react';
import Router from '../Router/Router';
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

const Provider = () => {
    return (
        <ApolloProvider client={client}>
            <Router />
        </ApolloProvider>
    );
};

export default Provider;
