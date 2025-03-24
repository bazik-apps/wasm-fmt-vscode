#!/usr/bin/env -S node --experimental-transform-types

import process from "node:process"
import type { BuildOptions } from "esbuild"
import { build, context } from "esbuild"

const options: BuildOptions = {
	bundle: true,
	entryPoints: ["src/extension.ts"],
	external: ["vscode"],
	format: "esm",
	loader: { ".wasm": "file" },
	outdir: "out",
	publicPath: "out",
	sourcemap: "inline",
	target: "es2020",
}

if (process.argv.includes("--watch")) {
	const ctx = await context(options)
	ctx.watch()
	console.log("Watching for changes...")

	process.on("SIGINT", () => {
		ctx.dispose()
		console.log("Stopped and cleaned up.")
		process.exit(0)
	})
} else {
	if (process.argv.includes("--production")) {
		options.minify = true
		options.sourcemap = false
	}

	await build(options)
}
