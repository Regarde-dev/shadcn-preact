/**
 * AI SDK UI Types for Preact
 * 
 * Re-exports core types from 'ai' package and defines Preact-specific types.
 * Maintains full compatibility with @ai-sdk/react types using preact/compat.
 */

// Re-export core types from 'ai' package
export type {
  CreateUIMessage,
  UIMessage,
  ChatInit,
  UIToolInvocation,
  ToolCallOptions,
  ToolExecuteFunction,
} from 'ai';

export { DefaultChatTransport } from 'ai';

// Preact-specific event types (using preact/compat for React compatibility)
import type { ChangeEvent, FormEvent } from 'preact/compat';

/**
 * Event handler types for Preact components
 */
export type InputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
export type FormSubmitHandler = (e: FormEvent<HTMLFormElement>) => void;

