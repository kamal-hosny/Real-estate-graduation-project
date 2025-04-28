import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        expandProps: 'end',
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://mohamedtahoon.runasp.net',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
      },
    },
  },
});
