import Base from './Base';
import querystring from 'querystring';

let utils;

export default class Contract extends Base {

    constructor(tronGrid) {
        super(tronGrid);
        utils = this.utils
    }

    /**
     * @name TG API: /v1//contracts/:contractAddress
     * @param contractAddress
     * @param options(onlyConfirmed, onlyUnconfirmed, eventName, blockNumber, fromTimestamp, size, previousFingerprint, sort)
     * @param callback
     * @returns list of events
     */
    getEvents(contractAddress, options = {}, callback = false) {

        let {
            onlyConfirmed,
            onlyUnconfirmed,
            eventName,
            blockNumber,
            fromTimestamp,
            size,
            previousFingerprint,
            sort
        } = Object.assign({
            fromTimestamp: 0,
            eventName: false,
            blockNumber: false,
            size: 20
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

        routeParams.push(this.tronWeb.address.fromHex(contractAddress));

        const qs = {};

        if (onlyConfirmed) {
            qs.onlyConfirmed = onlyConfirmed;
        }

        if (onlyUnconfirmed && !onlyConfirmed) {
            qs.onlyUnconfirmed = onlyUnconfirmed;
        }

        if (onlyUnconfirmed && !onlyConfirmed)
            qs.onlyUnconfirmed = onlyUnconfirmed;

        if (eventName) {
            qs.eventName = eventName;
        }

        if (blockNumber) {
            qs.blockNumber = blockNumber;
        }

        if (fromTimestamp) {
            qs.fromTimestamp = fromTimestamp;
        }

        if (size) {
            qs.size = size;
        }

        if (previousFingerprint) {
            qs.previousFingerprint = previousFingerprint;
        }

        if (sort) {
            qs.sort = sort;
        }

        return this.tronWeb.eventServer.request(`v1/contracts/${contractAddress}/events?${querystring.stringify(qs)}`).then(response => {
            if (options.only_data_and_fingerprint) {
                callback(null, response.data, response.meta.fingerprint);
            } else {
                callback(null, response);
            }
        }).catch(err => callback(err));
    }

}
