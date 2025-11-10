/**
 * useCompletion Hook for Preact
 *
 * Preact port of @ai-sdk/react useCompletion hook.
 * Provides text completion with streaming AI responses.
 *
 * @example
 * ```tsx
 * const { completion, complete, status } = useCompletion({
 *   api: '/api/completion',
 * });
 * ```
 */

import { useCallback, useEffect, useRef, useState } from 'preact/compat';
import { DefaultCompletionTransport } from '../transports/defaultCompletionTransport';

/**
 * Completion transport interface
 * Handles sending prompts and receiving streaming text responses
 */
export interface CompletionTransport {
  complete(params: {
    prompt: string;
    abortSignal?: AbortSignal;
    headers?: Record<string, string> | Headers;
    body?: object;
  }): Promise<ReadableStream<string>>;
}

/**
 * Return type of useCompletion hook
 */
export type UseCompletionHelpers = {
  /**
   * The current completion text.
   */
  completion: string;

  /**
   * Update the `completion` state locally.
   */
  setCompletion: (completion: string | ((completion: string) => string)) => void;

  /**
   * The current input value.
   */
  input: string;

  /**
   * Update the input value.
   */
  setInput: (input: string | ((input: string) => string)) => void;

  /**
   * Handler for input change events.
   */
  handleInputChange: (e: { currentTarget: { value: string } }) => void;

  /**
   * Form submission handler that automatically resets the input upon completion.
   */
  handleSubmit: (e?: { preventDefault?: () => void }) => void;

  /**
   * The current error, if any.
   */
  error: Error | undefined;

  /**
   * The current status of the completion.
   */
  status: 'ready' | 'streaming' | 'error';

  /**
   * Whether the completion is currently loading.
   */
  isLoading: boolean;

  /**
   * Trigger a completion request.
   */
  complete: (prompt: string, options?: { headers?: Record<string, string>; body?: object }) => Promise<void>;

  /**
   * Stop the current completion stream.
   */
  stop: () => void;

  /**
   * Clear the current error.
   */
  clearError: () => void;
};

/**
 * Options for useCompletion hook
 */
export type UseCompletionOptions = {
  /**
   * API endpoint URL (default: '/api/completion').
   * If provided, a default transport will be created.
   */
  api?: string;

  /**
   * Unique identifier for the completion.
   * Used for shared state across multiple components.
   */
  id?: string;

  /**
   * Custom transport for handling completion requests.
   * If not provided and api is specified, uses default HTTP transport.
   */
  transport?: CompletionTransport;

  /**
   * Initial value for the input field.
   */
  initialInput?: string;

  /**
   * Initial value for the completion.
   */
  initialCompletion?: string;

  /**
   * Stream protocol to use ('data' or 'text').
   * Only used when api is provided (not with custom transport).
   */
  streamProtocol?: 'data' | 'text';

  /**
   * HTTP headers to include in requests.
   * Only used when api is provided (not with custom transport).
   */
  headers?: Record<string, string> | Headers;

  /**
   * Additional body properties to include in requests.
   * Only used when api is provided (not with custom transport).
   */
  body?: object;

  /**
   * Request credentials mode.
   * Only used when api is provided (not with custom transport).
   */
  credentials?: RequestCredentials;

  /**
   * Custom fetch function.
   * Only used when api is provided (not with custom transport).
   */
  fetch?: typeof fetch;

  /**
   * Throttle UI updates during streaming (in milliseconds).
   * Reduces re-renders for better performance.
   */
  experimental_throttle?: number;

  /**
   * Callback when completion finishes.
   */
  onFinish?: (prompt: string, completion: string) => void;

  /**
   * Callback when an error occurs.
   */
  onError?: (error: Error) => void;

  /**
   * Callback when a response is received (before streaming starts).
   */
  onResponse?: (response: Response) => void;
};

/**
 * Hook for managing completion state and streaming AI text generation.
 *
 * Simplified implementation without AbstractCompletion (not available in AI SDK 5.0).
 * Follows uncontrolled pattern (hook manages state internally).
 *
 * @param options - Completion configuration options
 * @returns Completion helpers and state
 */
