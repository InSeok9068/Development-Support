import { gql } from '@apollo/client/core';

export const GET_WORKS_QUERY = gql`
  query GetWorks {
    works {
      id
      title
      workItems {
        id
        content
      }
    }
  }
`;

export const CREATE_TODAY_WORK_MUTATION = gql`
  mutation CreateTodayWork($input: CreateTodayWorkInput!) {
    createTodayWork(input: $input) {
      title
    }
  }
`;
