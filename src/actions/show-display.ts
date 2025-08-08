import { fork } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from '@elgato/streamdeck'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const worker = fork(path.resolve(__dirname, 'worker.js'))

function getDisplayState (): Promise<string[] | null> {
	return new Promise((resolve): void => {
		const handler = (msg: WorkerMessage): void => {
			if (msg.type === 'displayState') {
				worker.off('message', handler)
				resolve(msg.value)
			}
		}
		worker.on('message', handler)
		worker.send({ type: 'getDisplayState' })
	})
}

async function updateActionTitle (ev: WillAppearEvent | KeyDownEvent): Promise<void> {
	const currentState = await getDisplayState()
	const title = currentState?.join('\n') ?? ''
	await ev.action.setTitle(title)
}

@action({ UUID: 'com.mdb.hello-world.show' })
export class ShowDisplay extends SingletonAction {
	override async onWillAppear (ev: WillAppearEvent): Promise<void> {
		await updateActionTitle(ev)
	}

	override async onKeyDown (ev: KeyDownEvent): Promise<void> {
		await updateActionTitle(ev)
	}
}

type WorkerMessage = { type: 'displayState'; value: string[] | null }
