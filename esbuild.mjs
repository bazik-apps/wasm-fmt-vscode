#!/usr/bin/env node
import { build, context } from "esbuild";
import process from "node:process";

/**
 * @typedef {import("esbuild").BuildOptions} BuildOptions
 */

/**
 * @type BuildOptions
 */
const options = {
	entryPoints: ["src/extension.ts"],
	outdir: "out",
	publicPath: "out",
	bundle: true,
	target: "es2020",
	loader: { ".wasm": "file" },
	external: ["vscode"],
	format: "cjs",
};

if (process.argv.includes("--watch")) {
	const ctxt = await context(options);
	ctxt.watch();
	console.log("Watching for changes...");

	process.on("SIGINT", () => {
		ctxt.dispose();
		console.log("Stopped and cleaned up.");
		process.exit(0);
	});
} else {
	if (process.argv.includes("--minify")) {
		options.minify = true;
	}

	await build(options);
}
