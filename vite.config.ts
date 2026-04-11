import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	test: {
		environment: 'node',
	},
	plugins: [tailwindcss(), sveltekit()],
})
