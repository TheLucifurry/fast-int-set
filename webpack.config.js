const path = require('path');
const webpack = require('webpack');

const IS_PROD = /--mode[= ]production/.test(process.argv.join(' '));

const PATHS = {
  SRC: path.join(__dirname, 'src'),
  DIST: path.join(__dirname, 'dist'),
};

module.exports = {
  mode: IS_PROD ? 'production' : 'development',
  devtool: IS_PROD ? false : 'source-map',
  watch: !IS_PROD,
  entry: {
    'index': PATHS.SRC + '/index.ts'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].js"
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      IS_DEV: !IS_PROD,
    }),
  ],
};