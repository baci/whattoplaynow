export interface Question {
  id: number;
  questionText: string;
  positiveAnswerTag: string;
  negativeAnswerTag: string;
}

export interface Recommendation {
  id: number;
  gameTitle: string;
  tags: string[];
  steamId: string;
  youtubeVideoId: string;
  cdkeysId: string;
}

export interface UserAnswer {
  questionId: number;
  answer: 'positive' | 'negative';
} 