import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    // eslint-disable-next-line no-undef
    'process.env': process.env,
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
  },
});
