/**
 * useChat Hook for Preact
 * 
 * Preact port of @ai-sdk/react useChat hook.
 * Provides chat interface with streaming AI responses.
 * 
 * @example
 * ```tsx
 * const { messages, sendMessage, status } = useChat({
 *   api: '/api/chat',
 *   onFinish: (message) => console.log('Done:', message),
 * });
 * ```
 */

import type { ChatInit, CreateUIMessage, UIMessage } from 'ai';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'preact/compat';
import { Chat } from '../share/chat.preact';

// Re-export types
export type { CreateUIMessage, UIMessage };

/**
 * Return type of useChat hook
 */
export type UseChatHelpers<UI_MESSAGE extends UIMessage> = {
  /**
   * The id of the chat.
   */
  readonly id: string;

  /**
   * Update the `messages` state locally. This is useful when you want to
   * edit the messages on the client, and then trigger the `reload` method
   * manually to regenerate the AI response.
   */
  setMessages: (
    messages: UI_MESSAGE[] | ((messages: UI_MESSAGE[]) => UI_MESSAGE[]),
  ) => void;

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
   * Form submission handler that automatically sends the input as a message.
   */
  handleSubmit: (e?: { preventDefault?: () => void }, options?: { data?: Record<string, unknown> }) => void;

  error: Error | undefined;
} & Pick<
  Chat<UI_MESSAGE>,
  | 'sendMessage'
  | 'regenerate'
  | 'stop'
  | 'resumeStream'
  | 'addToolResult'
  | 'addToolOutput'
  | 'status'
  | 'messages'
  | 'clearError'
>;

/**
 * Options for useChat hook
 */
export type UseChatOptions<UI_MESSAGE extends UIMessage> = ChatInit<UI_MESSAGE> & {
  /**
   * Custom throttle wait in ms for the chat messages and data updates.
   * Default is undefined, which disables throttling.
   */
  experimental_throttle?: number;

  /**
   * Whether to resume an ongoing chat generation stream.
   */
  resume?: boolean;

  /**
   * Initial value for the input field.
   */
  initialInput?: string;
};

/**
 * Hook for managing chat state and streaming AI responses.
 * 
 * Uses the AI SDK core `AbstractChat` class with Preact state management.
 * Follows uncontrolled pattern (hook manages state internally).
 * 
 * @param options - Chat configuration options
 * @returns Chat helpers and state
 */
export function useChat<UI_MESSAGE extends UIMessage = UIMessage>({
  experimental_throttle: throttleWaitMs,
  resume = false,
  initialInput = '',
  ...options
}: UseChatOptions<UI_MESSAGE> = {}): UseChatHelpers<UI_MESSAGE> {
  // Create Chat instance (Preact-specific wrapper)
  const chatRef = useRef<Chat<UI_MESSAGE>>(new Chat(options));

  // Recreate chat if ID changes
  const shouldRecreateChat = 'id' in options && chatRef.current.id !== options.id;

  if (shouldRecreateChat) {
    chatRef.current = new Chat(options);
  }

  const optionsId = 'id' in options ? options.id : null;

  // Input state management
  const [input, setInput] = useState<string>(initialInput);

  // Subscribe to messages updates with throttling
  const subscribeToMessages = useCallback(
    (update: () => void) =>
      chatRef.current['~registerMessagesCallback'](update, throttleWaitMs),
    // optionsId triggers re-subscription when chat ID changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [throttleWaitMs, optionsId],
  );

  // Sync external store for messages
  const messages = useSyncExternalStore(subscribeToMessages, () => chatRef.current.messages);

  // Sync external store for status
  const status = useSyncExternalStore(
    chatRef.current['~registerStatusCallback'],
    () => chatRef.current.status,
  );

  // Sync external store for error
  const error = useSyncExternalStore(
    chatRef.current['~registerErrorCallback'],
    () => chatRef.current.error,
  );

  // Setter for messages (supports functional updates)
  const setMessages = useCallback(
    (
      messagesParam: UI_MESSAGE[] | ((messages: UI_MESSAGE[]) => UI_MESSAGE[]),
    ) => {
      if (typeof messagesParam === 'function') {
        messagesParam = messagesParam(chatRef.current.messages);
      }
      chatRef.current.messages = messagesParam;
    },
    [chatRef],
  );

  // Input change handler
  const handleInputChange = useCallback((e: { currentTarget: { value: string } }) => {
    setInput(e.currentTarget.value);
  }, []);

  // Form submit handler
  const handleSubmit = useCallback(
    (e?: { preventDefault?: () => void }, options?: { data?: Record<string, unknown> }) => {
      e?.preventDefault?.();
      const trimmedInput = input.trim();
      if (!trimmedInput) return;

      // Send message
      chatRef.current.sendMessage({
        text: trimmedInput,
        ...(options?.data ? { data: options.data } : {}),
      } as unknown as CreateUIMessage<UI_MESSAGE>);

      // Clear input
      setInput('');
    },
    [input, chatRef],
  );

  // Resume stream on mount if requested
  useEffect(() => {
    if (resume) {
      chatRef.current.resumeStream();
    }
  }, [resume, chatRef]);

  // Return chat helpers
  return {
    id: chatRef.current.id,
    messages,
    setMessages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    sendMessage: chatRef.current.sendMessage,
    regenerate: chatRef.current.regenerate,
    clearError: chatRef.current.clearError,
    stop: chatRef.current.stop,
    error,
    resumeStream: chatRef.current.resumeStream,
    status,
    /**
     * @deprecated Use `addToolOutput` instead.
     */
    addToolResult: chatRef.current.addToolOutput,
    addToolOutput: chatRef.current.addToolOutput,
  };
}

