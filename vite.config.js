import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Change this to your repo name when deploying to GitHub Pages
  // e.g., base: '/weather-app/'
  base: '/'
});