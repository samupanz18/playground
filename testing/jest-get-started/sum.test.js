// const sum = require('./sum');
import sum from './sum';

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
});

test('object assignment', () => {
    const data = {
        one: 1,
    };

    data['two'] = 2;
    expect(data).toEqual({
        one: 1,
        two: 2,
    });
});

const fetchData = () => Promise.reject('error');

test('the fetch fails with an error', async () => {
    expect.assertions(1);
    // return fetchData().catch(e => {
    //     expect(e).toMatch('error');
    //     expect(e.length).toEqual(5);
    // });

    // try {
    //     await fetchData();
    // } catch (e) {
    //     expect(e).toMatch('error');
    // }

    await expect(fetchData()).rejects.toMatch('error');
});
