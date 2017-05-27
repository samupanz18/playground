var componentReqs = ['A', 'B', 'C'];

for (var i = 0; i < componentReqs.length; ++i) {
    var componentReq = componentReqs[i];
    var component = require('./components/' + component);
    component.render();
}



