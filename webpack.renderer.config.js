const path = require('path');

const dev_server = {
  contentBase: './',
  port: 6740
};

const module_config = {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            "@babel/preset-react"
          ],
          plugins: [
            ["import", { "libraryName": "antd", "libraryDirectory": "lib"}, "ant"],
          ],
        }
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
  devtool: 'inline-source-map',
  devServer: dev_server,
  entry: [
    './src/renderer/index.js'
  ],
  output: {
    publicPath: '/app/renderer',
    filename: '[name].entry.js',
    path: path.resolve(__dirname, './dist/app/renderer')
  },
  target: 'electron-renderer',
  module: module_config
};
