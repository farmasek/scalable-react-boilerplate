/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);

module.exports = {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:1337',
    'webpack/hot/only-dev-server',
    path.resolve(ROOT_PATH, 'app/src/index'),
  ],
  output: {
    path: path.resolve(ROOT_PATH, 'app/build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['eslint-loader'],
        include: path.resolve(ROOT_PATH, './app'),
        enforce: 'pre'
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.md$/,
        loader: "html!markdown"
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.module\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!resolve-url-loader!postcss-loader!sass-loader'
        }),
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module\.scss$/,
        loader: 'style-loader!css-loader?importLoaders=2!postcss-loader!sass-loader?sourceMap&outputStyle=expanded'
      },
      {
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
        loader: 'url-loader?mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file?name=[path][name].[hash].[ext]'
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      components: path.resolve(ROOT_PATH, 'app/src/components'),
      containers: path.resolve(ROOT_PATH, 'app/src/containers'),
      pages: path.resolve(ROOT_PATH, 'app/src/pages'),
      fragments: path.resolve(ROOT_PATH, 'app/src/fragments'),
      config: path.resolve(ROOT_PATH, 'app/src/config'),
    },
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: ROOT_PATH,
        output: {
          path: ROOT_PATH
        },
        postcss () {
          return {
            defaults: [precss, autoprefixer],
            cleaner: [autoprefixer({ browsers: [] })]
          };
        },
        // sassLoader: {
        //   data: '@import "app/styles/_config.scss";',
        //   includePaths: [
        //     './node_modules',
        //   ]
        // },
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlwebpackPlugin({
      title: 'Scalable boilerplate',
      template: 'config/templates/_index.dev.html',
    }),
    new ExtractTextPlugin({
      filename: '[name].[id].style.css',
      allChunks: false
    })
  ],
};
