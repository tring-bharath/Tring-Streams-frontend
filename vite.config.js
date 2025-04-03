import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import envCompatible from 'vite-plugin-env-compatible';

export default defineConfig({
  plugins: [envCompatible(), react()],
  server: {
    host: true,  // Allows external connections (including ngrok)
    port: 5173,  // Optional: Set a fixed port
    cors: true,  // Enables cross-origin requests
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
});
