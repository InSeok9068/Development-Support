import { llamaApiCompletions } from '@/services/llama.api.service';
import { describe, expect, test } from 'vitest';

describe('Llama API 테스트', () => {
  test('/v1/completions', async () => {
    const result = await llamaApiCompletions({
      prompt: '\n\n### Instructions:\nWhat is the capital of France?\n\n### Response:\n',
      stop: ['\n', '###'],
    });

    expect(result.choices[0].text).toBeTypeOf('string');
  });
});
