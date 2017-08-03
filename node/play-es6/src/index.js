import 'babel-polyfill';
import square from '~/async-square';

const runSquare = async (n) => {
    const v = await square(n);

    console.log(`The square of ${n} calculated by the server is: ${v}`);
}

runSquare(8);
