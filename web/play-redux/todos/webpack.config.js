const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const PATHS = {
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
    {
        entry: {
            app: PATHS.src,        
        },
        output: {
            path: PATHS.build,
            filename: '[name].js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Todos',
                template: path.join(PATHS.src, 'templates/index.ejs'),
            }),
        ],
    },
    parts.lintJavaScript({include: PATHS.src}),
    parts.loadCSS({}),
    parts.transpile(),
]);

const productionConfig = merge([]);
const developmentConfig = merge([
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    parts.devtool(),
]);

module.exports = (env) => {
    if (env === 'production') {
        return merge(commonConfig, productionConfig);
    }

    return merge(commonConfig, developmentConfig);
};
