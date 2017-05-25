const path = require('path');

const PATHS = {
    build: path.join(__dirname, 'build'),
};

module.exports = {
    entry: './src',
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    }
};
