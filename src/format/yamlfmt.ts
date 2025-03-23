import { initSync as yaml_init, format as yamlfmt } from "@wasm-fmt/yamlfmt";
import sql_wasm from "@wasm-fmt/yamlfmt/yamlfmt_bg.wasm";
import type { ExtensionContext } from "vscode";
import { Range, TextEdit, Uri, languages, workspace } from "vscode";
import { Logger } from "../logger.ts";

const logger = new Logger("yamlfmt");

export default async function init(context: ExtensionContext) {
	const wasm_uri = Uri.joinPath(context.extensionUri, sql_wasm);

	const bits = await workspace.fs.readFile(wasm_uri);
	yaml_init(bits);
}

export function formattingSubscription() {
	return languages.registerDocumentFormattingEditProvider(["yaml", "github-actions-workflow"], {
		provideDocumentFormattingEdits(document, options, token) {
			const text = document.getText();

			const indent_style = options.insertSpaces ? "space" : "tab";
			const indent_width = options.tabSize;

			logger.info(
				document.languageId,
				document.fileName,
				JSON.stringify({ indent_style, indent_width }),
			);

			try {
				const formatted = yamlfmt(text, document.fileName, {
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
