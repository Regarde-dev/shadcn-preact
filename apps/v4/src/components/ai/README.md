# AI SDK for Preact

Preact port of [Vercel AI SDK UI](https://sdk.vercel.ai/docs/ai-sdk-ui) hooks for building AI-powered applications.

## Overview

This is a complete Preact implementation of the AI SDK UI hooks, providing client-side AI chat, completion, and structured data generation capabilities with **100% feature parity** with the official React implementation.

## Features

### Core Hooks

- **useChat** - Multi-turn AI conversations with streaming
- **useCompletion** - Single-turn text generation
- **useObject** - Structured data generation with Zod or JSON Schema

### Advanced Features

- **Tool Calling** - AI can invoke functions during conversation
- **Message Regeneration** - Regenerate the last assistant message
- **Stream Resumption** - Resume interrupted streams
- **Message Parts** - Rich message rendering (text, tool calls, tool results)
- **Shared State** - Share chat instance across multiple components
- **Transport Customization** - Customize requests with hooks
- **JSON Schema Support** - Use JSON Schema as alternative to Zod
- **Data Parts Handling** - Process transient and persistent streaming data

**Feature Parity:** 100% with official AI SDK UI! 🎉

## Installation

### Using shadcn CLI (Recommended)

```bash
# Install individual hooks
npx shadcn@latest add https://shadcn-preact.regarde.dev/use-chat.json
npx shadcn@latest add https://shadcn-preact.regarde.dev/use-completion.json
npx shadcn@latest add https://shadcn-preact.regarde.dev/use-object.json

# For shared state support
npx shadcn@latest add https://shadcn-preact.regarde.dev/chat-preact.json
```

### Install Dependencies

```bash
# Required for all hooks
pnpm add ai

# Optional: For useObject with Zod schemas
pnpm add zod

# Optional: For useObject with JSON Schema
pnpm add -D @types/json-schema
```

### Configure Path Aliases

Add to `vite.config.ts`:

```typescript
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@ai": resolve(__dirname, "./src/components/ai/"),
      "@": resolve(__dirname, "./src/"),
    },
  },
});
```

Add to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@ai/*": ["./src/components/ai/*"],
      "@/*": ["./src/*"]
    }
  }
}
```

## Quick Start

### useChat - AI Conversations

```tsx
import { useChat } from "@ai/hooks/useChat";

function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  });

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id}>
          <strong>{msg.role}:</strong> {msg.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
          placeholder="Type a message..."
        />
        <button
          type="submit"
          disabled={isLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
}
```

### useCompletion - Text Generation

```tsx
import { useCompletion } from "@ai/hooks/useCompletion";

function CompletionComponent() {
  const { completion, input, handleInputChange, handleSubmit, isLoading } = useCompletion({
    api: "/api/completion",
  });

  return (
    <div>
      <div>{completion}</div>

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
          placeholder="Enter a prompt..."
        />
        <button
          type="submit"
          disabled={isLoading}
        >
          Generate
        </button>
      </form>
    </div>
  );
}
```

### useObject - Structured Data

```tsx
import { useObject } from "@ai/hooks/useObject";
import { z } from "zod";

const schema = z.object({
  recipe: z.object({
    name: z.string(),
    ingredients: z.array(z.string()),
    steps: z.array(z.string()),
  }),
});

function RecipeGenerator() {
  const { object, submit, isLoading } = useObject({
    api: "/api/generate",
    schema,
  });

  return (
    <div>
      <button
        onClick={() => submit("Generate a cookie recipe")}
        disabled={isLoading}
      >
        Generate Recipe
      </button>

      {object && (
        <div>
          <h2>{object.recipe?.name}</h2>
          <h3>Ingredients:</h3>
          <ul>
            {object.recipe?.ingredients?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

## API Reference

### useChat Options

All hooks now support the same convenient API as the official SDK:

```tsx
const chat = useChat({
  // Simple API endpoint (creates default transport automatically)
  api: '/api/chat',

  // Unique ID for shared state across components
  id: 'my-chat',

  // Initial input value
  initialInput: 'Hello!',

  // Throttle UI updates for better performance
  experimental_throttle: 100,

  // Resume interrupted streams
  resume: true,

  // Callbacks
  onFinish: (message) => console.log('Done:', message),
  onError: (error) => console.error('Error:', error),
  onToolCall: async ({ toolCall }) => { /* ... */ },
});

// Input management helpers (no manual state needed!)
const { input, setInput, handleInputChange, handleSubmit } = chat;
```

### useCompletion Options

```tsx
const completion = useCompletion({
  // Simple API endpoint (creates default transport automatically)
  api: '/api/completion',

  // Unique ID for shared state
  id: 'my-completion',

  // Initial values
  initialInput: 'Write a story about',
  initialCompletion: 'Once upon a time...',

  // Stream protocol ('data' or 'text')
  streamProtocol: 'data',

  // Throttle UI updates
  experimental_throttle: 100,

  // HTTP options
  headers: { 'X-Custom': 'value' },
  credentials: 'include',

  // Callbacks
  onFinish: (prompt, completion) => console.log('Done'),
  onError: (error) => console.error('Error:', error),
  onResponse: (response) => console.log('Response received'),
});

