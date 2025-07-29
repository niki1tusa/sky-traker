import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@/types': path.resolve(__dirname, './src/shared/types/'),
		},
	},
	plugins: [react(), tailwindcss()],
});