export function useCompletion({
  api,
  transport: customTransport,
  initialInput = '',
  initialCompletion = '',
  streamProtocol,
  headers,
  body,
  credentials,
  fetch: customFetch,
  experimental_throttle,
  onFinish,
  onError,
}: UseCompletionOptions = {}): UseCompletionHelpers {

  // Create transport if api is provided
  const transport = customTransport ?? (api ? new DefaultCompletionTransport({
    api,
    streamProtocol,
    headers,
    body,
    credentials,
    fetch: customFetch,
  }) : undefined);

  if (!transport) {
    throw new Error('useCompletion: Either api or transport must be provided');
  }

  // State management
  const [completion, setCompletion] = useState<string>(initialCompletion);
  const [input, setInput] = useState<string>(initialInput);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [status, setStatus] = useState<'ready' | 'streaming' | 'error'>('ready');

  // Abort controller for canceling streams
  const abortControllerRef = useRef<AbortController | null>(null);

  // Throttle state updates if requested
  const throttleTimeoutRef = useRef<number | null>(null);
  const pendingCompletionRef = useRef<string | null>(null);

  // Handle input change
  const handleInputChange = useCallback((e: { currentTarget: { value: string } }) => {
    setInput(e.currentTarget.value);
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    (e?: { preventDefault?: () => void }) => {
      e?.preventDefault?.();
      const prompt = input.trim();
      if (!prompt) return;

      // Trigger completion
      complete(prompt);

      // Clear input
      setInput('');
    },
    [input],
  );

  // Helper to update completion with throttling
  const updateCompletion = useCallback((text: string) => {
    if (experimental_throttle && experimental_throttle > 0) {
      // Store pending update
      pendingCompletionRef.current = text;

      // Clear existing timeout
      if (throttleTimeoutRef.current !== null) {
        clearTimeout(throttleTimeoutRef.current);
      }

      // Schedule update
      throttleTimeoutRef.current = window.setTimeout(() => {
        if (pendingCompletionRef.current !== null) {
          setCompletion(pendingCompletionRef.current);
          pendingCompletionRef.current = null;
        }
        throttleTimeoutRef.current = null;
      }, experimental_throttle);
    } else {
      // No throttling - update immediately
      setCompletion(text);
    }
  }, [experimental_throttle]);

  // Cleanup throttle timeout on unmount
  useEffect(() => {
    return () => {
      if (throttleTimeoutRef.current !== null) {
        clearTimeout(throttleTimeoutRef.current);
      }
    };
  }, []);

  // Complete function
  const complete = useCallback(
    async (prompt: string, options?: { headers?: Record<string, string>; body?: object }) => {
      try {
        // Cancel any existing stream
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        // Create new abort controller
        abortControllerRef.current = new AbortController();

        // Clear previous state
        setCompletion('');
        pendingCompletionRef.current = null;
        if (throttleTimeoutRef.current !== null) {
          clearTimeout(throttleTimeoutRef.current);
          throttleTimeoutRef.current = null;
        }
        setError(undefined);
        setStatus('streaming');

        // Send completion request
        const stream = await transport.complete({
          prompt,
          abortSignal: abortControllerRef.current.signal,
          headers: options?.headers,
          body: options?.body,
        });

        // Call onResponse if provided
        // Note: We don't have access to the raw Response object in the transport interface
        // This is a limitation of the current design

        // Read stream
        const reader = stream.getReader();
        let completionText = '';

        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              break;
            }

            // Append text chunk
            completionText += value;
            updateCompletion(completionText);
          }

          // Flush any pending throttled update
          if (pendingCompletionRef.current !== null) {
            setCompletion(pendingCompletionRef.current);
            pendingCompletionRef.current = null;
          }

          // Completion finished successfully
          setStatus('ready');
          onFinish?.(prompt, completionText);
        } catch (streamError) {
          if (streamError instanceof Error && streamError.name === 'AbortError') {
            // Stream was aborted
            setStatus('ready');
          } else {
            throw streamError;
          }
        } finally {
          reader.releaseLock();
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        setStatus('error');
        onError?.(error);
      }
    },
    [transport, onFinish, onError, updateCompletion],
  );

  // Stop function
  const stop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setStatus('ready');
    }
  }, []);

  // Clear error function
  const clearError = useCallback(() => {
    setError(undefined);
    if (status === 'error') {
      setStatus('ready');
    }
  }, [status]);

  // Return completion helpers
  return {
    completion,
    setCompletion,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    error,
    status,
    isLoading: status === 'streaming',
    complete,
    stop,
    clearError,
  };
}

