import { gql } from '@apollo/client/core';

const WORKS_QUERY = gql`
  query Works($input: WorksInput!) {
    works(input: $input) {
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

const DELETE_TODAY_WORK_ITEM_MUTATION = gql`
  mutation DeleteTodayWorkItem($id: ID!) {
    deleteTodayWorkItem(id: $id) {
      id
    }
  }
`;

const SEND_WEEKLY_REPORT_MUTATION = gql`
  mutation SendWeeklyReport {
    sendWeeklyReport
  }
`;

const SUGGESTIONS_QUERY = gql`
  query Suggestions($input: SuggestionsInput!) {
    suggestions(input: $input) {
      title
    }
  }
`;

export {
  CREATE_TODAY_WORK_ITEM_MUTATION,
  DELETE_TODAY_WORK_ITEM_MUTATION,
  SEND_WEEKLY_REPORT_MUTATION,
  SUGGESTIONS_QUERY,
  UPDATE_TODAY_WORK_ITEM_FOR_TRANSFER,
  WORKS_QUERY,
};
