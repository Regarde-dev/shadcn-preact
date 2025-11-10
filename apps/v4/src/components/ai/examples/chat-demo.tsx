/**
 * Chat Demo
 *
 * Example usage of useChat hook with a simple chat interface.
 * Uses mock transport for testing without a backend.
 */

import { useRef } from 'preact/compat';
import { useChat } from '@ai/hooks/useChat';
import { MockChatTransport } from '@ai/share/mock-transport';
import { useEnterKeySubmit } from '@ui/share/useEnterKeySubmit';

export function ChatDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    id: 'demo-chat',
    transport: new MockChatTransport(),
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('message') as HTMLInputElement;
    const message = input.value.trim();

    if (!message) return;

    await sendMessage({ text: message });
    input.value = '';
  };

  // Use the reusable Enter key submit hook
  useEnterKeySubmit(inputRef, () => {
    formRef.current?.requestSubmit();
  });

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-4 font-bold text-2xl">AI Chat Demo</h1>

      {/* Info Banner */}
      <div className="mb-4 rounded-lg border border-blue-500 bg-blue-50 p-3 text-blue-900 text-sm dark:bg-blue-950 dark:text-blue-100">
        <strong>ℹ️ Mock Mode:</strong> This demo uses a mock AI backend for testing. Try typing "hello",
        "help", or "test" to see different responses!
      </div>

      {/* Messages */}
      <div className="mb-4 space-y-4 rounded-lg border p-4">
        {messages.length === 0 && (
          <p className="text-muted-foreground text-sm">No messages yet. Start a conversation!</p>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-lg p-3 ${
              msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
            }`}
          >
            <div className="mb-1 font-semibold text-xs uppercase">{msg.role}</div>
            <div className="text-sm">
              {msg.parts.map((part, i) => (
                <span key={i}>{part.type === 'text' ? part.text : '[non-text part]'}</span>
              ))}
            </div>
          </div>
        ))}

        {status === 'streaming' && (
          <div className="text-muted-foreground text-sm">AI is typing...</div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg border border-destructive bg-destructive/10 p-3 text-destructive text-sm">
          Error: {error.message}
        </div>
      )}

      {/* Input Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          name="message"
          placeholder="Type your message... (Press Enter to send)"
          className="flex-1 rounded-md border px-3 py-2 text-sm"
          disabled={status === 'streaming'}
          autoFocus
        />
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm disabled:opacity-50"
          disabled={status === 'streaming'}
        >
          Send
        </button>
      </form>

      {/* Status */}
      <div className="mt-2 text-muted-foreground text-xs">Status: {status}</div>
    </div>
  );
}

