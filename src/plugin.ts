import streamDeck, { LogLevel } from '@elgato/streamdeck'

import { ShowDisplay } from './actions/show-display'

streamDeck.logger.setLevel(LogLevel.TRACE)

streamDeck.actions.registerAction(new ShowDisplay())

streamDeck.connect()
