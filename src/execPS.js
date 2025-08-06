import { exec } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function execPS(fileName) {
	const scriptPath = path.join(__dirname, "scripts", fileName)
	return new Promise((resolve, reject) => {
		const fullPath = path.resolve(scriptPath)
		const cmd = `powershell.exe -NoProfile -ExecutionPolicy Bypass -File "${fullPath}"`

		exec(cmd, { maxBuffer: 1024 * 500 }, (err, stdout, stderr) => {
			if (err) {
				return reject(new Error(stderr || err.message))
			}

			try {
				const json = JSON.parse(stdout)
				resolve(json)
			} catch (err) {
				console.error(err.message)
				reject(new Error(`Errore nel parsing JSON:\n${stdout}`))
			}
		})
	})
}
