/**
 * useObject Hook for Preact
 *
 * Preact port of @ai-sdk/react useObject hook.
 * Provides structured data generation with Zod schema validation.
 *
 * @example
 * ```tsx
 * import { z } from 'zod';
 *
 * const { object, submit } = useObject({
 *   api: '/api/object',
 *   schema: z.object({ name: z.string(), age: z.number() }),
 * });
 * ```
 */

import { useCallback, useRef, useState } from 'preact/compat';
import type { z } from 'zod';

/**
 * Deep partial type - makes all properties optional recursively
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

/**
 * Object transport interface
 * Handles sending input and receiving streaming object responses
 */
export interface ObjectTransport<SCHEMA> {
  streamObject(params: {
    input: unknown;
    abortSignal?: AbortSignal;
    headers?: Record<string, string> | Headers;
    body?: object;
  }): Promise<ReadableStream<DeepPartial<SCHEMA>>>;
}

/**
 * Options for useObject hook
 */
export interface UseObjectOptions<SCHEMA> {
  /**
   * The API endpoint. Can be a URL string or a transport object.
   */
  api?: string | ObjectTransport<SCHEMA>;

  /**
   * Zod schema that defines the shape of the object.
   */
  schema: z.ZodType<SCHEMA>;

  /**
   * Optional initial value for the object.
   */
  initialValue?: DeepPartial<SCHEMA>;

  /**
   * Optional headers to include in the request.
   */
  headers?: Record<string, string> | Headers;

  /**
   * Optional credentials mode for fetch requests.
   */
  credentials?: RequestCredentials;

  /**
   * Optional custom fetch function.
   */
  fetch?: typeof fetch;

  /**
   * Callback when an error occurs.
   */
  onError?: (error: Error) => void;

  /**
   * Callback when streaming finishes.
   */
  onFinish?: (result: { object: SCHEMA | undefined; error: unknown | undefined }) => void;
}

/**
 * Return type of useObject hook
 */
export type UseObjectHelpers<SCHEMA> = {
  /**
   * The current partial object. Updated as the stream progresses.
   */
  object: DeepPartial<SCHEMA> | undefined;

  /**
   * Submit input to generate an object.
   */
  submit: (input: unknown) => Promise<void>;

  /**
   * Error object if the request fails.
   */
  error: Error | undefined;

  /**
   * Whether a request is currently in progress.
   */
  isLoading: boolean;

  /**
   * Current status of the request.
   */
  status: 'ready' | 'streaming' | 'error';

  /**
   * Stop the current streaming request.
   */
  stop: () => void;

  /**
   * Clear the current object and error state.
   */
  clear: () => void;

  /**
   * Clear the error state.
   */
  clearError: () => void;
};

/**
 * useObject hook
 *
 * Streams structured objects with Zod schema validation.
 */
export function useObject<SCHEMA = unknown>(
  options: UseObjectOptions<SCHEMA>,
): UseObjectHelpers<SCHEMA> {
  const { api, schema, initialValue, headers, credentials, fetch: customFetch, onError, onFinish } = options;

  // State
  const [object, setObject] = useState<DeepPartial<SCHEMA> | undefined>(initialValue);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [status, setStatus] = useState<'ready' | 'streaming' | 'error'>('ready');

  // Refs
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Stop the current streaming request
   */
  const stop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  /**
   * Clear object and error state
   */
  const clear = useCallback(() => {
    setObject(initialValue);
    setError(undefined);
    setStatus('ready');
  }, [initialValue]);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(undefined);
    if (status === 'error') {
      setStatus('ready');
    }
  }, [status]);

  /**
   * Submit input to generate an object
   */
  const submit = useCallback(
    async (input: unknown) => {
      // Stop any existing request
      stop();

      // Reset state
      setObject(initialValue);
      setError(undefined);
      setStatus('streaming');

      // Create new abort controller
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        let stream: ReadableStream<DeepPartial<SCHEMA>>;

        // Get stream from transport or API endpoint
        if (typeof api === 'string') {
          // Use fetch to call API endpoint
          const fetchFn = customFetch || fetch;
          const response = await fetchFn(api, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(headers instanceof Headers ? Object.fromEntries(headers.entries()) : headers || {}),
            },
            body: JSON.stringify({ input }),
            signal: abortController.signal,
            credentials,
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          if (!response.body) {
            throw new Error('Response body is null');
          }

          // Parse the response body as a stream of partial objects
          stream = response.body.pipeThrough(new TextDecoderStream()).pipeThrough(
            new TransformStream({
              transform(chunk, controller) {
                // Split by newlines and parse each line as JSON
                const lines = chunk.split('\n').filter((line) => line.trim());
                for (const line of lines) {
                  try {
                    const partialObject = JSON.parse(line) as DeepPartial<SCHEMA>;
                    controller.enqueue(partialObject);
                  } catch (e) {
                    // Skip invalid JSON lines
                    console.warn('Failed to parse JSON line:', line, e);
                  }
                }
              },
            }),
          );
        } else if (api && typeof api === 'object' && 'streamObject' in api) {
          // Use transport object
          stream = await api.streamObject({
            input,
            abortSignal: abortController.signal,
            headers,
          });
        } else {
          throw new Error('Invalid api option: must be a URL string or ObjectTransport');
        }

        // Read the stream
        const reader = stream.getReader();
        let finalObject: DeepPartial<SCHEMA> | undefined;

        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              break;
            }

            // Update object state with partial object
            setObject(value);
            finalObject = value;
          }

          // Validate final object against schema
          let validatedObject: SCHEMA | undefined;
          let validationError: unknown | undefined;

          try {
            validatedObject = schema.parse(finalObject);
          } catch (e) {
            validationError = e;
          }

          // Call onFinish callback
          onFinish?.({ object: validatedObject, error: validationError });

          setStatus('ready');
        } finally {
          reader.releaseLock();
        }
      } catch (err) {
        // Handle errors
        if (err instanceof Error && err.name === 'AbortError') {
          // Request was aborted, don't set error state
          setStatus('ready');
          return;
        }

        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        setStatus('error');
        onError?.(error);
      } finally {
        abortControllerRef.current = null;
      }
    },
    [api, schema, initialValue, headers, credentials, customFetch, onError, onFinish, stop],
  );

  return {
    object,
    submit,
    error,
    isLoading: status === 'streaming',
    status,
    stop,
    clear,
    clearError,
  };
}
