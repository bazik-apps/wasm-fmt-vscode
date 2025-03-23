import { format as lua_fmt, initSync as lua_init } from "@wasm-fmt/lua_fmt";
import lua_wasm from "@wasm-fmt/lua_fmt/lua_fmt_bg.wasm";
import type { ExtensionContext } from "vscode";
import { Range, TextEdit, Uri, languages, workspace } from "vscode";
import { Logger } from "../logger.ts";

const logger = new Logger("lua-fmt");

export default async function init(context: ExtensionContext) {
	const wasm_uri = Uri.joinPath(context.extensionUri, lua_wasm);

	const bits = await workspace.fs.readFile(wasm_uri);
	lua_init(bits);
}

export function formattingSubscription() {
	return languages.registerDocumentFormattingEditProvider("lua", {
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
				const formatted = lua_fmt(text, document.fileName, {
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
