import { gql } from '@apollo/client/core';

const WORKS_QUERY = gql`
  query Works($date: String!) {
    works(date: $date) {
      id
      title
      time
      workItems {
        id
        content
        time
      }
    }
  }
`;

const CREATE_TODAY_WORK_ITEM_MUTATION = gql`
  mutation CreateTodayWorkItem($input: CreateTodayWorkItemInput!) {
    createTodayWorkItem(input: $input) {
      id
    }
  }
`;

const UPDATE_TODAY_WORK_ITEM_FOR_TRANSFER = gql`
  mutation UpdateTodayWorkItemForTransfer($input: UpdateTodayWorkItemForTransferInput!) {
    updateTodayWorkItemForTransfer(input: $input) {
      id
    }
  }
`;

const DELETE_TODAY_WORK_MUTATION = gql`
  mutation DeleteTodayWork($id: ID!) {
    deleteTodayWork(id: $id) {
      id
    }
  }
`;

const DELETE_TODAY_WORK_ITEM_MUTATION = gql`
  mutation DeleteTodayWorkItem($id: ID!) {
    deleteTodayWorkItem(id: $id) {
      id
    }
  }
`;

export {
  CREATE_TODAY_WORK_ITEM_MUTATION,
  DELETE_TODAY_WORK_ITEM_MUTATION,
  DELETE_TODAY_WORK_MUTATION,
  UPDATE_TODAY_WORK_ITEM_FOR_TRANSFER,
  WORKS_QUERY,
};
