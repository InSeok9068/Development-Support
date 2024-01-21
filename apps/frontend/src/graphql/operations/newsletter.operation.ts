import { gql } from '@apollo/client/core';

const NEWSLETTERS_QUERY = gql`
  query Newsletters($input: NewslettersInput!) {
    newsletters(input: $input) {
      id
      title
      source
      sourceLink
      originLink
    }
  }
`;

export { NEWSLETTERS_QUERY };
