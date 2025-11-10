/**
 * Mock Chat Transport
 *
 * Simulates AI streaming responses for testing without a backend.
 * Generates realistic streaming text responses with delays.
 */

import type { UIMessage, UIMessageChunk } from 'ai';
import type { ChatTransport } from 'ai';

/**
 * Mock responses for different user inputs
 */
const MOCK_RESPONSES: Record<string, string> = {
  hello: "Hello! I'm a mock AI assistant. I'm here to help you test the useChat hook implementation. How can I assist you today?",
  help: "I can help you with:\n- Testing the chat interface\n- Demonstrating streaming responses\n- Showing how the useChat hook works\n\nJust type any message and I'll respond!",
  test: "This is a test response! The streaming is working correctly. Each character appears one by one to simulate a real AI response.",
  default: "Thanks for your message! I'm a mock AI assistant running locally. In a real implementation, I would be powered by an AI model like GPT-4, Claude, or Llama. For now, I'm just simulating responses to help you test the interface.",
};

/**
 * Get a mock response based on user input
 */
function getMockResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase().trim();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return MOCK_RESPONSES.hello!;
  }
  if (lowerMessage.includes('help')) {
    return MOCK_RESPONSES.help!;
  }
  if (lowerMessage.includes('test')) {
    return MOCK_RESPONSES.test!;
  }

  return MOCK_RESPONSES.default!;
}

/**
 * Create a streaming response that simulates AI text generation
 * Returns UIMessageChunk objects directly (not SSE-encoded bytes)
 */
function createMockStream(responseText: string, messageId: string): ReadableStream<UIMessageChunk> {
  let index = 0;

  return new ReadableStream<UIMessageChunk>({
    async start(controller) {
      try {
        // Send start chunk
        controller.enqueue({
          type: 'start',
          messageId,
        });

        // Send text-start chunk
        controller.enqueue({
          type: 'text-start',
          id: 'text-0',
        });

        // Stream text character by character
        while (index < responseText.length) {
          // Simulate typing delay (faster for spaces, slower for other chars)
          const char = responseText[index]!;
          const delay = char === ' ' ? 20 : Math.random() * 50 + 30;
          await new Promise((resolve) => setTimeout(resolve, delay));

          // Send text-delta chunk
          controller.enqueue({
            type: 'text-delta',
            id: 'text-0',
            delta: char,
          });

          index++;
        }

        // Send text-end chunk
        controller.enqueue({
          type: 'text-end',
          id: 'text-0',
        });

        // Send finish chunk
        controller.enqueue({
          type: 'finish',
        });

        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });
}

/**
 * Mock Chat Transport
 * Simulates backend API responses for testing
 */
export class MockChatTransport<UI_MESSAGE extends UIMessage> implements ChatTransport<UI_MESSAGE> {
  async sendMessages({
    messages,
  }: {
    chatId: string;
    messages: UI_MESSAGE[];
    abortSignal?: AbortSignal;
    metadata?: unknown;
    headers?: Record<string, string> | Headers;
    body?: object;
    trigger: 'submit-message' | 'resume-stream' | 'regenerate-message';
    messageId?: string;
  }): Promise<ReadableStream<UIMessageChunk>> {
    try {
      // Get the last user message
      const lastMessage = messages[messages.length - 1];

      // Extract text from message parts
      let userText = '';
      if (lastMessage && 'parts' in lastMessage && Array.isArray(lastMessage.parts)) {
        for (const part of lastMessage.parts) {
          if (part && typeof part === 'object' && 'type' in part && part.type === 'text' && 'text' in part) {
            userText += part.text;
          }
        }
      }

      // Generate mock response
      const responseText = getMockResponse(userText || 'hello');
      const msgId = `msg-${Date.now()}`;

      // Return streaming response
      return createMockStream(responseText, msgId);
    } catch (error) {
      console.error('MockChatTransport error:', error);
      throw error;
    }
  }

  async reconnectToStream(): Promise<ReadableStream<UIMessageChunk> | null> {
    // Mock doesn't support stream resumption
    return null;
  }
}

