import Base from './Base';

let utils;

export default class Block extends Base {

    constructor(tronGrid) {
        super(tronGrid);
        utils = this.utils;
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

        this.validator.validateBlockNumber(blockNumber);

        return this.APIClient.get(`v1/blocks/${blockNumber}/events`, options, callback);

    }

}
