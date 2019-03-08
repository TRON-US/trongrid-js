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
    getEvents(blockNumber = 'latest', callback = false) {

        if (!callback) {
            return this.injectPromise(this.getEvents, blockNumber);
        }

        if (!this.tronWeb.eventServer) {
            return callback('No event server configured');
        }

        if (blockNumber !== 'latest' && !validator.isValidBlockNumber(blockNumber)) {
            return callback('Invalid block number provided');
        }

        return this.tronWeb.eventServer.request(`v1/blocks/${blockNumber}/events`).then((res = false) => {
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
