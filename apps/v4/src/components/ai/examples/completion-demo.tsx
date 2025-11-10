/**
 * Completion Demo
 *
 * Example usage of useCompletion hook for AI text generation.
 * Uses mock transport for testing without a backend.
 */

import { useRef } from 'preact/compat';
import { useCompletion } from '@ai/hooks/useCompletion';
import { MockCompletionTransport } from '@ai/share/mock-completion-transport';
import { useEnterKeySubmit } from '@ui/share/useEnterKeySubmit';

export function CompletionDemo() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    status,
    error,
    isLoading,
    stop,
  } = useCompletion({
    transport: new MockCompletionTransport(),
  });

  // Use the reusable Enter key submit hook (Ctrl+Enter to submit)
  useEnterKeySubmit(inputRef, () => {
    if (!isLoading) {
      formRef.current?.requestSubmit();
    }
  }, {
    allowShiftEnter: true, // Allow Shift+Enter for new lines
  });

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-4 font-bold text-2xl">AI Completion Demo</h1>

      {/* Info Banner */}
      <div className="mb-4 rounded-lg border border-blue-500 bg-blue-50 p-3 text-blue-900 text-sm dark:bg-blue-950 dark:text-blue-100">
        <strong>ℹ️ Mock Mode:</strong> This demo uses a mock AI backend for testing. Try prompts like
        "write a story", "write code for fibonacci", or "write a poem"!
      </div>

      {/* Input Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="mb-4">
        <label htmlFor="prompt" className="mb-2 block font-medium text-sm">
          Enter your prompt:
        </label>
        <textarea
          ref={inputRef}
          id="prompt"
          name="prompt"
          value={input}
          onInput={handleInputChange}
          placeholder="Write a story about..."
          className="mb-2 w-full rounded-md border px-3 py-2 text-sm"
          rows={4}
          disabled={isLoading}
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm disabled:opacity-50"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
          {isLoading && (
            <button
              type="button"
              onClick={stop}
              className="rounded-md border border-destructive px-4 py-2 text-destructive text-sm hover:bg-destructive/10"
            >
              Stop
            </button>
          )}
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg border border-destructive bg-destructive/10 p-3 text-destructive text-sm">
          Error: {error.message}
        </div>
      )}

      {/* Completion Output */}
      <div className="rounded-lg border p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-semibold text-sm">Completion:</h2>
          <span className="text-muted-foreground text-xs">Status: {status}</span>
        </div>

        {completion ? (
          <div className="whitespace-pre-wrap rounded bg-muted p-3 font-mono text-sm">
            {completion}
            {isLoading && <span className="animate-pulse">▊</span>}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            No completion yet. Enter a prompt and click Generate!
          </p>
        )}
      </div>

      {/* Tips */}
      <div className="mt-4 rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-700 text-xs dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
        <strong>💡 Tips:</strong>
        <ul className="ml-4 mt-1 list-disc">
          <li>Try different prompts to see various mock responses</li>
          <li>Press Enter to submit (Shift+Enter for new line)</li>
          <li>Click "Stop" to cancel generation mid-stream</li>
        </ul>
      </div>
    </div>
  );
}

