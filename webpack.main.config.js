'use strict';
const path = require('path');
const webpack = require('webpack');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');

let nodeModulesPath = path.resolve(__dirname, 'node_modules');

let entry= {
  index: './src/main/index.js'
};

let module_config= {
  rules: []
};

let resolve = {};

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
