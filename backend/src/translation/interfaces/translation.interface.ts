export interface Translation {
  getTranslatedCharacters(word: string): Promise<string>;
}
