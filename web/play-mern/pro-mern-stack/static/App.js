'use strict';

var contentNode = document.getElementById('contents');
var continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
var message = continents.map(function (c) {
  return 'Hello ' + c + '!';
}).join('<br/>');
var component = React.createElement('h1', { dangerouslySetInnerHTML: { __html: message } });
ReactDOM.render(component, contentNode);