var Promise = require('bluebird');
var fs = require('fs');

try {
    fs.readFile('./index2.js', function(err, buffer) {
        if (err) {
            throw err;
        }
        
        console.log('fs.readFile: ' + buffer.toString());
    });
} catch (e) {
    console.log(`The error: ${error}`);
}

//  var promisifiedRead = Promise.promisify(fs.readFile);
//  promisifiedRead('./index.js')
//     .then(function(buffer) {
//         console.log('promisified readFile: ' + buffer.toString());
//     });
