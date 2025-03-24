import zig_init, { format } from "@wasm-fmt/zig_fmt"
import zig_wasm from "@wasm-fmt/zig_fmt/zig_fmt.wasm"
import type { ExtensionContext } from "vscode"
import { Range, TextEdit, Uri, languages, workspace } from "vscode"
import { Logger } from "../logger.ts"

const logger = new Logger("zig-fmt")

export const zigFormatInit = async (context: ExtensionContext) => {
	const wasm_uri = Uri.joinPath(context.extensionUri, zig_wasm)

	const bits = await workspace.fs.readFile(wasm_uri)
	await zig_init(bits)
}

export const zigFormatSubscription = () => {
	return languages.registerDocumentFormattingEditProvider(
		// TODO: ZON
		["zig", { pattern: "**/*.zig", scheme: "file" }],
		{
			provideDocumentFormattingEdits(document) {
				const text = document.getText()

				logger.log(document.languageId, document.fileName)

				try {
					const formatted = format(text)

					const range = document.validateRange(
						new Range(document.positionAt(0), document.positionAt(text.length)),
					)
					return [TextEdit.replace(range, formatted)]
				} catch (error) {
					logger.error(error)
					return []
				}
			},
		},
	)
}
