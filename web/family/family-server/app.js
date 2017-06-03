const express = require('express');
const app = express();

const starProfiles = [{
    id: 1,
    name: 'Leonardo DiCaprio'
}, {
    id: 2,
    name: 'Tom Cruise'
}, {
    id: 3,
    name: 'Kate Winslet'
}, {
    id: 4,
    name: 'Nicole Kidman'
}];

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
    res.end('Hello, I\'m Star Profile Server!');
});

app.get('/list', (req, res) => {
    res.send(JSON.stringify(starProfiles));
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
