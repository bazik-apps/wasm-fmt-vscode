import clang_init, { format, format_byte_range } from "@wasm-fmt/clang-format";
import clang_wasm from "@wasm-fmt/clang-format/clang-format.wasm";
import type { ExtensionContext, ProviderResult } from "vscode";
import { Range, TextEdit, Uri, languages, workspace } from "vscode";
import { Logger } from "../logger.ts";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "./types.ts";

const logger = new Logger("clang-format");
const encoder = new TextEncoder();

function bytelength(str: string) {
	return encoder.encode(str).byteLength;
}

export async function clangFormatInit(context: ExtensionContext) {
	const wasm_uri = Uri.joinPath(context.extensionUri, clang_wasm);

	const bits = await workspace.fs.readFile(wasm_uri);
	await clang_init(bits);
}

export function clangFormatSubscription() {
	return languages.registerDocumentRangeFormattingEditProvider(SUPPORTED_LANGUAGES, {
		provideDocumentRangeFormattingEdits(document, range, options): ProviderResult<TextEdit[]> {
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
					? languageMap[document.languageId as SupportedLanguage]
					: document.fileName;

				const full_range = new Range(document.positionAt(0), document.positionAt(text.length));

				if (range.isEmpty || range.contains(full_range)) {
					logger.log(document.languageId, document.fileName, style);

					const formatted = format(text, filename, style);

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

				const formatted = format_byte_range(text, [[byte_start, byte_length]], filename, style);

				return [TextEdit.replace(full_range, formatted)];
			} catch (e) {
				logger.error(e);
				return [];
			}
		},
	});
}

const languageMap: Record<SupportedLanguage, string> = {
	apex: "main.apex",
	c: "main.c",
	cpp: "main.cpp",
	csharp: "main.cs",
	cuda: "main.cu",
	glsl: "main.glsl",
	java: "Main.java",
	"objective-c": "main.m",
	"objective-cpp": "main.mm",
	proto3: "main.proto",
	proto: "main.proto",
	tablegen: "main.td",
	textproto: "main.pbtxt",
	verilog: "main.vl",
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
