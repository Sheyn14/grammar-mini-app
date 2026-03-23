export interface VocabularyWord {
  id: string;
  word: string;
  pronunciation?: string;
  partOfSpeech?: string;
  uzbekTranslation: string;
  definition: string;
  synonyms?: string[];
  example?: string;
  note?: string;
}

export interface VocabularyUnit {
  id: string;
  levelId: string;
  unitId: string;
  title: string;
  description?: string;
  words: VocabularyWord[];
}
