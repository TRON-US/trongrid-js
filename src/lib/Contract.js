import Base from './Base';
import querystring from 'querystring';

let tronWebUtils;

export default class Contract extends Base {

    constructor(tronGrid) {
        super(tronGrid);
        tronWebUtils = this.tronWebUtils
    }

    /**
     * @name TG API: /contract/:contractAddress/:eventName/:blockNumber
     * @param contractAddress
     * @param options(since, eventName, blockNumber, size, sort, onlyConfirmed, onlyUnconfirmed, previousFingerprint, rawResponse)
     * @param callback
     * @returns list of events
     */
    getEvents(...params) {

        if (typeof params[1] !== 'object') {
            params[1] = {
                since: params[1] || 0,
                eventName: params[2] || false,
                blockNumber: params[3] || false,
                size: params[4] || 20,
                sort: params[5] || '-block_timestamp'
            }
            params.splice(2, 4)

            // callback:
            if (!tronWebUtils.isFunction(params[2])) {
                if (tronWebUtils.isFunction(params[1].size)) {
                    params[2] = params[1].size;
                    params[1].size = 20;
                }
            }
        }

        return this._getEvents(...params);
    }

    _getEvents(contractAddress = false, options = {}, callback = false) {

        let {
            since,
            eventName,
            blockNumber,
            size,
            sort,
            onlyConfirmed,
            onlyUnconfirmed,
            previousFingerprint,
            rawResponse
        } = Object.assign({
            since: 0,
            eventName: false,
            blockNumber: false,
            size: 20,
            sort: '-block_timestamp'
        }, options)

        if(!callback)
            return this.injectPromise(this.getEvents, contractAddress, options);

        if(!this.tronWeb.eventServer)
            return callback('No event server configured');

        const routeParams = [];

        if(!this.tronWeb.isAddress(contractAddress))
            return callback('Invalid contract address provided');

        if(eventName && !contractAddress)
            return callback('Usage of event name filtering requires a contract address');

        if(!tronWebUtils.isInteger(since))
            return callback('Invalid sinceTimestamp provided');

        if(!tronWebUtils.isInteger(size))
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
            since: since,
            size,
            sort: sort
        }

        if(onlyConfirmed)
            qs.onlyConfirmed = onlyConfirmed

        if(onlyUnconfirmed && !onlyConfirmed)
            qs.onlyUnconfirmed = onlyUnconfirmed

        if (previousFingerprint)
            qs.previousFingerprint = previousFingerprint

        return this.tronWeb.eventServer.request(`event/contract/${routeParams.join('/')}?${querystring.stringify(qs)}`).then((data = false) => {
            if(!data)
                return callback('Unknown error occurred');

            if(!tronWebUtils.isArray(data))
                return callback(data);

            return callback(null,
                rawResponse === true ? data : data.map(event => tronWebUtils.mapEvent(event))
            );
        }).catch(err => callback((err.response && err.response.data) || err));
    }

}
