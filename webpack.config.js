const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: "development",
  entry: ["./src/index.js", "@babel/polyfill"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
  },
  devServer: {
    port: 3000,
  },
  plugins: [
    new HTMLWebpackPlugin({ template: "./public/index.html" }),
    new CleanWebpackPlugin(),
    new ESLintPlugin(),
  ],
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        use: ["file=loader"]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        loader: 'babel-loader',
        test: /\.js$|jsx/,
        exclude: /node_modules/
      }
    ]
  }
};