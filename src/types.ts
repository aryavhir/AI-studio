export interface GenerationRequest {
  imageDataUrl: string;
  prompt: string;
  style: string;
}

export interface GenerationResponse {
  id: string;
  imageUrl: string;
  prompt: string;
  style: string;
  createdAt: string;
}

export interface GenerationError {
  message: string;
}

export interface HistoryItem extends GenerationResponse {}

export type StyleOption = {
  value: string;
  label: string;
};

export const STYLE_OPTIONS: StyleOption[] = [
  { value: 'editorial', label: 'Editorial' },
  { value: 'streetwear', label: 'Streetwear' },
  { value: 'vintage', label: 'Vintage' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'artistic', label: 'Artistic' },
];