/**
 * useObject Hook for Preact
 *
 * Preact port of @ai-sdk/react useObject hook.
 * Provides structured data generation with Zod or JSON Schema validation.
 *
 * @example
 * ```tsx
 * // With Zod
 * import { z } from 'zod';
 *
 * const { object, submit } = useObject({
 *   api: '/api/object',
 *   schema: z.object({ name: z.string(), age: z.number() }),
 * });
 *
 * // With JSON Schema
 * const { object, submit } = useObject({
 *   api: '/api/object',
 *   schema: {
 *     type: 'object',
 *     properties: {
 *       name: { type: 'string' },
 *       age: { type: 'number' },
 *     },
 *     required: ['name', 'age'],
 *   },
 * });
 * ```
 */

import { useCallback, useRef, useState } from 'preact/compat';
import type { z } from 'zod';
import type { JSONSchema7 } from 'json-schema';

/**
 * Deep partial type - makes all properties optional recursively
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

/**
 * Schema type - supports both Zod and JSON Schema
 */
export type Schema<T> = z.ZodType<T> | JSONSchema7;

/**
 * Type guard to check if schema is a Zod schema
 */
function isZodSchema<T>(schema: Schema<T>): schema is z.ZodType<T> {
  return typeof schema === 'object' && schema !== null && 'parse' in schema && typeof schema.parse === 'function';
}

/**
 * Simple JSON Schema validator
 * Note: This is a basic implementation. For production use, consider using a library like Ajv.
 */
function validateJSONSchema<T>(data: unknown, schema: JSONSchema7): { success: true; data: T } | { success: false; error: Error } {
  // Basic type checking
  if (schema.type === 'object' && typeof data === 'object' && data !== null) {
    const obj = data as Record<string, unknown>;

    // Check required properties
    if (schema.required && Array.isArray(schema.required)) {
      for (const key of schema.required) {
        if (!(key in obj)) {
          return { success: false, error: new Error(`Missing required property: ${key}`) };
        }
      }
    }

    // Basic property type validation
    if (schema.properties) {
      for (const [key, propSchema] of Object.entries(schema.properties)) {
        if (key in obj && typeof propSchema === 'object' && propSchema !== null) {
          const value = obj[key];
          const expectedType = (propSchema as JSONSchema7).type;

          if (expectedType === 'string' && typeof value !== 'string') {
            return { success: false, error: new Error(`Property ${key} should be string, got ${typeof value}`) };
          }
          if (expectedType === 'number' && typeof value !== 'number') {
            return { success: false, error: new Error(`Property ${key} should be number, got ${typeof value}`) };
          }
          if (expectedType === 'boolean' && typeof value !== 'boolean') {
            return { success: false, error: new Error(`Property ${key} should be boolean, got ${typeof value}`) };
          }
          if (expectedType === 'array' && !Array.isArray(value)) {
            return { success: false, error: new Error(`Property ${key} should be array, got ${typeof value}`) };
          }
        }
      }
    }

    return { success: true, data: data as T };
  }

  if (schema.type === 'array' && Array.isArray(data)) {
    return { success: true, data: data as T };
  }

  return { success: false, error: new Error(`Data does not match schema type: ${schema.type}`) };
}

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
   * Schema that defines the shape of the object.
   * Can be either a Zod schema or a JSON Schema.
   *
   * @example
   * // With Zod
   * schema: z.object({ name: z.string() })
   *
   * // With JSON Schema
   * schema: { type: 'object', properties: { name: { type: 'string' } } }
   */
  schema: Schema<SCHEMA>;

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

          if (isZodSchema(schema)) {
            // Zod validation
            try {
              validatedObject = schema.parse(finalObject) as SCHEMA;
            } catch (e) {
              validationError = e;
            }
          } else {
            // JSON Schema validation
            const result = validateJSONSchema<SCHEMA>(finalObject, schema);
            if (result.success) {
              validatedObject = result.data;
            } else {
              validationError = result.error;
            }
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
