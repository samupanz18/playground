const {spawn} = require('child_process');

// const child = spawn('pwd');

// child.on('exit', function(code, signal) {
//     console.log('child process exited with', `code ${code} and signal ${signal}`)
// });

// child.stdout.on('data', data => {
//     console.log(`child stdout: \n ${data}`);
// });

const child = spawn('find . -type f', {
    stdio: 'inherit',
    // shell: true
});
