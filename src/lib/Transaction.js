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
    getEvents(transactionID = false, callback = false) {

        if (!callback) {
            return this.injectPromise(this.getEvents, transactionID);
        }

        if (!this.tronWeb.eventServer) {
            return callback('No event server configured');
        }

        if (!validator.isValidTransactionId(transactionID)) {
            return callback('Invalid transaction id provided');
        }

        return this.tronWeb.eventServer.request(`v1/transactions/${transactionID}/events`).then((res = false) => {
            let data = res.data;
            if(!data)
                return callback('Unknown error occurred');

            if(!utils.isArray(data))
                return callback(data);

            return callback(null,
                data.map(event => utils.mapEvent(event))
            );
        }).catch(err => callback((err.response && err.response.data) || err));
    }

}
