const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const threadLoader = require('thread-loader');
const config = require('./config');
const { resolve, isProd } = require('./tools');
const pkg = require('../package.json');

threadLoader.warmup(
  {
    workers: 4,
  },
  ['babel-loader', '@babel/preset-env']
);

const baseConfig = {
  target: 'web',
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'source-map',
  entry: {
    index: resolve('src/index.js'),
    
  },
  output: {
    filename: '[name].js',
    path: resolve(`dist`),
    library: pkg.name,
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.json'],
    
    alias: {
      '@src': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        
        // loader: 'babel-loader',
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 4,
            },
          },
          'cache-loader',
          'babel-loader?cacheDirectory=true',
        ],
        include: [resolve('src'), resolve('demo')],
      },
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: { inline: true, fallback: false },
        },
        include: [resolve('src'), resolve('demo')],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_ENV: JSON.stringify(process.env.BUILD_ENV),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_PATH: JSON.stringify(config[process.env.BUILD_ENV].API_PATH),
      },
    }),
  ],
};

module.exports = baseConfig;
