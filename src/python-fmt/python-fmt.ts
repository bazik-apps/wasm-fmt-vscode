import { format, initSync } from "@wasm-fmt/ruff_fmt";
import ruff_wasm from "@wasm-fmt/ruff_fmt/ruff_fmt_bg.wasm";
import type { ExtensionContext } from "vscode";
import { Range, TextEdit, Uri, languages, workspace } from "vscode";
import { Logger } from "../logger.ts";

const logger = new Logger("python-format");

export async function pythonFormatInit(context: ExtensionContext) {
	const wasm_uri = Uri.joinPath(context.extensionUri, ruff_wasm);

	const bits = await workspace.fs.readFile(wasm_uri);
	initSync(bits);
}

export function pythonFormatSubscription() {
	return languages.registerDocumentFormattingEditProvider("python", {
		provideDocumentFormattingEdits(document, options) {
			const text = document.getText();

			const indent_style = options.insertSpaces ? "space" : "tab";
			const indent_width = options.tabSize;

			logger.info(
				document.languageId,
				document.fileName,
				JSON.stringify({ indent_style, indent_width }),
			);

			try {
				const formatted = format(text, document.fileName, {
					indent_style,
					indent_width,
				});

				const range = document.validateRange(
					new Range(document.positionAt(0), document.positionAt(text.length)),
				);
				return [TextEdit.replace(range, formatted)];
			} catch (error) {
				logger.error(error);
				return [];
			}
		},
	});
}
