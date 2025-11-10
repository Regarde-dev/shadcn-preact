/**
 * AI SDK UI for Preact
 * 
 * Preact port of Vercel AI SDK UI hooks.
 * Provides client-side AI chat, completion, and structured data generation.
 * 
 * @example
 * ```tsx
 * import { useChat } from '@ai/hooks/useChat';
 * 
 * function ChatComponent() {
 *   const { messages, sendMessage } = useChat({ api: '/api/chat' });
 *   // ...
 * }
 * ```
 */

// Hooks
export { useChat } from './hooks/useChat';
export { useCompletion } from './hooks/useCompletion';
export { useObject } from './hooks/useObject';

// Chat class for shared state
export { Chat } from './share/chat.preact';

// Types
export type {
  CreateUIMessage,
  UIMessage,
  ChatInit,
  UIToolInvocation,
  ToolCallOptions,
  ToolExecuteFunction,
  InputChangeHandler,
  FormSubmitHandler,
} from './types';

// Transport
export { DefaultChatTransport } from './types';

// Hook-specific types (will be defined in hook files)
export type { UseChatOptions, UseChatHelpers } from './hooks/useChat';
export type { UseCompletionOptions, UseCompletionHelpers } from './hooks/useCompletion';
export type { UseObjectOptions, UseObjectHelpers } from './hooks/useObject';

