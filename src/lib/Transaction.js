import Base from './Base';
const validator = require('../utils/validator');

let utils;

export default class Transaction extends Base {

    constructor(tronGrid) {
        super(tronGrid);
        utils = this.utils
    }

    /**
     * @name TG API: /transaction/:id
     * @param transactionID
     * @param callback
     * @returns list of events
     */
    getEvents(transactionID = false, options = {}, callback = false) {

        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!callback) {
            return this.injectPromise(this.getEvents, transactionID, options);
        }

        if (!this.tronWeb.eventServer) {
            return callback('No event server configured');
        }

        if (!validator.isValidTransactionId(transactionID)) {
            return callback('Invalid transaction id provided');
        }

        return this.tronWeb.eventServer.request(`v1/transactions/${transactionID}/events`).then(response => {
            if (options.only_data_and_fingerprint) {
                callback(null, response.data, response.meta.fingerprint);
            } else {
                callback(null, response);
            }
        }).catch(err => callback(err));
    }

}
