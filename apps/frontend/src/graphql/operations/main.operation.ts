import { gql } from '@apollo/client/core';

export const getUsers = gql`
  query getUsers {
    user {
      username
    }
  }
`;
