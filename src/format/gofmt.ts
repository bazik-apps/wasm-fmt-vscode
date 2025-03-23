import go_init, { format as gofmt } from "@wasm-fmt/gofmt";
import go_wasm from "@wasm-fmt/gofmt/gofmt.wasm";
import type { ExtensionContext } from "vscode";
import { Range, TextEdit, Uri, languages, workspace } from "vscode";
import { Logger } from "../logger.ts";

const logger = new Logger("gofmt");

export default async function init(context: ExtensionContext) {
	const wasm_uri = Uri.joinPath(context.extensionUri, go_wasm);

	const bits = await workspace.fs.readFile(wasm_uri);
	await go_init(bits);
}

export function formattingSubscription() {
	return languages.registerDocumentFormattingEditProvider("go", {
		provideDocumentFormattingEdits(document, options, token) {
			const text = document.getText();

			logger.log(document.languageId, document.fileName);

			try {
				const formatted = gofmt(text);

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
