import dart_init, { format as dart_fmt } from "@wasm-fmt/dart_fmt";
import dart_wasm from "@wasm-fmt/dart_fmt/dart_fmt.wasm";
import type { ExtensionContext } from "vscode";
import { Range, TextEdit, Uri, languages, workspace } from "vscode";
import { Logger } from "../logger.ts";

const logger = new Logger("dart-fmt");

export default async function init(context: ExtensionContext) {
	const wasm_uri = Uri.joinPath(context.extensionUri, dart_wasm);

	const bits = await workspace.fs.readFile(wasm_uri);
	await dart_init(bits);
}

export function formattingSubscription() {
	return languages.registerDocumentFormattingEditProvider("dart", {
		provideDocumentFormattingEdits(document, options, token) {
			const text = document.getText();

			logger.info(document.languageId, document.fileName);

			try {
				const formatted = dart_fmt(text, document.fileName);

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
