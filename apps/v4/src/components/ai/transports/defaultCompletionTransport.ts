/**
 * Default Completion Transport
 *
 * Default HTTP transport for useCompletion hook.
 * Handles sending prompts to an API endpoint and receiving streaming text responses.
 */

import type { CompletionTransport } from '../hooks/useCompletion';

export interface DefaultCompletionTransportOptions {
  /**
   * API endpoint URL (default: '/api/completion')
   */
  api?: string;

  /**
   * HTTP headers to include in requests
   */
  headers?: Record<string, string> | Headers;

  /**
   * Request credentials mode
   */
  credentials?: RequestCredentials;

  /**
   * Additional body properties to include in requests
   */
  body?: object;

  /**
   * Stream protocol to use ('data' or 'text')
   * - 'data': AI SDK stream protocol (default)
   * - 'text': Plain text stream
   */
  streamProtocol?: 'data' | 'text';

  /**
   * Custom fetch function
   */
  fetch?: typeof fetch;
}

/**
 * Default completion transport using HTTP fetch
 */
export class DefaultCompletionTransport implements CompletionTransport {
  private options: Required<Omit<DefaultCompletionTransportOptions, 'body' | 'headers'>> & {
    body?: object;
    headers?: Record<string, string> | Headers;
  };

  constructor(options: DefaultCompletionTransportOptions = {}) {
    this.options = {
      api: options.api ?? '/api/completion',
      credentials: options.credentials ?? 'same-origin',
      streamProtocol: options.streamProtocol ?? 'data',
      fetch: options.fetch ?? globalThis.fetch,
      headers: options.headers,
      body: options.body,
    };
  }

  async complete(params: {
    prompt: string;
    abortSignal?: AbortSignal;
    headers?: Record<string, string> | Headers;
    body?: object;
  }): Promise<ReadableStream<string>> {
    // Merge headers
    const mergedHeaders = new Headers(this.options.headers);
    if (params.headers) {
      const paramHeaders = new Headers(params.headers);
      paramHeaders.forEach((value, key) => {
        mergedHeaders.set(key, value);
      });
    }
    mergedHeaders.set('Content-Type', 'application/json');

    // Merge body
    const mergedBody = {
      ...this.options.body,
      ...params.body,
      prompt: params.prompt,
    };

    // Make request
    const response = await this.options.fetch(this.options.api, {
      method: 'POST',
      headers: mergedHeaders,
      body: JSON.stringify(mergedBody),
      credentials: this.options.credentials,
      signal: params.abortSignal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('Response body is null');
    }

    // Parse stream based on protocol
    if (this.options.streamProtocol === 'text') {
      // Plain text stream - just decode
      return response.body.pipeThrough(new TextDecoderStream()) as ReadableStream<string>;
    } else {
      // AI SDK data stream protocol - parse data chunks
      return this.parseDataStream(response.body);
    }
  }

  /**
   * Parse AI SDK data stream protocol
   * Format: "0:chunk1\n0:chunk2\n"
   */
  private parseDataStream(body: ReadableStream<Uint8Array>): ReadableStream<string> {
    const decoder = new TextDecoder();
    const reader = body.getReader();

    return new ReadableStream<string>({
      async pull(controller) {
        try {
          const { done, value } = await reader.read();

          if (done) {
            controller.close();
            return;
          }

          // Decode chunk
          const text = decoder.decode(value, { stream: true });

          // Parse data stream chunks
          // Format: "0:text\n" or "0:\"json\"\n"
          const lines = text.split('\n');

          for (const line of lines) {
            if (!line.trim()) continue;

            // Parse "0:data" format
            const match = line.match(/^0:(.*)$/);
            if (match && match[1]) {
              let chunk: string = match[1];

              // Try to parse as JSON (for quoted strings)
              try {
                const parsed = JSON.parse(chunk);
                if (typeof parsed === 'string') {
                  chunk = parsed;
                }
              } catch {
                // Not JSON, use as-is
              }

              controller.enqueue(chunk);
            }
          }
        } catch (error) {
          controller.error(error);
        }
      },

      cancel() {
        reader.cancel();
      },
    });
  }
}

