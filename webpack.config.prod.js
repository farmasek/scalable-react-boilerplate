/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const ManifestPlugin = require('webpack-manifest-plugin');

const ROOT_PATH = path.resolve(__dirname);
const PORT = process.env.PORT || 1337;
const HOST = '0.0.0.0'; // Set to localhost if need be.

module.exports = {
  devtool: 'source-map',
  entry: {
    main: [
      path.resolve(ROOT_PATH, 'app/src/index')
    ],
    vendor: [
      'react',
      'react-dom',
    ],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [],
        include: path.resolve(ROOT_PATH, './app'),
        enforce: 'pre'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.module\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!resolve-url-loader!postcss-loader!sass-loader'
        }),
      },
      {
        test: /(\.scss|\.css)$/,
        exclude: [/\.inline\.scss$/, /\.module\.scss$/],

        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            'sass-loader'
          ]
        })
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
  output: {
    path: path.resolve(ROOT_PATH, 'server/public'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  stats: {
    chunks: true,
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
        sassLoader: {
          data: '@import "app/styles/_config.scss";',
          includePaths: [
            './node_modules',
          ]
        },
      }
    }),
    new ManifestPlugin({
      fileName: 'manifest.json',
      basePath: '/'
    }),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      children: true,
      minChunks: 2,
      async: true,
    }),
    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/',
      caches: {
        main: [':rest:'],

        // All chunks marked as `additional`, loaded after main section
        // and do not prevent SW to install. Change to `optional` if
        // do not want them to be preloaded at all (cached only when first loaded)
        additional: ['*.chunk.js'],
      },
      safeToUseOptionalCaches: true,
      AppCache: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new HtmlwebpackPlugin({
      title: 'Scalable boilerplate',
      template: 'config/templates/_index.dev.html',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
    }),
  ]
};
