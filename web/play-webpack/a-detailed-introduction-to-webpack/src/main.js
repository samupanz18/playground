import {map} from 'lodash';

const numbers = [1, 2, 3, 4, 5, 6];
const newNumbers = map(numbers, n => n * n);

setTimeout(() => {
    require(['./numberlist.hbs', './newNumberList.hbs'], (template, newTemplate) => {
        document.getElementById('app-container').innerHTML = `${template({numbers})} <br/> ${newTemplate({newNumbers})}`;
    });
}, 2000);
