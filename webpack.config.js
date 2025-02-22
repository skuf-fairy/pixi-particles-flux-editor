const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
  const definePlugin = new webpack.DefinePlugin({
    __DEV__: env.dev,
  });

  return {
    entry: {
      main: path.join(__dirname, "src/index.ts"),
    },
    output: {
      path: path.join(__dirname, "build"),
      filename: env.production ? "bundle.min.js" : "bundle.js",
      clean: true,
      publicPath: "/",
    },
    optimization: {
      minimize: env.production,
      minimizer: [new TerserPlugin({ parallel: true })],
    },
    resolve: {
      modules: ["node_modules"],
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        src: path.resolve("./src"),
      },
    },
    plugins: [
      definePlugin,
      new HtmlWebpackPlugin({
        template: "src/index.html",
        filename: "index.html",
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, "src/styles/fonts"),
            to: path.join(__dirname, "build/fonts"),
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(ts)x?$/,
          loader: "babel-loader",
          exclude: "/node-modules/",
        },
        {
          test: /\.scss?$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                url: false,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|svg)$/i,
          use: [
            {
              loader: "url-loader",
            },
          ],
        },
      ],
    },
    devtool: "source-map",
    mode: "development",
    devServer: {
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, "./build"),
      },
      port: 8080,
      open: true,
    },
  };
};
