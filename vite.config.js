import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 이게 있어야 ngrok에서도 접속 가능
    allowedHosts: ['chaotically-nongrounding-juliet.ngrok-free.app'],
  },
});
