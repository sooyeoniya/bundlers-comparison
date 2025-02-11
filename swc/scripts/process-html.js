/**
 * SWC 번들링 완료 후, HTML 파일을 수정해 번들된 css와 js 파일을 참조하도록 업데이트하는 파일
 * SWC는 대체로 JSX, TS, TSX 변환 담당이기 때문에 다른 번들러처럼 기본적으로 HTML 파일을 자동으로 수정해주는 기능 없음
 */
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
