import Base from './Base';

let tronWebUtils;

export default class Transaction extends Base {

    constructor(tronGrid) {
        super(tronGrid);
        tronWebUtils = this.tronWebUtils
    }

    /**
     * @name TG API: /transaction/:id
     * @param transactionID
     * @param callback
     * @returns list of events
     */
    getEvents(transactionID = false, callback = false) {

        if(!callback)
            return this.injectPromise(this.getEvents, transactionID);

        if(!this.tronWeb.eventServer)
            return callback('No event server configured');

        return this.tronWeb.eventServer.request(`event/transaction/${transactionID}`).then((data = false) => {
            if(!data)
                return callback('Unknown error occurred');

            if(!tronWebUtils.isArray(data))
                return callback(data);

            return callback(null,
                data.map(event => tronWebUtils.mapEvent(event))
            );
        }).catch(err => callback((err.response && err.response.data) || err));
    }

}
