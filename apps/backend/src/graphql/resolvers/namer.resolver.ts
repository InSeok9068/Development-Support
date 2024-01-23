import { nameSuggestions } from '@/services/namer.service';
import { QueryNameSuggestionsArgs } from '@support/shared/types';

const resolvers = {
  Query: {
    nameSuggestions: async (_: unknown, args: QueryNameSuggestionsArgs) => {
      return await nameSuggestions(args.input);
    },
  },
};

export { resolvers };
