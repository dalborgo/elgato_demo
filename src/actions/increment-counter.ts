import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from '@elgato/streamdeck'

/**
 * An example action class that displays a count that increments by one each time the button is pressed.
 */
@action({ UUID: 'com.mdb.hello-world.increment' })
export class IncrementCounter extends SingletonAction<CounterSettings> {

	override onWillAppear (ev: WillAppearEvent<CounterSettings>): void | Promise<void> {
		return ev.action.setTitle(`${ev.payload.settings.count ?? 0}`)
	}

	override async onKeyDown (ev: KeyDownEvent<CounterSettings>): Promise<void> {
		// Update the count from the settings.
		const { settings } = ev.payload
		settings.incrementBy ??= 1
		settings.count = (settings.count ?? 0) + settings.incrementBy

		// Update the current count in the action's settings, and change the title.
		await ev.action.setSettings(settings)
		await ev.action.setTitle(`${settings.count}`)
	}
}

type CounterSettings = {
	count?: number
	incrementBy?: number
}
