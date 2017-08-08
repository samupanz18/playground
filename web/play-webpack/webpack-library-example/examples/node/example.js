const webpackNumbers = require('./webpack-numbers');
const out = () => {
    process.stdout.write(`This is the result for numtoword(1) === ${webpackNumbers.numtoword(1)}\n`);
};

out();
