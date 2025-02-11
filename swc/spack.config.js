const { config } = require('@swc/core/spack');
const path = require('path');

module.exports = config({
  entry: {
    web: path.resolve(__dirname, '/src/App.tsx'),
  },
  output: {
    path: path.resolve(__dirname, '/dist'),
    name: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        // exclude: /.*/,
        exclude: /\.scss$/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        // exclude: /.*/,
        exclude: /\.(png|jpe?g|gif|svg)$/,
      },
    ],
  },
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
});

// 🌟 .swcrc 없이 트랜스파일링 옵션 설정해서 사용하는 방법
// module.exports = {
//   ...
//   module: {
//     type: "es6", // "commonjs" | "es6"
//   },
//   options: {
//     jsc: {
//       parser: {
//         syntax: "typescript",
//         tsx: true,
//       },
//       target: "es2020",
//     },
//   },
// };
