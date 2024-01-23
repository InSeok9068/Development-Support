import { llamaApiCompletions } from '@/services/llama.api.service';
import { NameSuggestionsInput } from '@support/shared/types';

const nameSuggestions = async (input: NameSuggestionsInput) => {
  const completionsResult = await llamaApiCompletions({
    prompt: `
    LANG : ${input.lang}\n
    TPYE : ${input.type}\n
    CRUD : ${input.crud}\n\n

    Think of it as a naming service and recommend naming it as below\n\n

    The key word is ${input.input}\n\n

    ※ Like the example below, recommend me up to 5th place\n\n

    example)\n
    1. createText\n
    2. registText\n
    3. makeText\n
    4. text\n
    5. textGenerate\n
    `,
  });

  return completionsResult.choices[0].text;
};

export { nameSuggestions };
