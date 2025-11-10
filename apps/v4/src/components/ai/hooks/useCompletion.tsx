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

import { useCallback, useRef, useState } from 'preact/compat';

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
   * Custom transport for handling completion requests.
   * If not provided, uses default HTTP transport to /api/completion.
   */
  transport?: CompletionTransport;

  /**
   * Callback when completion finishes.
   */
  onFinish?: (prompt: string, completion: string) => void;

  /**
   * Callback when an error occurs.
   */
  onError?: (error: Error) => void;

  /**
   * Callback when a response is received.
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
  transport,
  onFinish,
  onError,
}: UseCompletionOptions = {}): UseCompletionHelpers {
  // State management
  const [completion, setCompletion] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<Error | undefined>(undefined);
  const [status, setStatus] = useState<'ready' | 'streaming' | 'error'>('ready');

  // Abort controller for canceling streams
  const abortControllerRef = useRef<AbortController | null>(null);

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
        setError(undefined);
        setStatus('streaming');

        // Get transport (use provided or default)
        const completionTransport = transport;

        if (!completionTransport) {
          throw new Error('No transport provided for useCompletion');
        }

        // Send completion request
        const stream = await completionTransport.complete({
          prompt,
          abortSignal: abortControllerRef.current.signal,
          headers: options?.headers,
          body: options?.body,
        });

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
            setCompletion(completionText);
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
    [transport, onFinish, onError],
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

