import clang_init, {
	format as clang_format,
	format_byte_range as clang_format_range,
} from "@wasm-fmt/clang-format";
import clang_wasm from "@wasm-fmt/clang-format/clang-format.wasm";
import type { ExtensionContext, FormattingOptions, ProviderResult, TextDocument } from "vscode";
import { Range, TextEdit, Uri, languages, workspace } from "vscode";
import { Logger } from "../logger.ts";

const logger = new Logger("clang-format");
const encoder = new TextEncoder();

function bytelength(str: string) {
	return encoder.encode(str).byteLength;
}

export default async function init(context: ExtensionContext) {
	const wasm_uri = Uri.joinPath(context.extensionUri, clang_wasm);

	const bits = await workspace.fs.readFile(wasm_uri);
	await clang_init(bits);
}

export function formattingSubscription() {
	return languages.registerDocumentRangeFormattingEditProvider(
		[
			"c",
			"cpp",
			"csharp",
			"java",
			"objective-c",
			"objective-cpp",
			"proto",
			{
				pattern: "**/*.proto",
				scheme: "file",
			},
		],
		{
			provideDocumentRangeFormattingEdits(
				document: TextDocument,
				range: Range,
				options: FormattingOptions,
			): ProviderResult<TextEdit[]> {
				const text = document.getText();

				const IndentWidth = options.tabSize;
				const TabWidth = options.tabSize;

				const UseTab = options.insertSpaces ? "Never" : "ForIndentation";

				const style = JSON.stringify({
					...defaultConfig(document.languageId),
					IndentWidth,
					TabWidth,
					UseTab,
				});

				try {
					const filename = document.isUntitled
						? languageMap[document.languageId]
						: document.fileName;

					const full_range = new Range(document.positionAt(0), document.positionAt(text.length));

					if (range.isEmpty || range.contains(full_range)) {
						logger.log(document.languageId, document.fileName, style);

						const formatted = clang_format(text, filename, style);

						return [TextEdit.replace(full_range, formatted)];
					}

					const [start, end] = [document.offsetAt(range.start), document.offsetAt(range.end)];

					const byte_start = bytelength(text.slice(0, start));
					const byte_length = bytelength(text.slice(start, end));

					logger.log(
						document.languageId,
						`${document.fileName}:${range.start.line}:${range.start.character};${range.end.line}:${range.end.character}`,
						[byte_start, byte_length],
						style,
					);

					const formatted = clang_format_range(text, [[byte_start, byte_length]], filename, style);

					return [TextEdit.replace(full_range, formatted)];
				} catch (e) {
					logger.error(e);
					return [];
				}
			},
		},
	);
}

const languageMap: Record<string, string> = {
	c: "main.c",
	cpp: "main.cc",
	csharp: "main.cs",
	java: "Main.java",
	"objective-c": "main.m",
	"objective-cpp": "main.mm",
	proto: "main.proto",
};

function defaultConfig(languageId: string) {
	const config: Record<string, unknown> = { BasedOnStyle: "Chromium" };

	switch (languageId) {
		case "csharp": {
			config.BasedOnStyle = "Microsoft";
			break;
		}
		case "java": {
			config.BasedOnStyle = "Google";
			break;
		}
		case "javascript":
		case "typescript": {
			config.JavaScriptQuotes = "Double";
			config.AllowShortBlocksOnASingleLine = "Empty";
			break;
		}
	}

	return config;
}

function getConfig() {
	const config: Record<string, unknown> = { BasedOnStyle: "Chromium" };
}
