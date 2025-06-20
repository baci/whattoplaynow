import apiClient from './client';
import type { Recommendation, UserAnswer } from '../types';

export const getRecommendations = async (answers: UserAnswer[]): Promise<Recommendation[]> => {
  const answersQueryString = answers
    .map(a => `${a.questionId}:${a.answer}`)
    .join(',');

  const response = await apiClient.get<Recommendation[]>('/recommendations', {
    params: { answers: answersQueryString },
  });
  return response.data;
}; 