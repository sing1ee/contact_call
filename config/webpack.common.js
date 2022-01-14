const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
module.exports = {
    resolve: {
        alias: {
            crypto: false,
            assert: false,
            http: false,
            https: false,
            url: false,
            os: false,
            stream: false
        }
    },
    entry: {
        index: './src/index.js',
    },
    plugins: [
        // 生成html，自动引入所有bundle
        new HtmlWebpackPlugin({
            title: 'ContractRobot',
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
    module: {
        rules: [{
            test: /\.json$/i,
            type: 'javascript/auto',
            loader: 'json-loader'
        }],
    },
}