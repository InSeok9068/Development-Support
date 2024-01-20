export interface Translator {
  translateText(text: string): Promise<string>;
}
