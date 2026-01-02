import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],

    server: {
      port: 3000,
      strictPort: true,
      host: 'localhost', // 🔥 FIX: avoid HMR confusion
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 3000,
      },
    },

    /**
     * 🔹 PREVENT VITE FROM SCANNING CMS admin/index.html
     */
    build: {
      rollupOptions: {
        input: '/index.html',
      },
    },

    /**
     * 🔹 ENV VARIABLES (Gemini / AI)
     */
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      global: {}, // ✅ REQUIRED for Buffer polyfill
    },

    /**
     * 🔹 MODULE RESOLUTION
     */
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        buffer: 'buffer',
      },
    },
  };
});
