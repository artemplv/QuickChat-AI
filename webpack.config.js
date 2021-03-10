const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js-bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      'handlebars' : 'handlebars/dist/handlebars.js'
    }
  },
  devServer: {
    contentBase: 'dist',
    compress: true,
    host: '0.0.0.0',
    public: 'powerful-castle-19480.herokuapp.com',
    historyApiFallback: true,
    port: process.env.PORT || 3001
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /(node_modules)/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /template$/,
        use: [
          {
            loader: 'handlebars-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.svg/,
        type: 'asset/inline'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style-bundle.css',
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          context: path.resolve(__dirname, 'src', 'static'),
          to: './static',
        },
      ],
    })
  ]
};
