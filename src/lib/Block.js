import Base from './Base';

let tronWebUtils;

export default class Block extends Base {

    constructor(tronGrid) {
        super(tronGrid);
        tronWebUtils = this.tronWebUtils
    }

    /**
     * TG API: /events/blockevent/:blockNumber
     * @param blockNumber
     * @param callback
     * @returns list of events
     */
    getEvents(blockNumber = '', callback = false) {

        if(!callback)
            return this.injectPromise(this.getEvents, blockNumber);

        if(!this.tronWeb.eventServer)
            return callback('No event server configured');

        return this.tronWeb.eventServer.request(`events/blockevent/${blockNumber}`).then((data = false) => {
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
