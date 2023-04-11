import { Translation } from "./interfaces/translation.interface";

export class GoogleTranslation implements Translation {
  getTranslatedCharacters(word: string): string {
    return word;
  }
}
