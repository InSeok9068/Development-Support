import { gql } from '@apollo/client/core';

const WORKS_QUERY = gql`
  query Works {
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

const CREATE_TODAY_WORK_ITEM_MUTATION = gql`
  mutation CreateTodayWorkItem($input: CreateTodayWorkItemInput!) {
    createTodayWorkItem(input: $input) {
      title
    }
  }
`;

export { CREATE_TODAY_WORK_ITEM_MUTATION, WORKS_QUERY };
