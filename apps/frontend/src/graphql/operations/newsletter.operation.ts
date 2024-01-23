import { gql } from '@apollo/client/core';

const NEWSLETTERS_QUERY = gql`
    newsletters(input: $input) {
  query Newsletters($input: NewslettersInput!) {
      id
      title
      source
      sourceLink
      originLink
    }
  }
`;

const NOW_SCRAPING_NEWSLETTERS_MUTATION = gql`
  mutation NowScrapingNewsletters {
    nowScrapingNewsletters {
      id
    }
  }
`;

export { NEWSLETTERS_QUERY, NOW_SCRAPING_NEWSLETTERS_MUTATION };
