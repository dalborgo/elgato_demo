import streamDeck from '@elgato/streamdeck'

import { execPS } from './execPS.js'

async function fetchMonitorInfo() {
	try {
		const displays = await execPS("test.ps1")
		streamDeck.logger.info("Output monitor:", displays)
	} catch (err) {
		streamDeck.logger.error("Errore esecuzione PowerShell:", err.message)
	}
}

process.on("message", (msg) => {
	if (msg.type === "increment") {
		fetchMonitorInfo().then()
	}
})
