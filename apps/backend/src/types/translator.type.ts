export interface TranslatorRequest {
  text: string;
  source: 'ko' | 'en';
  target: 'ko' | 'en';
}

export interface Translator {
  translateText(param: TranslatorRequest): Promise<string>;
}

export interface NaverTranslatorRequest {
  source: string;
  target: string;
  text: string;
}

export interface NaverTranslatorResponse {
  message: {
    '@type': string;
    '@service': string;
    '@version': string;
    result: {
      srcLangType: string;
      tarLangType: string;
      translatedText: string;
    };
  };
}
