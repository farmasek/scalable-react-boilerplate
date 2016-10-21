import webpack from 'webpack';
import path from 'path';
import HtmlwebpackPlugin from 'html-webpack-plugin';
import NpmInstallPlugin from 'npm-install-webpack-plugin';
import Visualizer from 'webpack-visualizer-plugin';
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname);

const env = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 1337;
const HOST = '0.0.0.0'; // Set to localhost if need be.

const pathToTheme = JSON.stringify(path.resolve('styles/_theme.scss')).replace('"', '').replace('"', '').split('\\\\').join('/');

module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? '' : 'source-map',
  entry: [
    path.resolve(ROOT_PATH, 'app/src/index')
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: process.env.NODE_ENV === 'production' ? [] : ['eslint'],
        include: path.resolve(ROOT_PATH, './app'),
      }
    ],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel']
    },
      {
        test: /\.svg$/,
        loader: 'babel!svg-react'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /(\.scss|\.css)$/,
        exclude: [/\.module\.scss$/, /flexboxgrid/],
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
      },

      {
        test: /\.module\.scss$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'resolve-url',
          'sass'
        ]
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules',
        include: /flexboxgrid/,
      },
      {
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
        loader: "url-loader?mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
        loader: "file-loader?name=[name].[ext]"
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file?name=[path][name].[hash].[ext]'
      },

    ]
  },

  postcss: [autoprefixer],
  sassLoader: {
    data: '@import "app/styles/_config.scss";',
    includePaths: [path.resolve(ROOT_PATH, 'app/src/')]
  },

  resolve: {
    extensions: ['', '.scss', '.css', '.js', '.json'],
    modulesDirectories: [
      'node_modules',
      path.resolve(ROOT_PATH, './node_modules')
    ],
    alias: {
      components: path.resolve(ROOT_PATH, 'app/src/components'),
      containers: path.resolve(ROOT_PATH, 'app/src/containers'),
      taiComponents: path.resolve(ROOT_PATH, 'app/src/tai/components'),
      taiContainers: path.resolve(ROOT_PATH, 'app/src/tai/containers'),
      pages: path.resolve(ROOT_PATH, 'app/src/pages')
    },
  },
  output: {
    path: process.env.NODE_ENV === 'production' ? path.resolve(ROOT_PATH, 'server/public') : path.resolve(ROOT_PATH, 'app/build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(ROOT_PATH, 'app/build'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    // Constants defined above take care of logic
    // For setting host and port
    host: HOST,
    port: PORT
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', {allChunks: true}),
    new webpack.HotModuleReplacementPlugin(),
    new NpmInstallPlugin(),
    new HtmlwebpackPlugin({
      title: 'Scalable React Boilerplate',
      template: 'index.html'
    }),
    new Visualizer()
  ]
};