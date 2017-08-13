const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

export default () => (
    {
        entry: './src/App.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].js',
            publicPath: '/'
        },
        module: {
            rules: [
                {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Learn react-bootstrap modal',
                template: 'src/index.html'                
            }),
        ],
        devServer: {
            contentBase: path.resolve(__dirname, './dist'),
            historyApiFallback: true,
            host: "0.0.0.0",
            port: 3000,
        },
        devtool: 'inline-source-map',
    }
);
