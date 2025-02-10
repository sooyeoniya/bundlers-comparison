const { config } = require('@swc/core/spack');
const path = require('path');

module.exports = config({
  entry: {
    app: path.resolve(__dirname, 'src/App.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    name: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /.*/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        exclude: /.*/,
      },
    ],
  },
  mode: 'production',
});

// const { config } = require('@swc/core/spack');
// const path = require('path');

// module.exports = config({
//   entry: {
//     app: path.resolve(__dirname, 'src/App.tsx'),
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     name: '[name].[hash].js',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.scss$/,
//         use: false,
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)$/,
//         use: false,
//       },
//     ],
//   },
//   mode: 'production',
//   resolve: {
//     extensions: ['.ts', '.tsx', '.js'],
//   },
// });
