import {map} from 'lodash';
import template from './numberlist.hbs';

let numbers = map([1, 2, 3, 4, 5, 6, 7], n => n * n);

// console.log(template({numbers}));

document.getElementById('app-container').innerHTML = template({numbers});
