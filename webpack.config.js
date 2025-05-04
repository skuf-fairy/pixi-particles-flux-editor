const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  const definePlugin = new webpack.DefinePlugin({
    __DEV__: env.dev,
  });

  return {
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: env.production ? 'js/[name].min.js' : 'js/bundle.js',
      clean: true,
    },
    mode: env.production,
    optimization: {
      minimize: env.production,
      minimizer: [new TerserPlugin({parallel: true})],
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        src: path.resolve('./src'),
      },
    },
    plugins: [
      definePlugin,
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: 'index.html',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/fonts'),
            to: path.resolve(__dirname, 'build/fonts'),
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(ts)x?$/,
          loader: 'babel-loader',
          exclude: '/node-modules/',
        },
        {
          test: /\.css$/i,
          exclude: '/node-modules/',
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[path][name]__[local]--[hash:base64:10]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: true,
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|svg)$/i,
          use: [
            {
              loader: 'url-loader',
            },
          ],
        },
      ],
    },
    devtool: 'source-map',
    mode: 'development',
    devServer: {
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, './build'),
      },
      port: 8080,
      open: true,
    },
  };
};
