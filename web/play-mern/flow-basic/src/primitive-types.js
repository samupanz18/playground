// @flow

function acceptsBoolean(value: boolean) {}

acceptsBoolean(true);
acceptsBoolean(false);
acceptsBoolean(!!'foo');
acceptsBoolean(Boolean('foo'));
acceptsBoolean(Boolean(true));

function acceptsNumber(value: number) {}

acceptsNumber(42);
acceptsNumber(3.14);
acceptsNumber(NaN);
acceptsNumber(Infinity);
acceptsNumber('foo');
