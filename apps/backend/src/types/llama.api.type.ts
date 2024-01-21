interface LlamaCommonResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface LlamaApiCompletionsResponse extends LlamaCommonResponse {
  choices: {
    text: string;
    index: number;
    logprobs: {
      text_offset: number[];
      token_logprobs: (number | null)[];
      tokens: string[];
      top_logprobs: ({ [key: string]: number } | null)[];
    };
    finish_reason: string;
  }[];
}

export interface LlamaApiChatCompletionsResponse extends LlamaCommonResponse {
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
      user: string;
    };
    finish_reason: string;
  }[];
}

export interface LlamaApiCompletionsRequest {
  prompt: string;
  stop: string[];
}

export interface LlamaApiChatCompletionsMessage {
  content: string;
  role: string;
}

export interface LlamaApiChatCompletionsRequest {
  messages: LlamaApiChatCompletionsMessage[];
}
