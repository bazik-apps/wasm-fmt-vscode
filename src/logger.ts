import { window } from "vscode"

export class Logger {
	private static readonly output = window.createOutputChannel("wasm-fmt")

	private scope: string

	constructor(scope: string) {
		this.scope = scope
	}

	log(...args: unknown[]) {
		Logger.output.appendLine(`[log][${this.scope}] ${args.join(" ")}`)
	}

	error(...args: unknown[]) {
		Logger.output.appendLine(`[error][${this.scope}] ${args.join(" ")}`)
		Logger.output.show()
	}

	warn(...args: unknown[]) {
		Logger.output.appendLine(`[warn][${this.scope}] ${args.join(" ")}`)
	}

	info(...args: unknown[]) {
		Logger.output.appendLine(`[info][${this.scope}] ${args.join(" ")}`)
	}

	debug(...args: unknown[]) {
		Logger.output.appendLine(`[debug][${this.scope}] ${args.join(" ")}`)
	}
}
