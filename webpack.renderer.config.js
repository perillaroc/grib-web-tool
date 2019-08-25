const path = require('path');

const dev_server = {
  contentBase: './',
  port: 6740
};

const module_config = {
  rules: [
    {
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      }
    },
    {
      test: /\.css$/,
      use: [
        'style-loader', 'css-loader'
      ]
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader', 'css-loader', 'sass-loader'
      ]
    },
    {
      test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }]
    }
  ]
};

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: dev_server,

  entry: [
    './src/renderer/index.tsx'
  ],

  output: {
    publicPath: '/app/renderer',
    filename: '[name].entry.js',
    path: path.resolve(__dirname, './dist/app/renderer')
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  target: 'electron-renderer',
  module: module_config
};
