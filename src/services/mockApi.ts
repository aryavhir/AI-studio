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

  // Generate an API call - tries real endpoint first, falls back to mock
  async generateImage(request: GenerateRequest): Promise<GenerateResponse> {
    // Create new AbortController for this request
    this.abortController = new AbortController();
    
    // Log the API call attempt
    console.log('🚀 Real API Call Attempt:', {
      method: 'POST',
      url: '/api/generate',
      payload: request,
      timestamp: new Date().toISOString()
    });

    try {
      // Try real API call first with 3-second timeout
      const realApiResponse = await this.tryRealApiCall(request);
      return realApiResponse;
    } catch (error) {
      console.log('⚠️ Real API failed, falling back to mock response:', (error as Error).message);
      // Fall back to mock response
      return this.generateMockResponse(request);
    }
  }

  // Try to make a real API call with timeout
  private async tryRealApiCall(request: GenerateRequest): Promise<GenerateResponse> {
    const controller = this.abortController!;
    
    // Create a promise that rejects after 3 seconds
    const timeoutPromise = new Promise<never>((_, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('API call timeout (3 seconds)'));
      }, 3000);
      
      // Clear timeout if aborted
      controller.signal.addEventListener('abort', () => {
        clearTimeout(timeoutId);
        reject(new Error('Request aborted'));
      });
    });

    // Create the actual fetch promise
    const fetchPromise = fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageDataUrl: request.imageDataUrl,
        prompt: request.prompt,
        style: request.style
      }),
      signal: controller.signal
    }).then(async response => {
      if (!response.ok) {
        throw new Error(`API responded with ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Real API Success Response:', data);
      return data as GenerateResponse;
    });

    // Race between fetch and timeout
    return Promise.race([fetchPromise, timeoutPromise]);
  }

  // Generate mock response (fallback)
  private async generateMockResponse(request: GenerateRequest): Promise<GenerateResponse> {
    console.log('🎭 Using Mock Response Fallback');
    
    return new Promise((resolve, reject) => {
      // Random delay between 1-2 seconds for mock
      const delay = Math.random() * 1000 + 1000;
      console.log(`⏳ Mock response delay: ${Math.round(delay)}ms`);
      
      const timeoutId = setTimeout(() => {
        // 20% chance of error in mock
        if (Math.random() < 0.2) {
          console.log('❌ Mock Response Error:', { error: 'Model overloaded' });
          reject(new Error('Model overloaded'));
          return;
        }

        // Success mock response
        const response: GenerateResponse = {
          id: `gen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          imageUrl: mockImageUrls[Math.floor(Math.random() * mockImageUrls.length)],
          prompt: request.prompt,
          style: request.style,
          createdAt: new Date().toISOString()
        };

        console.log('✅ Mock Response Success:', response);
        resolve(response);
      }, delay);

      // Handle abort
      this.abortController?.signal.addEventListener('abort', () => {
        console.log('🛑 Mock Response Aborted');
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
        
        console.log(`🔄 Retrying API call (${attempt}/${this.maxRetries}) after ${retryDelay}ms delay. Error: ${lastError.message}`);
        
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