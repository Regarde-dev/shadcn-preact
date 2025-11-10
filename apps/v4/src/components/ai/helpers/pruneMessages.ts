import type { ModelMessage } from "./convertToModelMessages";

/**
 * Options for pruning tool calls
 */
export type PruneToolCallsOption = {
	toolName: string;
	strategy: "all" | "before-last-message" | `before-last-${number}-messages` | "none";
};

/**
 * Options for pruneMessages function
 */
export type PruneMessagesOptions = {
	/**
	 * Array of ModelMessage objects to prune
	 */
	messages: ModelMessage[];

	/**
	 * How to remove reasoning content from assistant messages
	 * - 'all': Remove all reasoning parts
	 * - 'before-last-message': Keep reasoning in the last message only
	 * - 'none': Retain all reasoning (default)
	 */
	reasoning?: "all" | "before-last-message" | "none";

	/**
	 * How to prune tool call/results/approval content
	 * - 'all': Prune all tool-related content
	 * - 'before-last-message': Prune except in the last message
	 * - 'before-last-N-messages': Prune except in the last N messages
	 * - 'none': Do not prune
	 * - Array: Per-tool fine control
	 */
	toolCalls?: "all" | "before-last-message" | `before-last-${number}-messages` | "none" | PruneToolCallsOption[];

	/**
	 * Whether to keep or remove messages whose content is empty after pruning
	 * Default: 'remove'
	 */
	emptyMessages?: "keep" | "remove";
};

/**
 * Prunes or filters an array of ModelMessage objects to reduce context size,
 * remove intermediate reasoning, or trim tool calls before sending to an LLM.
 *
 * @param options - Pruning configuration options
 * @returns Array of pruned ModelMessage objects
 *
 * @example
 * ```ts
 * import { pruneMessages } from '@/components/ai/helpers/pruneMessages';
 *
 * const pruned = pruneMessages({
 *   messages,
 *   reasoning: 'before-last-message',
 *   toolCalls: 'before-last-2-messages',
 *   emptyMessages: 'remove',
 * });
 * ```
 */
export function pruneMessages(options: PruneMessagesOptions): ModelMessage[] {
	const { messages, toolCalls = "none", emptyMessages = "remove" } = options;

	// Helper to check if we should keep content based on message index
	const shouldKeepByIndex = (
		index: number,
		strategy: "all" | "before-last-message" | `before-last-${number}-messages` | "none",
	): boolean => {
		if (strategy === "none") return true;
		if (strategy === "all") return false;
		if (strategy === "before-last-message") {
			return index === messages.length - 1;
		}
		// Handle 'before-last-N-messages'
		const match = strategy.match(/^before-last-(\d+)-messages$/);
		if (match && match[1]) {
			const n = Number.parseInt(match[1], 10);
			return index >= messages.length - n;
		}
		return true;
	};

	// Process each message
	const prunedMessages = messages.map((message, index) => {
		// System and user messages - pass through unchanged
		if (message.role === "system" || message.role === "user") {
			return message;
		}

		// Assistant messages - may need reasoning/tool call pruning
		if (message.role === "assistant") {
			// Simple string content - no pruning needed
			if (typeof message.content === "string") {
				return message;
			}

			// Multi-part content - filter parts
			const parts = message.content.filter((part) => {
				// Handle reasoning parts (if we add support for them in the future)
				// For now, we don't have reasoning parts in our type definition

				// Handle tool calls
				if (part.type === "tool-call") {
					// Check if we should keep this tool call
					if (typeof toolCalls === "string") {
						return shouldKeepByIndex(index, toolCalls);
					}
					// Array of per-tool options
					if (Array.isArray(toolCalls)) {
						const toolOption = toolCalls.find((opt) => opt.toolName === part.toolName);
						if (toolOption) {
							return shouldKeepByIndex(index, toolOption.strategy);
						}
						// If tool not in options, keep it
						return true;
					}
					return true;
				}

				// Keep text parts
				return true;
			});

			return {
				...message,
				content: parts,
			};
		}

		// Tool messages - may need pruning
		if (message.role === "tool") {
			// Filter tool results based on toolCalls strategy
			const parts = message.content.filter((part) => {
				if (part.type === "tool-result") {
					if (typeof toolCalls === "string") {
						return shouldKeepByIndex(index, toolCalls);
					}
					if (Array.isArray(toolCalls)) {
						const toolOption = toolCalls.find((opt) => opt.toolName === part.toolName);
						if (toolOption) {
							return shouldKeepByIndex(index, toolOption.strategy);
						}
						return true;
					}
					return true;
				}
				return true;
			});

			return {
				...message,
				content: parts,
			};
		}

		return message;
	});

	// Remove empty messages if requested
	if (emptyMessages === "remove") {
		return prunedMessages.filter((message) => {
			if (message.role === "system") {
				return message.content.length > 0;
			}
			if (message.role === "user" || message.role === "assistant") {
				if (typeof message.content === "string") {
					return message.content.length > 0;
				}
				return message.content.length > 0;
			}
			if (message.role === "tool") {
				return message.content.length > 0;
			}
			return true;
		});
	}

	return prunedMessages;
}

