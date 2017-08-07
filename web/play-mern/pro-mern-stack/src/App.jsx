const contentNode = document.getElementById('contents');
const continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
const message = continents.map(c => `Hello ${c}!`).join('<br/>');
var component = <h1 dangerouslySetInnerHTML={{__html: message}} />;
ReactDOM.render(component, contentNode);
