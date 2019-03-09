const chai = require('chai');
const assert = chai.assert;
const tronGridBuilder = require('./tronGridBuilder');
const { NET } = require('./config');

module.exports = {
    chai,
    assert,
    tronGridBuilder,
    net: NET
};
