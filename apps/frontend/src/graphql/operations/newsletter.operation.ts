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

const NOW_SCRAPING_NEWSLETTERS_MUTATION = gql`
  mutation NowScrapingNewsletters {
    nowScrapingNewsletters {
      id
    }
  }
`;

export { NEWSLETTERS_QUERY, NOW_SCRAPING_NEWSLETTERS_MUTATION };
