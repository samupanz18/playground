const path = require('path');

export default () => (
    {
        entry: './index.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'webpack-numbers.js',
            libraryTarget: 'umd',
            library: 'webpackNumbers'
        },
        externals: {
            'lodash': {
                commonjs: 'lodash',
                commonjs2: 'lodash',
                amd: 'lodash',
                root: '_'
            }
        },
        module: {
            rules: [
                {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
            ]
        },
    }
);
