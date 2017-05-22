var swig = require('swig');

// var html = swig.renderFile('./template.html', {
//     pagename: 'awesome people',
//     authors: ['Paul', 'Jim', 'Jane'],
//     myStuff: () => {
//         return '<p>Things!</p>'
//     },
//     seq: [1, 2, 3, 4, 5]
// });

// console.log(html);

var template = swig.compileFile('./index.swig');
var html = template();
console.log(html);