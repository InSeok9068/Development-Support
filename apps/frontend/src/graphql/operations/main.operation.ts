import { gql } from '@apollo/client/core';

const GET_USERS_QUERY = gql`
  query GetUsers {
    user {
      username
    }
  }
`;

export { GET_USERS_QUERY };
