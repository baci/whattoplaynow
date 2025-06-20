import apiClient from './client';
import type { Question } from '../types';

export const getQuestions = async (): Promise<Question[]> => {
  const response = await apiClient.get<Question[]>('/questions');
  return response.data;
}; 