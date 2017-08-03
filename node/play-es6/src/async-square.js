import Promise from 'bluebird';

const square = (n) => {
    return Promise.fromCallback(callback => {
        setTimeout(() => {
            callback(null, n * n);
        }, 2000);
    });
};

export default square;
