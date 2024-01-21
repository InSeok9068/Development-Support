import { llamaApiCompletions } from '@/services/llama.api.service';
import { naverTranslatorService } from '@/services/translators/naver.translator.service';

const aiSummary = async (text: string) => {
  const translationResult = await naverTranslatorService.translateText({
    text,
    source: 'ko',
    target: 'en',
  });

  const completionsResult = await llamaApiCompletions({
    prompt: `\n\n### Instructions:\nCan you summarize the following sentence?\n ${translationResult}\n\n### Response:\n`,
    stop: ['\n', '###'],
  });

  return await naverTranslatorService.translateText({
    text: completionsResult.choices[0].text,
    source: 'en',
    target: 'ko',
  });
};

export { aiSummary };
