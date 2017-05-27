const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const data = require('./data');

const PATHS = {
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build'),
};

module.exports = {
    entry: path.join(PATHS.src, 'router'),
    output: {
        path: PATHS.build,
        filename: 'bundle.js',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [{
            test: /\.js/,
            loader: 'babel-loader',
            include: PATHS.src
        }, {
            test: /\.css/,
            loader: ExtractTextPlugin.extract("css-loader?modules&importLoaers=1&localIdentName=[name]__[local]___[hash:base64:5]"),
            include: PATHS.src
        }]
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
        new StaticSiteGeneratorPlugin('main', data.routes, data)
    ]
};