// Input management helpers
const { input, setInput, handleInputChange, handleSubmit } = completion;
```

### useObject Options

```tsx
const obj = useObject({
  // Simple API endpoint
  api: '/api/generate',

  // Unique ID for shared state
  id: 'my-object',

  // Schema (Zod or JSON Schema)
  schema: z.object({ name: z.string() }),

  // Initial value
  initialValue: { name: 'Loading...' },

  // Callbacks
  onFinish: ({ object, error }) => console.log('Done'),
  onError: (error) => console.error('Error:', error),
});

// Manual object updates
const { object, setObject } = obj;
setObject({ name: 'Updated' });
```

### Custom Transports

For advanced use cases, you can still use custom transports:

```tsx
import { DefaultCompletionTransport } from '@ai/transports/defaultCompletionTransport';

const customTransport = new DefaultCompletionTransport({
  api: '/api/custom',
  streamProtocol: 'text',
  headers: { 'Authorization': 'Bearer token' },
});

const { completion } = useCompletion({ transport: customTransport });
```

## Backend Setup

### Chat API Route

```typescript
// app/api/chat/route.ts
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
  });

  return result.toDataStreamResponse();
}
```

### Completion API Route

```typescript
// app/api/completion/route.ts
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    prompt,
  });

  return result.toDataStreamResponse();
}
```

### Object API Route

```typescript
// app/api/generate/route.ts
import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = streamObject({
    model: openai("gpt-4o"),
    schema: z.object({
      recipe: z.object({
        name: z.string(),
        ingredients: z.array(z.string()),
        steps: z.array(z.string()),
      }),
    }),
    prompt,
  });

  return result.toTextStreamResponse();
}
```

## Advanced Features

### Tool Calling

Enable AI to invoke functions during conversation:

```tsx
import { useChat } from "@ai/hooks/useChat";

function ChatWithTools() {
  const { messages, sendMessage } = useChat({
    api: "/api/chat",
    onToolCall: async ({ toolCall }) => {
      if (toolCall.toolName === "getWeather") {
        const { city } = toolCall.args;
        const weather = await fetchWeather(city);
        return weather;
      }
    },
  });

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id}>
          {msg.parts.map((part, i) => {
            if (part.type === "text") {
              return <p key={i}>{part.text}</p>;
            }
            if (part.type.startsWith("tool-")) {
              return <div key={i}>Tool: {part.type}</div>;
            }
          })}
        </div>
      ))}
    </div>
  );
}
```

### Shared State Across Components

Share chat instance across multiple components:

```tsx
import { createContext } from "preact";
import { useContext, useState } from "preact/hooks";
import { Chat, DefaultChatTransport } from "ai";
import { useChat } from "@ai/hooks/useChat";

const ChatContext = createContext(null);

function ChatProvider({ children }) {
  const [chat] = useState(
    () =>
      new Chat({
        transport: new DefaultChatTransport({ api: "/api/chat" }),
      })
  );

  return <ChatContext.Provider value={{ chat }}>{children}</ChatContext.Provider>;
}

function MessageList() {
  const { chat } = useContext(ChatContext);
  const { messages } = useChat({ chat });
  return <div>{/* render messages */}</div>;
}

function ChatInput() {
  const { chat } = useContext(ChatContext);
  const { sendMessage } = useChat({ chat });
  return <input onSubmit={() => sendMessage({ text })} />;
}
```

## Documentation

For complete documentation, examples, and API reference, see:

- [Full Documentation](./DOCUMENTATION.md) - Comprehensive guide with all features
- [Examples](./examples/) - Working examples for each hook
- [AI SDK Docs](https://sdk.vercel.ai/docs) - Official AI SDK documentation

## File Structure

```
apps/v4/src/components/ai/
├── hooks/
│   ├── useChat.tsx           # Chat hook
│   ├── useCompletion.tsx     # Completion hook
│   └── useObject.tsx         # Object hook
├── share/
│   ├── chat.preact.ts        # Preact Chat class
│   └── *.ts                  # Utilities and mock transports
├── examples/
│   ├── chat-demo.tsx         # Chat demo
│   ├── completion-demo.tsx   # Completion demo
│   └── object-demo.tsx       # Object demo
├── types.ts                  # Type definitions
├── index.ts                  # Barrel exports
└── README.md                 # This file
```

## Credits

- Original AI SDK by [Vercel](https://vercel.com)
- Preact port by [shadcn-preact](https://shadcn-preact.regarde.dev)
