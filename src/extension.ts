// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import type { ExtensionContext } from "vscode";
import { clangFormatInit, clangFormatSubscription } from "./clang-format/clang-format.ts";
import { dartFormatInit, dartFormatSubscription } from "./dart-fmt/dart-fmt.ts";
import { goFormatInit, goFormatSubscription } from "./gofmt/gofmt.ts";
import { Logger } from "./logger.ts";
import { luaFormatInit, luaFormatSubscription } from "./lua-fmt/lua-fmt.ts";
import { pythonFormatInit, pythonFormatSubscription } from "./python-fmt/python-fmt.ts";
import { sqlFormatInit, sqlFormatSubscription } from "./sql-fmt/sql-fmt.ts";
import { webFormatInit, webFormatSubscription } from "./web-fmt/web-fmt.ts";
import { yamlFormatInit, yamlFormatSubscription } from "./yamlfmt/yamlfmt.ts";
import { zigFormatInit, zigFormatSubscription } from "./zig-fmt/zig-fmt.ts";

const logger = new Logger("plugin");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: ExtensionContext) {
	await clangFormatInit(context);
	await dartFormatInit(context);
	await goFormatInit(context);
	await luaFormatInit(context);
	await pythonFormatInit(context);
	await sqlFormatInit(context);
	await webFormatInit(context);
	await yamlFormatInit(context);
	await zigFormatInit(context);

	logger.info("initiated");

	context.subscriptions.push(clangFormatSubscription());
	context.subscriptions.push(dartFormatSubscription());
	context.subscriptions.push(goFormatSubscription());
	context.subscriptions.push(luaFormatSubscription());
	context.subscriptions.push(pythonFormatSubscription());
	context.subscriptions.push(sqlFormatSubscription());
	context.subscriptions.push(webFormatSubscription());
	context.subscriptions.push(yamlFormatSubscription());
	context.subscriptions.push(zigFormatSubscription());
}

// This method is called when your extension is deactivated
export function deactivate() {
	logger.info("deactivated");
}
