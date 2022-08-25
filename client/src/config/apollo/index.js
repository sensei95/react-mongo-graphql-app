import { InMemoryCache, useApolloClient } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new useApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

export default client;
