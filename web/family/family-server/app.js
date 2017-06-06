const express = require('express');
const app = express();

const members = [{
    id: 1,
    name: 'Samuel Gong'
}, {
    id: 2,
    name: 'Helen Chen'
}, {
    id: 3,
    name: 'Edwin Gong'
}];

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
    res.end('Hello, I\'m Family Server!');
});

app.get('/listMembers', (req, res) => {
    res.send(JSON.stringify(members));
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
