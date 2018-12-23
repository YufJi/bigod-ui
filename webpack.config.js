const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin')

const argv = require('minimist')(process.argv.slice(2));

const OUTPUT_PATH = path.resolve(__dirname, './dist');
const SRC_PATH = path.resolve(__dirname, './example');

const server_path = argv['server_path'] || 'dist';

const chunks = ['Header', 'HeaderFixed'];

const generateEntry = () => {
  let entry = {};
  chunks.forEach((key) => {
    entry[key] = `${SRC_PATH}/${key}.js`
  })
  return entry;
}

module.exports = {
  entry: generateEntry(),
  output: {
    path: OUTPUT_PATH,
    filename: '[name]/index.js',
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.json']
  },
  devServer: {
    contentBase: `./${server_path}`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    ...chunks.map((item) => new HtmlWebpackPlugin({
      template: './example/index.html',
      chunks: [item],
      filename: `${item}.html`,
      hash: true,
    }))
  ]
}
