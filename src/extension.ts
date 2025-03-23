// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import type { ExtensionContext } from "vscode";
import init, { formattingSubscription } from "./format/index.ts";
import { Logger } from "./logger.ts";

const logger = new Logger("plugin");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: ExtensionContext) {
	await init(context);

	logger.info("inited");

	context.subscriptions.push(formattingSubscription());
}

// This method is called when your extension is deactivated
export function deactivate() {
	logger.info("deactivated");
}
