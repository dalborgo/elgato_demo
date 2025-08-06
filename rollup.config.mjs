import path from 'node:path'
import url from 'node:url'

import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import fg from 'fast-glob'
import copy from 'rollup-plugin-copy'

const isWatching = !!process.env.ROLLUP_WATCH
const sdPlugin = "com.mdb.hello-world.sdPlugin"

const config = {
	input: "src/plugin.ts",
	output: {
		file: `${sdPlugin}/bin/plugin.js`,
		sourcemap: isWatching,
		sourcemapPathTransform: (relativeSourcePath, sourcemapPath) => {
			return url.pathToFileURL(path.resolve(path.dirname(sourcemapPath), relativeSourcePath)).href
		},
	},
	plugins: [
		{
			name: "watch-externals",
			async buildStart () {
				this.addWatchFile(`${sdPlugin}/manifest.json`)
				const files = await fg(["src/**/*.js", "src/**/*.ps1"])
				for (const file of files) {
					this.addWatchFile(path.resolve(file))
				}
			},
		},
		typescript({
			mapRoot: isWatching ? "./" : undefined,
		}),
		nodeResolve({
			browser: false,
			exportConditions: ["node"],
			preferBuiltins: true,
		}),
		commonjs(),
		!isWatching && terser(),
		{
			name: "emit-module-package-file",
			generateBundle () {
				this.emitFile({ fileName: "package.json", source: `{ "type": "module" }`, type: "asset" })
			},
		},
		copy({
			targets: [
				{
					src: "src/**/*.js",
					dest: `${sdPlugin}/bin/`,
					flatten: false,
				},
				{
					src: 'src/scripts/**/*.ps1',
					dest: `${sdPlugin}/bin/scripts/`,
					flatten: true,
				},
			],
			verbose: true,
			hook: "writeBundle",
		}),
	],
}

export default config
