import dart_init, { format } from "@wasm-fmt/dart_fmt";
import dart_wasm from "@wasm-fmt/dart_fmt/dart_fmt.wasm";
import type { ExtensionContext } from "vscode";
import { Range, TextEdit, Uri, languages, workspace } from "vscode";
import { Logger } from "../logger.ts";

const logger = new Logger("dart-fmt");

export async function dartFormatInit(context: ExtensionContext) {
	const wasm_uri = Uri.joinPath(context.extensionUri, dart_wasm);

	const bits = await workspace.fs.readFile(wasm_uri);
	await dart_init(bits);
}

export function dartFormatSubscription() {
	return languages.registerDocumentFormattingEditProvider("dart", {
		provideDocumentFormattingEdits(document) {
			const text = document.getText();

			logger.info(document.languageId, document.fileName);

			try {
				const formatted = format(text, document.fileName);

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
