import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';

export default defineConfig(({ isSsrBuild }) => {
  console.log('isSsrBuild: ', isSsrBuild); // true: SSR 빌드 (minify 기본값: false), false: client 빌드 (minify 기본값: esbuild)
  return { 
    plugins: [
      react(),
      visualizer({
        filename: 'dist/bundle-analysis.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    build: {
      target: 'es2020',
      outDir: 'dist',
      sourcemap: false,
      terserOptions: {
        compress: {
          dead_code: true,
          unused: true,
        },
        mangle: true,
      },
      rollupOptions: {
        input: {
          app: resolve(__dirname, 'src/index.html'),
        },
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
          },
          entryFileNames: '[name].[hash].js',
          chunkFileNames: '[name].[hash].js',
          assetFileNames:  '[name].[hash][extname]',
        },
      },
    },
  }
});
