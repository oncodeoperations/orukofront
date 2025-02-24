import axios from 'axios';

interface NameTranslation {
  meaning: string;
  heritage: string;
  pronunciation: string;
  gender: string;
  significance: string;
  variations: string[];
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getHeritageSuggestions(name: string): Promise<string[]> {
  try {
    const response = await api.post<string[]>('/translate/heritage-suggestions', { name });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error(
        error.response?.data?.message ||
          'Failed to get heritage suggestions. Please try again.'
      );
    }
    throw error;
  }
}

export async function translateNameWithHeritage(name: string, heritage: string): Promise<NameTranslation> {
  try {
    const response = await api.post<NameTranslation>('/translate/translate-with-heritage', { name, heritage });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error(
        error.response?.data?.message ||
          'Failed to translate name with heritage. Please try again.'
      );
    }
    throw error;
  }
}