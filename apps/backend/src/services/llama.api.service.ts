import {
  LlamaApiChatCompletionsRequest,
  LlamaApiChatCompletionsResponse,
  LlamaApiCompletionsRequest,
  LlamaApiCompletionsResponse,
} from '@/types/llama.api.type';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const llamaApiCompletions = async (param: LlamaApiCompletionsRequest) => {
  const reponse = await axios.post<LlamaApiCompletionsResponse>(process.env.LLAMA_API_URL + '/v1/completions', param);
  return reponse.data;
};

const llamaApiChatCompletions = async (param: LlamaApiChatCompletionsRequest) => {
  const reponse = await axios.post<LlamaApiChatCompletionsResponse>(
    process.env.LLAMA_API_URL + '/v1/chat/completions',
    param,
  );
  return reponse.data;
};

export { llamaApiChatCompletions, llamaApiCompletions };
