import go_init, { format as gofmt } from "@wasm-fmt/gofmt";
import go_wasm from "@wasm-fmt/gofmt/gofmt.wasm";
import * as vscode from "vscode";

export default async function init(context: vscode.ExtensionContext) {
	const wasm_uri = vscode.Uri.joinPath(context.extensionUri, go_wasm);

	const bits = await vscode.workspace.fs.readFile(wasm_uri);
	await go_init(bits);
}

export function formattingSubscription() {
	return vscode.languages.registerDocumentFormattingEditProvider("go", {
		provideDocumentFormattingEdits(document, options, token) {
			const text = document.getText();

			const formatted = gofmt(text);

			const range = document.validateRange(
				new vscode.Range(document.positionAt(0), document.positionAt(text.length)),
			);
			return [vscode.TextEdit.replace(range, formatted)];
		},
	});
}
