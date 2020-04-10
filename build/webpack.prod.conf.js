const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.base.conf.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = merge(common, {
    optimization: {
    // 分离chunks
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              name: "vendor",
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: "initial" // 只打包初始时依赖的第三方
            },
          }
        },
        minimizer: [
          // 压缩JS
          new UglifyJsPlugin({
            cache: true, // 开启缓存
            parallel: true, // 平行压缩
            sourceMap: true // set to true if you want JS source maps
          }),
          // 压缩css
          new OptimizeCSSAssetsPlugin({}),
          //new BundleAnalyzerPlugin()
        ]
    },
    module: {
        rules: [

            {
                test: /\.css$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      // you can specify a publicPath here
                      // by default it use publicPath in webpackOptions.output
                      publicPath: '../../' //主要用于css中background: url中路径调整
                    }
                  },
                  'css-loader',
                  'postcss-loader',
                ],
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      // you can specify a publicPath here
                      // by default it use publicPath in webpackOptions.output
                      publicPath: '../../' //主要用于css中background: url中路径调整
                    }
                  },
                  'css-loader',
                  'postcss-loader',
                  'sass-loader',
              ],
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
            chunkFilename: 'static/css/[id].css'
        }),
        new webpack.DefinePlugin({
			runEnv: JSON.stringify('prod')
        })
    ],
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter'
    },
    devtool: 'source-map',
    mode: 'production',
    //entry: [`${__dirname}/../src/components/button`],
    entry: {
        index: `${__dirname}/../src/components/index`
    },
    // entry: {
    //     gldButton: `${__dirname}/../src/components/button`,
    //     gldBpmnViewer: `${__dirname}/../src/components/viewer`
    // },
    output: {
        path: path.resolve(__dirname, '../dist'),//输出路径，就是上步骤中新建的dist目录，
        publicPath: '/dist/',
        filename: '[name].js',
        library: 'gldBpmn',
        libraryTarget: 'commonjs2',
        //umdNamedDefine: true
    }
});
module.exports = config;