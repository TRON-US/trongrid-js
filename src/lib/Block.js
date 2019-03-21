import Base from './Base';
const validator = require('../utils/validator');

let utils;

export default class Block extends Base {

    constructor(tronGrid) {
        super(tronGrid);
        utils = this.utils
    }

    /**
     * @name TG API: /v1/blocks/:blockNumber/events
     * @param blockNumber
     * @param callback
     * @returns list of events
     */
    getEvents(blockNumber = 'latest', options = {}, callback = false) {

        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!callback) {
            return this.injectPromise(this.getEvents, blockNumber, options);
        }

        if (!this.tronWeb.eventServer) {
            return callback('No event server configured');
        }

        if (blockNumber !== 'latest' && !validator.isValidBlockNumber(blockNumber)) {
            return callback('Invalid block number provided');
        }

        return this.tronWeb.eventServer.request(`v1/blocks/${blockNumber}/events`).then(response => {
            if (options.only_data_and_fingerprint) {
                callback(null, response.data, response.meta.fingerprint);
            } else {
                callback(null, response);
            }
        }).catch(err => callback(err));
    }

}
