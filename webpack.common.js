const path = require("path");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  plugins: [new ESLintPlugin()],


  entry: {
    ShuttleExpress: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    libraryTarget: "umd",
    library: '[name]',
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.ts/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
};
