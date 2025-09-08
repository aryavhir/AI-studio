import { HistoryItem } from '../types';

const STORAGE_KEY = 'imageGenHistory';
const MAX_HISTORY_ITEMS = 5;

export const saveToHistory = (item: HistoryItem): void => {
  try {
    const existing = getHistory();
    const updated = [item, ...existing.filter(h => h.id !== item.id)].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save to history:', error);
  }
};

export const getHistory = (): HistoryItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load history:', error);
    return [];
  }
};

export const clearHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
};