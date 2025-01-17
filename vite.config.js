import { defineConfig, loadEnv  } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      'process.env.VITE_GOOGLE_CLIENT_ID': JSON.stringify(env.VITE_GOOGLE_CLIENT_ID)
    },
    server: {
      port: 5173,
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
      }
    }
  };
});