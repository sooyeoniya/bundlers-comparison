import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const files = fs.readdirSync(distDir);
const jsFile = files.find(file => file.startsWith('App.') && file.endsWith('.js'));

let html = fs.readFileSync('src/index.html', 'utf8');

html = html.replace(
  '<link rel="stylesheet" href="main.scss">',
  '<link rel="stylesheet" href="main.css">'
);

html = html.replace(
  '<script src="App.tsx"></script>',
  `<script src="${jsFile}"></script>`
);

fs.writeFileSync('dist/index.html', html);
