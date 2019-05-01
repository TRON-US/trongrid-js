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
            minBlockTimestamp,
            maxBlockTimestamp,
            fingerprint,
            orderBy,
            limit
        } = Object.assign({
            minBlockTimestamp: 0,
            maxBlockTimestamp: 'now',
            eventName: false,
            blockNumber: false,
            limit: 20
        }, options);

        if(!callback)
            return this.injectPromise(this.getEvents, contractAddress, options);

        if(!this.tronWeb.eventServer)
            return callback('No event server configured');

        if(!this.tronWeb.isAddress(contractAddress))
            return callback('Invalid contract address provided');

        if(eventName && !contractAddress)
            return callback('Usage of event name filtering requires a contract address');

        if(!utils.isInteger(minBlockTimestamp))
            return callback('Invalid minBlockTimestamp provided');

        if(!utils.isInteger(maxBlockTimestamp) && maxBlockTimestamp !== 'now')
            return callback('Invalid maxBlockTimestamp provided');
        
        if(!utils.isInteger(limit))
        return callback('Invalid limit provided');

        if(limit > 200) {
            console.warn('Defaulting to maximum accepted limit: 200');
            limit = 200;
        }

        if(blockNumber && !eventName)
            return callback('Usage of block number filtering requires an event name');

        contractAddress = (this.tronWeb.address.fromHex(contractAddress));

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

        if (minBlockTimestamp) {
            qs.minBlockTimestamp = minBlockTimestamp;
        }

        if (fingerprint) {
            qs.fingerprint = fingerprint;
        }

        if (orderBy) {
            qs.orderBy = orderBy;
        }

        if (limit) {
            qs.limit = limit;
        }

        return this.tronWeb.eventServer.request(`v1/contracts/${contractAddress}/events?${querystring.stringify(qs)}`).then(response => {
            if (options.only_data_and_fingerprint) {
                callback(null, response.data, response.meta.fingerprint);
            } else {
                callback(null, response);
            }
        }).catch(err => callback(err));
    }

    async watchEvent(contractAddress, eventName, options = {}, callback = false) {
        let listener = false;
        let lastBlock = false;
        let since = Date.now() - 1000;
        
        const eventWatcher = async () => {
            try {
                
                
                options = Object.assign({
                    eventName,
                    minBlockTimestamp: since,
                    orderBy: 'timestamp,desc',
                    // TODO: 
                    // add filters => eventron is already equipped for them
                    // filters: options.filters
                }, options)
                
                let events = await this.tronGrid.contract.getEvents(contractAddress, options)

                const [latestEvent] = events.sort((a, b) => b.block_timestamp - a.block_timestamp);

                const newEvents = events.filter((event, index) => {
                    const duplicate = events.slice(0, index).some(priorEvent => (
                            JSON.stringify(priorEvent) == JSON.stringify(event)
                        ));
            
                    if (duplicate) return false;
            
                    if (!lastBlock) return true;
            
                    return event.block_timestamp > lastBlock;
                });
                        
                if (latestEvent) lastBlock = latestEvent.block_timestamp;
                return newEvents;

            } catch (ex) {
                return Promise.reject(ex);
            }
        };

        const bindListener = () => {
            if (listener)
                clearInterval(listener);

            listener = setInterval(() => {
                eventWatcher().then(events => events.forEach(event => {
                    callback(null, event)
                })).catch(err => callback(err));
            }, 3000);
        };

        await eventWatcher();
        bindListener();

        return {
            start: bindListener(),
            stop: () => {
                if (!listener)
                    return;

                clearInterval(listener);
                listener = false;
            }
        }
    }

}
