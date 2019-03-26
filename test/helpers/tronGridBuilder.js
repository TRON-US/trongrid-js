const TronWeb = require('tronweb');
const TronGrid = require('../setup/TronGrid');
const {SHASTA, LOCAL} = require('./config');

const createInstance = net => {
    let node;
    switch (net) {
        case 'shasta':
            node = SHASTA;
            break;
        case 'local':
            node = LOCAL;
            break;
        default:
            throw new Error('has to choose net in config.js');
    }
    ;

    let tronWeb = new TronWeb({
        fullHost: node.HOST,
        privateKey: node.PRIVATE_KEY
    });
    return new TronGrid(tronWeb);
}

let instance

const getInstance = net => {
    if (!instance) {
        instance = createInstance(net);
    }
    return instance;
};

module.exports = {
    createInstance,
    getInstance,
    TronGrid
};

