const TronWeb = require('tronweb');
const TronGrid = require('../setup/TronGrid');
const { MAIN, SHASTA } = require('./config');

const createInstance = net => {
    let node;
    switch (net) {
        case 'main':
            node = MAIN;
            break;
        case 'shasta':
            node = SHASTA;
            break;
        default:
            throw new Error('has to choose net in config.js');
    };

    let tronWeb = new TronWeb(
        node.FULL_NODE_API,
        node.SOLIDITY_NODE_API,
        node.EVENT_API,
        node.PRIVATE_KEY
    );
    return new TronGrid(tronWeb);
}

let instance

const getInstance = net => {
    if(!instance) {
        instance = createInstance(net);
    }
    return instance;
};

module.exports = {
    createInstance,
    getInstance,
    TronGrid
};

