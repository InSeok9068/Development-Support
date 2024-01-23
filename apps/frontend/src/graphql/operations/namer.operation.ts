import { gql } from '@apollo/client/core';

const NAME_SUGGESTIONS_QUERY = gql`
  query NameSuggestions($input: NameSuggestionsInput!) {
    nameSuggestions(input: $input)
  }
`;

export { NAME_SUGGESTIONS_QUERY };
