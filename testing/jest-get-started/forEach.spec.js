import forEach from './forEach';

test('forEach', () => {
    const mockCb = jest.fn();
    forEach([0, 1], mockCb);

    expect(mockCb.mock.calls.length).toBe(2);

    expect(mockCb.mock.calls[0][0]).toBe(0);

    expect(mockCb.mock.calls[1][0]).toBe(1);
});

