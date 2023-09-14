import { gql } from '@apollo/client/core';

export const GET_USERS_QUERY = gql`
  query GetUsers {
    user {
      username
    }
  }
`;
