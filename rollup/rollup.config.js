import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { readFileSync } from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import { visualizer } from 'rollup-plugin-visualizer';
import replace from '@rollup/plugin-replace';
import html from '@rollup/plugin-html';
import url from '@rollup/plugin-url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const content = readFileSync(path.resolve(__dirname, 'src/index.html'), 'utf8');

export default {
  input: 'src/App.tsx',
  output: {
    dir: 'dist',
    format: 'es',
    entryFileNames: '[name].[hash].js',
  },
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json'
    }),
    json(),
    url({
      include: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
      limit: 0,
      fileName: '[hash][extname]',
      destDir: 'dist',
    }),
    postcss({
      extract: true,
      minimize: true,
      use: ['sass']
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    html({
      fileName: 'index.html',
      template: ({ files, publicPath }) => {
        const { js = [{ fileName: 'miss.js' }] } = files;
        return content
          .replace(
            '<link rel="stylesheet" href="main.scss">',
            `<link rel="stylesheet" href="${publicPath}main.css">`,
          )
          .replace(
            '<script src="App.tsx"></script>', 
            `<script src="${publicPath}${js[0].fileName}"></script>`,
          );
      },
      minify: true,
    }),
    terser(),
    visualizer({
      filename: 'dist/bundle-analysis.html',
      open: false
    })
  ]
};
