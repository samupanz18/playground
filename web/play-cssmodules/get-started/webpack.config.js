const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build'),
};

module.exports = {
    entry: PATHS.src,
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
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
        new ExtractTextPlugin("styles.css")
    ]
};
