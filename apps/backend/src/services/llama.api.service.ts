import {
  LlamaApiChatCompletionsRequest,
  LlamaApiChatCompletionsResponse,
  LlamaApiCompletionsRequest,
  LlamaApiCompletionsResponse,
} from '@/types/llama.api.type';
import axios from 'axios';

const llamaApiCompletions = async (param: LlamaApiCompletionsRequest) => {
  const reponse = await axios.post<LlamaApiCompletionsResponse>(process.env.LLAMA_API_URL + '/v1/completions', {
    max_tokens: 100,
    ...param,
  });
  return reponse.data;
};

const llamaApiChatCompletions = async (param: LlamaApiChatCompletionsRequest) => {
  const reponse = await axios.post<LlamaApiChatCompletionsResponse>(
    process.env.LLAMA_API_URL + '/v1/chat/completions',
    {
      max_tokens: 100,
      ...param,
    },
  );
  return reponse.data;
};

export { llamaApiChatCompletions, llamaApiCompletions };
