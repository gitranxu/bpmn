const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                // 配置哪些引入路径按照模块方式查找
                options: {
                    transformAssetUrls: {
                        video: ['src', 'poster'],
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                    }
                }
            },
            {
                test: /\.js$/,
                //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
                loader: 'babel-loader',
                include: [ path.resolve(__dirname, '../src'), 
                    path.resolve(__dirname, '../node_modules/ismobilejs/esm/isMobile') ],
                //排除node_modules 目录下的文件
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/, // 处理图片
                use: [{
                    loader: 'url-loader',
                    options: {
                    limit: 10000,
                    name: 'static/img/[name].[hash:7].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 处理字体
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'static/fonts/[name].[hash:7].[ext]'
                }
            }
        ],
    },
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter'
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, '../src/index.html')
        }),
        new HappyPack({
            //用id来标识 happypack处理那里类文件
          id: 'happyBabel',
          //如何处理  用法和loader 的配置一样
          loaders: [{
            loader: 'babel-loader?cacheDirectory=true',
          }],
          //共享进程池
          threadPool: happyThreadPool,
          //允许 HappyPack 输出日志
          verbose: true,
        }),
        new CopyWebpackPlugin([{
		    from: path.resolve(__dirname, '../src/static/favicon.ico'),
            to: path.resolve(__dirname, '../dist/static/'),
		}]),
        //  new CopyWebpackPlugin([{
		//     from: path.resolve(__dirname, '../gmoa-base/src/lib/lower-browser-help'),
        //     to: path.resolve(__dirname, '../'+dist+'/static/js/lower-browser-help'),
        // }]),
    ],
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src'),
            'components': '@/components/',
            'pages': '@/pages/',
            'static': '@/static/',                                         
        }
    }
};