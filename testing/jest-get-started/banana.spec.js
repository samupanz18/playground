import banana, {mi} from './banana';

jest.mock('./banana');

test('banana', () => {
    console.log(`mi: ${mi}`);

    expect(banana()).toBeUndefined();
});
