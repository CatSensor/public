import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig((): UserConfig => {
  return {
    plugins: [
      vue(),
      visualizer({
        filename: 'dist/bundle-report.html',
        template: 'sunburst',
        gzipSize: true,
        brotliSize: true,
        sourcemap: false,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(rootDir, 'src'),
      },
    },
    build: {
      assetsInlineLimit: 0,
      chunkSizeWarningLimit: 800,
      cssCodeSplit: true,
      minify: 'oxc',
      reportCompressedSize: false,
      sourcemap: false,
      target: 'es2022',
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
    },
  }
})
