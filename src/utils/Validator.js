let tronWeb;
let utils;

export default class Validator {

    constructor(tronGrid) {
        tronWeb = tronGrid.tronWeb;
        utils = tronWeb.utils;
    }

    validatePageData(data) {
        if (!data) {
            throw new Error('Invalid data provided.');
        } else if (typeof data !== 'string' && typeof data !== 'object'){
            throw new Error('Invalid data format provided.');
        } else if (typeof data === 'string' && data.indexOf('fingerprint') === -1) {
            throw new Error('It\'s the last page or missed fingerprint in the links.');
        } else if (typeof data === 'object' && (!data.meta || !data.meta.fingerprint)) {
            throw new Error('It\'s the last page or missed fingerprint in the json.');
        }
    }

    validateAddress(address) {
        if (!tronWeb.isAddress(address))
            throw new Error('Invalid address provided.');
    }

    validateAssetIdentifier(identifier) {
        if (!identifier || /[^a-zA-Z0-9_]+/.test(identifier))
            throw new Error('Invalid identifier provided.');
    }

    validateBlockNumber(blockNumber) {
        if (blockNumber === 'latest') {
            return;
        }
        if (!blockNumber || /[^0-9]/.test(blockNumber.toString())) {
            throw new Error('Invalid block number provided.');
        }
    }

    validateTransactionId(transactionID) {
        if (!/^[a-z0-9]{64}/.test(transactionID)) {
            throw new Error('Invalid transaction id provided.');
        }
    }

    validateOptions(options) {
        if (options.limit) {
            if (!utils.isInteger(options.limit) || options.limit < 0 || options.limit > 200) {
                throw new Error('Limit should be a number between 0 and 200.');
            }
        }
        if (options.blockNumber && !options.eventName) {
            throw new Error('Usage of block number filtering requires an event name.');
        }
        if (options.minBlockTimestamp && !utils.isInteger(options.minBlockTimestamp)) {
            throw new Error('Invalid minBlockTimestamp provided.');
        }
        if (options.maxBlockTimestamp && (!utils.isInteger(options.maxBlockTimestamp) && options.maxBlockTimestamp !== 'now')) {
            throw new Error('Invalid maxBlockTimestamp provided.');
        }
    }

};
