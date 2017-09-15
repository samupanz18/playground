import Promise from 'bluebird';

let v = 'a';

console.log(`v = ${v}`);

const foo = () => {
    Promise.resolve(null)
        .then(() => {
            v = 'b';

            console.log(`v = ${v}`);
        });

    console.log(`v = ${v}`);
}

const bar = () => {
    console.log(`v = ${v}`);
}

foo();
bar();
console.log(`v = ${v}`);
