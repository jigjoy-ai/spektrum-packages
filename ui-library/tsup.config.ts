import { defineConfig } from "tsup"
import fs from "fs"
import path from "path"

export default defineConfig({
	format: ["cjs", "esm"],
	entry: ["src/index.ts"],
	external: ["react", "react-dom", "framer-motion"],
	target: "es2019",
	dts: true,
	outDir: "dist",
	clean: true,
	esbuildOptions() {
		const src = path.resolve("src/index.css")
		const dest = path.resolve("dist/theme.css")
		fs.copyFileSync(src, dest)
	},
})
