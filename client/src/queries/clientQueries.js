import { gql } from "@apollo/client";
export const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      phone
      email
    }
  }
`;

export const GET_CLIENT = gql`
  query getClient($id: ID!) {
    client(id: $id) {
      id
      name
      phone
      email
      projects {
        id
        name
        status
      }
    }
  }
`;
