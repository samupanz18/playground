const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
    {
        entry: {
            app: PATHS.app,        
        },
        output: {
            path: PATHS.build,
            filename: '[name].js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Star Profile',
                template: './app/templates/index.ejs'
            }),
        ],
    },
    parts.lintJavaScript({include: PATHS.app}),
    parts.loadCSS({}),
    parts.transpile(),
]);

const productionConfig = merge([]);
const developmentConfig = merge([
    parts.devtool(),
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
    }),
]);

module.exports = (env) => {
    if (env === 'production') {
        return merge(commonConfig, productionConfig);
    }

    return merge(commonConfig, developmentConfig);
};
