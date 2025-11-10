/**
 * Helper Functions Demo
 * 
 * Demonstrates convertToModelMessages and pruneMessages helpers
 */

import { useChat } from "@ai/hooks/useChat";
import { convertToModelMessages, pruneMessages } from "@ai/index";
import type { ModelMessage } from "@ai/helpers/convertToModelMessages";

export function HelpersDemo() {
	const { messages, sendMessage, isLoading } = useChat({
		api: "/api/chat",
	});

	// Example: Convert UI messages to ModelMessage format
	const handleConvertMessages = () => {
		const modelMessages = convertToModelMessages(messages);
		console.log("Converted messages:", modelMessages);
	};

	// Example: Prune messages to reduce context
	const handlePruneMessages = () => {
		const modelMessages = convertToModelMessages(messages);
		const prunedMessages = pruneMessages({
			messages: modelMessages,
			toolCalls: "before-last-2-messages",
			emptyMessages: "remove",
		});
		console.log("Pruned messages:", prunedMessages);
		console.log(`Reduced from ${modelMessages.length} to ${prunedMessages.length} messages`);
	};

	// Example: Custom data part conversion
	const handleCustomDataConversion = () => {
		const modelMessages = convertToModelMessages(messages, {
			convertDataPart: (part) => {
				// Convert custom data parts to text
				if (part.type === "data-url") {
					return {
						type: "text",
						text: `[Reference: ${(part.data as any).title}]`,
					};
				}
				return undefined;
			},
		});
		console.log("Messages with custom data conversion:", modelMessages);
	};

	return (
		<div className="max-w-2xl mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Helper Functions Demo</h1>

			<div className="space-y-4 mb-6">
				<div className="p-4 bg-gray-100 rounded">
					<h2 className="font-semibold mb-2">convertToModelMessages</h2>
					<p className="text-sm text-gray-600 mb-2">
						Converts UI messages to ModelMessage format for AI SDK Core functions
					</p>
					<button
						onClick={handleConvertMessages}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						Convert Messages (check console)
					</button>
				</div>

				<div className="p-4 bg-gray-100 rounded">
					<h2 className="font-semibold mb-2">pruneMessages</h2>
					<p className="text-sm text-gray-600 mb-2">
						Reduce message context to save tokens
					</p>
					<button
						onClick={handlePruneMessages}
						className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
					>
						Prune Messages (check console)
					</button>
				</div>

				<div className="p-4 bg-gray-100 rounded">
					<h2 className="font-semibold mb-2">Custom Data Conversion</h2>
					<p className="text-sm text-gray-600 mb-2">
						Convert custom data parts to text
					</p>
					<button
						onClick={handleCustomDataConversion}
						className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
					>
						Convert Custom Data (check console)
					</button>
				</div>
			</div>

			<div className="border rounded p-4">
				<h2 className="font-semibold mb-2">Chat Messages ({messages.length})</h2>
				<div className="space-y-2 mb-4 max-h-96 overflow-y-auto">
					{messages.map((message) => (
						<div
							key={message.id}
							className={`p-2 rounded ${
								message.role === "user" ? "bg-blue-100" : "bg-gray-100"
							}`}
						>
							<div className="font-semibold text-sm">{message.role}</div>
							<div className="text-sm">{message.content}</div>
						</div>
					))}
				</div>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						const input = (e.target as HTMLFormElement).message.value;
						sendMessage({ text: input });
						(e.target as HTMLFormElement).reset();
					}}
					className="flex gap-2"
				>
					<input
						name="message"
						type="text"
						placeholder="Type a message..."
						className="flex-1 px-3 py-2 border rounded"
						disabled={isLoading}
					/>
					<button
						type="submit"
						disabled={isLoading}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
					>
						{isLoading ? "Sending..." : "Send"}
					</button>
				</form>
			</div>

			<div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
				<h3 className="font-semibold mb-2">💡 Usage Tips</h3>
				<ul className="text-sm space-y-1 list-disc list-inside">
					<li>Send some messages to populate the chat</li>
					<li>Click the buttons above to see helper functions in action</li>
					<li>Open browser console to see the output</li>
					<li>
						<code className="bg-gray-200 px-1 rounded">convertToModelMessages</code> is useful for
						custom backend logic
					</li>
					<li>
						<code className="bg-gray-200 px-1 rounded">pruneMessages</code> helps reduce token usage
					</li>
				</ul>
			</div>
		</div>
	);
}

