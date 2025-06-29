import { config } from "@elgato/eslint-config"
import { defineConfig } from "eslint/config"

export default defineConfig([
	{
		extends: [config.recommended],
		
		rules: {
			"@typescript-eslint/explicit-member-accessibility": "off",
			"@typescript-eslint/member-ordering": "off",
			"@typescript-eslint/sort-type-constituents": "off",
			"jsdoc/require-jsdoc": "off",
		},
	},
])
