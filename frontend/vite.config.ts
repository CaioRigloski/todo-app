import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite'

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig(
    {
      plugins: [
        vue(),
        tailwindcss()
      ],
      server: {
        proxy: {
          '/api': env.VITE_API_URL || 'http://localhost:3000',
        },
      },
      resolve: {
        alias: {
          '@': '/src'
        },
      },
    }
  )
};
