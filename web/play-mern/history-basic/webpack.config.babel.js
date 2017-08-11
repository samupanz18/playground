const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

export default () => (
    {
        entry: './src/App.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].js',
            publicPath: '/',
        },
        module: {
            rules: [
                {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Learn History',
                template: 'src/index.html'
            }),
        ],
        devServer: {
            historyApiFallback: true,
        },
        devtool: 'inline-source-map',
    }
);
