'use strict';

require('babel-register');
require('babel-polyfill');

const chai = require('chai');

global.expect = chai.expect;

const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

enzyme.configure({
    adapter: new Adapter()
});
