import { build } from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import { htmlPlugin } from '@craftamap/esbuild-plugin-html';
import fs from 'fs';

const htmlTemplate = `
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

(async () => {
  const result = await build({
    entryPoints: ['./src/App.tsx'],
    bundle: true,
    splitting: true,
    format: 'esm',
    minify: true,
    treeShaking: true,
    sourcemap: false,
    metafile: true,
    charset: 'utf8',
    outdir: 'dist',
    loader: {
      '.js': 'jsx',
      '.tsx': 'tsx',
      '.json': 'json',
      '.png': 'file',
      '.jpg': 'file',
      '.jpeg': 'file',
      '.svg': 'file',
      '.gif': 'file'
    },
    plugins: [
      sassPlugin(),
      htmlPlugin({
        files: [
          {
            entryPoints: ['src/App.tsx'],
            filename: 'index.html',
            title: 'esbuild 번들링 테스트',
            scriptLoading: 'module',
            inject: true,
            htmlTemplate: htmlTemplate,
          },
        ],
      }),
    ],
  });

  fs.writeFileSync('dist/metafile.json', JSON.stringify(result.metafile, null, 2));
})();
