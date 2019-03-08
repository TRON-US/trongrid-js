import Base from './Base';
import querystring from 'querystring';

let utils;

export default class Contract extends Base {

    constructor(tronGrid) {
        super(tronGrid);
        utils = this.utils
    }

    /**
     * @name TG API: /contract/:contractAddress/:eventName/:blockNumber
     * @param contractAddress
     * @param options(fromTimestamp, eventName, blockNumber, size, sort, onlyConfirmed, onlyUnconfirmed, previousFingerprint, rawResponse)
     * @param callback
     * @returns list of events
     */
    getEvents(contractAddress = false, options = {}, callback = false) {

        let {
            fromTimestamp,
            eventName,
            blockNumber,
            size,
            sort,
            onlyConfirmed,
            onlyUnconfirmed,
            previousFingerprint,
            rawResponse
        } = Object.assign({
            fromTimestamp: 0,
            eventName: false,
            blockNumber: false,
            size: 20,
            sort: '-block_timestamp'
        }, options);

        if(!callback)
            return this.injectPromise(this.getEvents, contractAddress, options);

        if(!this.tronWeb.eventServer)
            return callback('No event server configured');

        const routeParams = [];

        if(!this.tronWeb.isAddress(contractAddress))
            return callback('Invalid contract address provided');

        if(eventName && !contractAddress)
            return callback('Usage of event name filtering requires a contract address');

        if(!utils.isInteger(fromTimestamp))
            return callback('Invalid sinceTimestamp provided');

        if(!utils.isInteger(size))
            return callback('Invalid size provided');

        if(size > 200) {
            console.warn('Defaulting to maximum accepted size: 200');
            size = 200;
        }

        if(blockNumber && !eventName)
            return callback('Usage of block number filtering requires an event name');

        if(contractAddress)
            routeParams.push(this.tronWeb.address.fromHex(contractAddress));

        if(eventName)
            routeParams.push(eventName);

        if(blockNumber)
            routeParams.push(blockNumber);

        const qs = {
            fromTimestamp,
            size,
            sort: sort
        }

        if(onlyConfirmed)
            qs.onlyConfirmed = onlyConfirmed

        if(onlyUnconfirmed && !onlyConfirmed)
            qs.onlyUnconfirmed = onlyUnconfirmed

        if (previousFingerprint)
            qs.previousFingerprint = previousFingerprint

        return this.tronWeb.eventServer.request(`v1/contracts/${routeParams.join('/')}?${querystring.stringify(qs)}/events`).then((data = false) => {
            if(!data)
                return callback('Unknown error occurred');

            // if(!utils.isArray(data))
            //     return callback(data);

            return callback(null,
                rawResponse === true ? data : data.map(event => utils.mapEvent(event))
            );
        }).catch(err => callback((err.response && err.response.data) || err));
    }

}
