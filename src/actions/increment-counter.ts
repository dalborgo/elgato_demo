import streamDeck, { action, KeyDownEvent, SingletonAction, WillAppearEvent } from '@elgato/streamdeck'
import { fork } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const worker = fork(path.resolve(__dirname, 'worker.js'))

worker.on('message', (msg: { type: string; value?: number }) => {
	if (msg.type === 'result') {
		console.log('✅ Worker ha terminato, nuovo valore:', msg.value)
	}
})

@action({ UUID: "com.mdb.hello-world.increment" })
export class IncrementCounter extends SingletonAction<CounterSettings> {
	override onWillAppear (ev: WillAppearEvent<CounterSettings>): void | Promise<void> {
		return ev.action.setTitle(`${ev.payload.settings.count ?? 0}`)
	}

	override async onKeyDown (ev: KeyDownEvent<CounterSettings>): Promise<void> {
		const { settings } = ev.payload
		settings.incrementBy ??= 1
		settings.count = (settings.count ?? 0) + settings.incrementBy
		worker.send({ type: 'increment', payload: settings.count })
		streamDeck.logger.info('DUSPAAAA1ZZZZ333', settings.count)
		await ev.action.setSettings(settings)
		await ev.action.setTitle(`${settings.count}`)
	}
}

type CounterSettings = {
	count?: number
	incrementBy?: number
}
