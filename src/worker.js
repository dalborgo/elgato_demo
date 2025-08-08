import streamDeck from '@elgato/streamdeck'

import { execPS } from './execPS.js'

async function fetchMonitorInfo() {
	try {
		const value = await execPS('get_display_refresh_rate.ps1')
		return process.send?.({ type: 'displayState', value })
	} catch (err) {
		streamDeck.logger.error("Errore esecuzione PowerShell:", err.message)
	}
}

process.on("message", (msg) => {
	if (msg.type === 'getDisplayState') {
		fetchMonitorInfo().then()
	}
})
