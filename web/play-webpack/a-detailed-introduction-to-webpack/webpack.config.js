const HtmlWebpackPlugin = require('html-webpack-plugin');

var path = require('path');

module.exports = {
    entry: ['babel-polyfill', './src/main.js'],
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
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
        })
    ]
};
