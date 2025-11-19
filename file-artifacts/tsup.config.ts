import { defineConfig } from "tsup"

export default defineConfig({
	entry: {
		index: "src/index.ts",
	},
	outDir: "dist",
	format: ["cjs", "esm"],
	target: "node18",
	sourcemap: true,
	clean: true,
	splitting: false,
	dts: false, // ✅ JS only, no declarations from tsup
	external: [
		"@aws-sdk/client-s3",
		"@aws-sdk/lib-storage",
		"fs-extra",
	],
})
