const chai = require('chai');
const assert = chai.assert;
const tronGridBuilder = require('./tronGridBuilder');
const TronWeb = require('../setup/TronWeb');
const { NET } = require('./config');

module.exports = {
    chai,
    assert,
    tronGridBuilder,
    TronWeb,
    net: NET
};
