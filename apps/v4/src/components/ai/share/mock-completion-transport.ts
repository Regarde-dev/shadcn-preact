/**
 * Mock Completion Transport
 * 
 * Simulates AI text completion responses for testing without a backend.
 * Generates realistic streaming text completions with delays.
 */

import type { CompletionTransport } from '../hooks/useCompletion';

/**
 * Mock completion responses for different prompts
 */
const MOCK_COMPLETIONS: Record<string, string> = {
  story: "Once upon a time, in a land far away, there lived a brave knight who embarked on an epic quest to save the kingdom from an ancient dragon. The journey was long and perilous, filled with challenges that tested both courage and wisdom.",
  code: "function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\n// Example usage:\nconsole.log(fibonacci(10)); // Output: 55",
  poem: "Roses are red,\nViolets are blue,\nAI is amazing,\nAnd so are you!\n\nIn circuits and code,\nWe find our way,\nCreating tomorrow,\nStarting today.",
  default: "This is a mock AI completion response. The text streams character by character to simulate real AI behavior. You can customize the prompt to see different responses!",
};

/**
 * Get a mock completion based on the prompt
 */
function getMockCompletion(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase().trim();
  
  if (lowerPrompt.includes('story') || lowerPrompt.includes('tale')) {
    return MOCK_COMPLETIONS.story!;
  }
  if (lowerPrompt.includes('code') || lowerPrompt.includes('function') || lowerPrompt.includes('fibonacci')) {
    return MOCK_COMPLETIONS.code!;
  }
  if (lowerPrompt.includes('poem') || lowerPrompt.includes('verse')) {
    return MOCK_COMPLETIONS.poem!;
  }
  
  return MOCK_COMPLETIONS.default!;
}

/**
 * Create a streaming completion response
 * Returns a stream of text chunks (not SSE-formatted)
 */
function createMockCompletionStream(completionText: string): ReadableStream<string> {
  let index = 0;

  return new ReadableStream<string>({
    async start(controller) {
      try {
        // Stream text character by character
        while (index < completionText.length) {
          // Simulate typing delay (faster for spaces, slower for other chars)
          const char = completionText[index]!;
          const delay = char === ' ' ? 20 : char === '\n' ? 50 : Math.random() * 50 + 30;
          await new Promise((resolve) => setTimeout(resolve, delay));

          // Send text chunk
          controller.enqueue(char);

          index++;
        }

        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });
}

/**
 * Mock Completion Transport
 * Simulates backend API responses for text completion
 */
export class MockCompletionTransport implements CompletionTransport {
  async complete({
    prompt,
  }: {
    prompt: string;
    abortSignal?: AbortSignal;
    headers?: Record<string, string> | Headers;
    body?: object;
  }): Promise<ReadableStream<string>> {
    try {
      // Generate mock completion based on prompt
      const completionText = getMockCompletion(prompt);

      // Return streaming response
      return createMockCompletionStream(completionText);
    } catch (error) {
      console.error('MockCompletionTransport error:', error);
      throw error;
    }
  }
}

