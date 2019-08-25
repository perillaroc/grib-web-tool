'use strict';
const path = require('path');
const webpack = require('webpack');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');

let entry= {
  index: './src/main/index.ts'
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

let resolve = {
  extensions: [".ts", ".tsx", ".js", ".json"]
};

const package_config = require("./package.json");

let app_package_config = {
  "name": package_config.name,
  "productName": "grib-web-tool",
  "version": package_config.version,
  "description": package_config.description,
  "main": "./index.bundle.js",
  "author": package_config.author,
  "license": package_config.license,
  "dependencies": package_config.dependencies,
  "files": [
    "./index.html",
  ],
};

let plugins = [
  new CopyWebPackPlugin([
    {'from': './src/main/index.html'},
  ]),
  new GenerateJsonPlugin('package.json', app_package_config, null, 2)
];

let externals= {};

module.exports = {
  mode: 'development',
  devtool: "source-map",
  entry: entry,
  output: {
    path: path.join(__dirname, './dist/app'),
    filename: "[name].bundle.js",
    sourceMapFilename: '[file].map'
  },
  module: module_config,
  externals: externals,
  plugins: plugins,
  resolve: resolve,
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false
  }
};
