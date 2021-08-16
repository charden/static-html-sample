const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const enabledSourceMap =  process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  devServer: {
    contentBase: path.join(__dirname, ''),
    open: true,
    watchContentBase: true,
    writeToDisk: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: enabledSourceMap,
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: enabledSourceMap,
              postcssOptions: {
                plugins: [
                  'autoprefixer',
                ],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
              },
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg|eot|wof|woff|ttf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './img/[name].[ext]'
            }
          }
        ],
      },
    ],
  },
  plugins: [
    //
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  devtool: "source-map",
  watchOptions: {
    ignored: /node_modules/
  },
};