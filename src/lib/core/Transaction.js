import Base from './Base';

let utils;

export default class Transaction extends Base {

    constructor(tronGrid) {
        super(tronGrid);
        utils = this.utils;
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

        this.validator.validateTransactionId(transactionID);

        return this.APIClient.get(`v1/transactions/${transactionID}/events`, options, callback);
    }

}
