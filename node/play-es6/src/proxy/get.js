const handler = {
    get (target, key) {
        console.info(`Get on property '${key}'`);

        return target[key];
    }
};

const target = {};
const proxy = new Proxy(target, handler);
proxy.a = 'b';
proxy.a;
proxy.b;
