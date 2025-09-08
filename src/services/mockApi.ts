// Mock API service for AI image generation

export interface GenerateRequest {
  imageDataUrl?: string | null;
  prompt: string;
  style: string;
}

export interface GenerateResponse {
  id: string;
  imageUrl: string;
  prompt: string;
  style: string;
  createdAt: string;
}

export interface GenerateError {
  message: string;
}

// Mock generated image URLs for demonstration
const mockImageUrls = [
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=512&h=512&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=512&h=512&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1590273722082-9ff2a5d9b7a9?w=512&h=512&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=512&h=512&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=512&h=512&fit=crop&crop=faces'
];

export class MockApiService {
  private static instance: MockApiService;
  private abortController: AbortController | null = null;

  static getInstance(): MockApiService {
    if (!MockApiService.instance) {
      MockApiService.instance = new MockApiService();
    }
    return MockApiService.instance;
  }

  // Generate a mock API call with delay and error simulation
  async generateImage(request: GenerateRequest): Promise<GenerateResponse> {
    // Create new AbortController for this request
    this.abortController = new AbortController();
    
    return new Promise((resolve, reject) => {
      // Random delay between 1-2 seconds
      const delay = Math.random() * 1000 + 1000;
      
      const timeoutId = setTimeout(() => {
        // 20% chance of error
        if (Math.random() < 0.2) {
          reject(new Error('Model overloaded'));
          return;
        }

        // Success response
        const response: GenerateResponse = {
          id: `gen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          imageUrl: mockImageUrls[Math.floor(Math.random() * mockImageUrls.length)],
          prompt: request.prompt,
          style: request.style,
          createdAt: new Date().toISOString()
        };

        resolve(response);
      }, delay);

      // Handle abort
      this.abortController?.signal.addEventListener('abort', () => {
        clearTimeout(timeoutId);
        reject(new Error('Request aborted'));
      });
    });
  }

  // Abort current request
  abort(): void {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  // Check if there's an active request
  isRequestActive(): boolean {
    return this.abortController !== null;
  }
}

// Retry logic with exponential backoff
export class RetryableApiService {
  private static instance: RetryableApiService;
  private mockApi: MockApiService;
  private maxRetries = 3;
  private baseDelay = 1000; // 1 second base delay

  constructor() {
    this.mockApi = MockApiService.getInstance();
  }

  static getInstance(): RetryableApiService {
    if (!RetryableApiService.instance) {
      RetryableApiService.instance = new RetryableApiService();
    }
    return RetryableApiService.instance;
  }

  async generateWithRetry(
    request: GenerateRequest,
    onRetry?: (attempt: number, error: string) => void
  ): Promise<GenerateResponse> {
    let lastError: Error = new Error('Unknown error');

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const response = await this.mockApi.generateImage(request);
        return response;
      } catch (error) {
        lastError = error as Error;
        
        // Don't retry if request was aborted
        if (lastError.message === 'Request aborted') {
          throw lastError;
        }

        // Don't retry on last attempt
        if (attempt === this.maxRetries) {
          break;
        }

        // Calculate exponential backoff delay
        const retryDelay = this.baseDelay * Math.pow(2, attempt - 1);
        
        // Notify about retry
        if (onRetry) {
          onRetry(attempt, lastError.message);
        }

        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }

    // All retries exhausted, throw the last error
    throw lastError;
  }

  abort(): void {
    this.mockApi.abort();
  }

  isRequestActive(): boolean {
    return this.mockApi.isRequestActive();
  }
}

export default RetryableApiService;