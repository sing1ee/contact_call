const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { resolveApp } = require('./paths');

module.exports = merge(common, {
    devServer: {
        static: false,
        port: '8088', // 设置端口号为8088
        historyApiFallback: true //不跳转
    },
    output: {
        // bundle 文件名称
        filename: '[name].bundle.js',

        // bundle 文件路径
        path: resolveApp('dist'),

        // 编译前清除目录
        clean: true
    },
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
})