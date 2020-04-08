const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.base.conf.js');
const path = require('path');

module.exports = merge(common, {
    //devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        inline:true,
        contentBase: path.resolve(__dirname, '../dist'),
        host:'localhost',
        port:"8080",
        // proxy: {
        //     '/portal': {
        //          target: 'http://10.112.68.79:8080/portal', //300
        //          //target: 'http://10.2.118.104:8080/portal',//任红颜
        //         changeOrigin: true,
        //         pathRewrite: {'^/portal' : ''}
        //     },
        //     '/ue': {
        //        target: 'http://10.144.34.65:8080/portal', //300
        //       changeOrigin: true,
        //       pathRewrite: {'^/ue' : ''}
        //   },
        //     '/HOWebApp': {
        //       target: 'http://10.0.222.12', //yuanyi 300
        //       changeOrigin: true,
        //   }
        // }
    },
    entry: [`${__dirname}/../src/index.js`],
    output: {
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules:[
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader'
                ],
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
			runEnv: JSON.stringify('local')
        }),
    ],
    mode: 'development',
});