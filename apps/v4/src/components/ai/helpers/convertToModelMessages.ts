import type { UIMessage } from "ai";

/**
 * Model message types compatible with AI SDK Core functions like streamText
 */
export type ModelMessage =
	| {
			role: "system";
			content: string;
	  }
	| {
			role: "user";
			content: string | Array<TextPart | ImagePart | FilePart>;
	  }
	| {
			role: "assistant";
			content: string | Array<TextPart | ToolCallPart>;
	  }
	| {
			role: "tool";
			content: Array<ToolResultPart>;
	  };

export type TextPart = {
	type: "text";
	text: string;
};

export type ImagePart = {
	type: "image";
	image: string | Uint8Array | Buffer | ArrayBuffer | URL;
	mimeType?: string;
};

export type FilePart = {
	type: "file";
	data: string | Uint8Array | Buffer | ArrayBuffer | URL;
	mimeType: string;
};

export type ToolCallPart = {
	type: "tool-call";
	toolCallId: string;
	toolName: string;
	args: unknown;
};

export type ToolResultPart = {
	type: "tool-result";
	toolCallId: string;
	toolName: string;
	result: unknown;
};

/**
 * Data part from UIMessage that can be converted
 */
export type DataUIPart<T = unknown> = {
	type: `data-${string}`;
	data: T;
};

/**
 * Options for convertToModelMessages
 */
export type ConvertToModelMessagesOptions = {
	/**
	 * Optional callback to convert custom data parts into text or file parts
	 * that the model can understand. Only data parts for which you return a
	 * text or file part are included; all other data parts are ignored.
	 */
	convertDataPart?: (part: DataUIPart) => TextPart | FilePart | undefined;
};

/**
 * Converts an array of UI messages from useChat into ModelMessage objects
 * compatible with AI SDK Core functions like streamText.
 *
 * @param messages - Array of UI messages from useChat hook
 * @param options - Optional configuration for data part conversion
 * @returns Array of ModelMessage objects
 *
 * @example
 * ```ts
 * import { convertToModelMessages } from '@/components/ai/helpers/convertToModelMessages';
 * import { streamText } from 'ai';
 *
 * const result = streamText({
 *   model: openai('gpt-4o'),
 *   messages: convertToModelMessages(messages),
 * });
 * ```
 */
export function convertToModelMessages<T extends UIMessage = UIMessage>(
	messages: T[],
	options?: ConvertToModelMessagesOptions,
): ModelMessage[] {
	const { convertDataPart } = options ?? {};

	return messages.map((message) => {
		const role = message.role;
		const msg = message as any;

		// System messages
		if (role === "system") {
			const content = msg.content;
			return {
				role: "system",
				content: typeof content === "string" ? content : "",
			};
		}

		// User messages
		if (role === "user") {
			const content = msg.content;
			// Simple string content
			if (typeof content === "string") {
				return {
					role: "user",
					content: content,
				};
			}

			// Multi-part content
			const parts: Array<TextPart | ImagePart | FilePart> = [];

			for (const part of message.parts ?? []) {
				if (part.type === "text") {
					parts.push({ type: "text", text: part.text });
				} else if (part.type === "file") {
					parts.push({
						type: "file",
						data: (part as any).data,
						mimeType: (part as any).mimeType,
					});
				} else if (part.type.startsWith("data-") && convertDataPart) {
					// Custom data part conversion
					const converted = convertDataPart(part as any as DataUIPart);
					if (converted) {
						parts.push(converted);
					}
				}
			}

			return {
				role: "user",
				content: parts.length > 0 ? parts : "",
			};
		}

		// Assistant messages
		if (role === "assistant") {
			const content = msg.content;
			const toolInvocations = msg.toolInvocations;

			// Simple string content
			if (typeof content === "string" && !toolInvocations?.length) {
				return {
					role: "assistant",
					content: content,
				};
			}

			// Multi-part content with tool calls
			const parts: Array<TextPart | ToolCallPart> = [];

			// Add text parts
			if (message.parts) {
				for (const part of message.parts) {
					if (part.type === "text") {
						parts.push({ type: "text", text: part.text });
					}
				}
			} else if (typeof content === "string" && content) {
				parts.push({ type: "text", text: content });
			}

			// Add tool calls
			if (toolInvocations) {
				for (const invocation of toolInvocations) {
					if (invocation.state === "call" || invocation.state === "result") {
						parts.push({
							type: "tool-call",
							toolCallId: invocation.toolCallId,
							toolName: invocation.toolName,
							args: invocation.args,
						});
					}
				}
			}

			return {
				role: "assistant",
				content: parts.length > 0 ? parts : "",
			};
		}

		// Tool messages
		if (role === "tool") {
			const parts: ToolResultPart[] = [];
			const toolInvocations = msg.toolInvocations;

			// Extract tool results from message
			if (toolInvocations) {
				for (const invocation of toolInvocations) {
					if (invocation.state === "result") {
						parts.push({
							type: "tool-result",
							toolCallId: invocation.toolCallId,
							toolName: invocation.toolName,
							result: invocation.result,
						});
					}
				}
			}

			return {
				role: "tool",
				content: parts,
			};
		}

		// Fallback for unknown roles
		return {
			role: "user",
			content: "",
		};
	});
}

