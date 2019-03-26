import Base from './Base';

let utils;

export default class Account extends Base {

    constructor(tronGrid) {
        super(tronGrid);
        utils = this.utils;
    }

    /**
     * @name TG API: /v1/accounts/:address
     * @param address (hex or base58 format)
     * @param options (filters: only_confirmed)
     * @param callback
     * @returns account
     */
    get(address, options = {}, callback = false) {

        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!callback)
            return this.injectPromise(this.get, address, options);

        if (!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        if (this.tronGrid.experimental)
            options.experimental = this.tronGrid.experimental;

        if (address.length !== 34)
            address = this.tronWeb.address.fromHex(address);

        console.log(`v1/accounts/${address}`, options)

        this.apiNode.request(`v1/accounts/${address}`, options, 'get').then(response => {
            if (options.only_data_and_fingerprint) {
                callback(null, response.data, response.meta.fingerprint);
            } else {
                callback(null, response);
            }
        }).catch(err => callback(err));
    }

    /**
     * @name TG3 API: /v1/accounts/:address/transactions
     * @param address
     * @param options
     * @param callback
     * @returns list of transactions
     */
    getTransactions(address, options = {}, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!callback)
            return this.injectPromise(this.getTransactions, address, options);

        if (!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        if (this.tronGrid.experimental)
            options.experimental = this.tronGrid.experimental;

        if (address.length !== 34)
            address = this.tronWeb.address.fromHex(address);

        this.apiNode.request(`v1/accounts/${address}/transactions`, options, 'get').then(response => {
            if (options.only_data_and_fingerprint) {
                callback(null, response.data, response.meta.fingerprint);
            } else {
                callback(null, response);
            }
        }).catch(err => callback(err));
    }

}
