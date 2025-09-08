import { GenerationRequest, GenerationResponse, GenerationError } from '../types';

// Simulated API endpoint
export const generateImage = async (
  request: GenerationRequest,
  signal?: AbortSignal
): Promise<GenerationResponse> => {
  // Simulate API delay (1-2 seconds)
  const delay = Math.random() * 1000 + 1000;
  
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(resolve, delay);
    
    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timeout);
        reject(new Error('Request aborted'));
      });
    }
  });

  // Check if request was aborted
  if (signal?.aborted) {
    throw new Error('Request aborted');
  }

  // 20% chance of error
  if (Math.random() < 0.2) {
    const error: GenerationError = { message: 'Model overloaded' };
    throw new Error(error.message);
  }

  // Generate mock response
  const response: GenerationResponse = {
    id: generateId(),
    imageUrl: generateMockImageUrl(request.style),
    prompt: request.prompt,
    style: request.style,
    createdAt: new Date().toISOString(),
  };

  return response;
};

// Generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Generate a mock image URL based on style
const generateMockImageUrl = (style: string): string => {
  // Generate different mock images based on style
  const styleColors = {
    editorial: 'e8e8e8',
    streetwear: 'ff6b6b',
    vintage: 'd4a574',
    minimalist: 'f5f5f5',
    artistic: '9b59b6',
  };
  
  const color = styleColors[style as keyof typeof styleColors] || 'cccccc';
  const width = 512;
  const height = 512;
  
  // Using a placeholder service that generates images
  return `https://via.placeholder.com/${width}x${height}/${color}/ffffff?text=${style.toUpperCase()}`;
};