import { config } from '@elgato/eslint-config'
import { defineConfig } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'

export default defineConfig([
	{
		extends: [config.recommended],
		plugins: {
			import: importPlugin,
		},
		rules: {
			"@typescript-eslint/explicit-member-accessibility": "off",
			"@typescript-eslint/member-ordering": "off",
			"@typescript-eslint/sort-type-constituents": "off",
			"jsdoc/require-jsdoc": "off",
			
			// ✅ Regola per ordinare gli import con plugin-import
			'import/order': [
				'warn',
				{
					groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],
		},
	},
])
