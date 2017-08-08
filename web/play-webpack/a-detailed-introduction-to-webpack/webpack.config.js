const HtmlWebpackPlugin = require('html-webpack-plugin');
const HelloWorldPlugin = require('./src/HelloWorldPlugin');
const FileListPlugin = require('./src/FileListPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

var path = require('path');

module.exports = {
    entry: {
        vendor: ['babel-polyfill', 'lodash'],
        main: './src/main.js'
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/, 
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Intro to webpack',
            template: 'src/index.html'
        }),
        new HelloWorldPlugin({options: true}),
        new FileListPlugin({options: true}),
        new CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.bundle.js"
        })
    ]
};
