import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink
} from '@apollo/client';
import { getMainDefinition } from "apollo-utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { ConfigProvider } from 'antd';


const API_ROOT =  
  process.env.NODE_ENV === "production" 
    ? "/graphql"  
    : "http://localhost:4000/graphql";  

// Create an http link:
const httpLink = new HttpLink({
  uri: API_ROOT,
  credentials: 'include', // indicates the server that we would need to pass cookie info for each request
});

// Create a WebSocket link:
const wsLink = new GraphQLWsLink(createClient({
  uri: `ws://localhost:4000/subscriptions`,
  options: {
    lazy: true,
    // credentials
    reconnect: true,
    connectionParams: {
      credentials: 'include',
    },
  },
}));

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const splitLink = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#90b12f',
            //colorSecondary: "#e790b3",
            colorPrimaryBg: "#ffffff",
          },
        }}
      >
        <App />
      </ConfigProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);