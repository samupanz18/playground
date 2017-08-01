exports.devServer = ({host, port} = {}) => ({
    devServer: {
        historyApiFallback: true,
        stats: 'errors-only',
        host,
        port,
        overlay: {
            errors: true,
            warnings: true,
        },
    },
});

exports.devtool = () => ({
    devtool: 'source-map',
});

exports.lintJavaScript = ({include, exclude, options}) => ({
    module: {
        rules: [{
            test: /\.js$/,
            include,
            exclude,
            enforce: 'pre',
            loader: 'eslint-loader',
            options,
        }],
    },
});

exports.loadCSS = ({include, exclude}) => ({
    module: {
        rules: [{
            test: /\.css$/,
            include,
            exclude,
            use: ['style-loader', 'css-loader'],
        }],
    },
});

exports.transpile = () => ({
    module: {
        rules: [{ 
            test: /\.js$/, 
            exclude: /node_modules/, 
            loader: 'babel-loader',
        }],
    },
});
