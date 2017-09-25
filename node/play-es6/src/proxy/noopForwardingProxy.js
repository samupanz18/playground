const target = {};
const handler = {};
const proxy = new Proxy(target, handler);
proxy.a = 'b';
console.log(target.a);
console.log(proxy.c === undefined);
