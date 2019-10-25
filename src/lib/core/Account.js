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

        this.validator.validateAddress(address);

        if (address.length !== 34)
            address = this.tronWeb.address.fromHex(address);

        return this.APIClient.get(`v1/accounts/${address}`, options, callback);
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

        this.validator.validateAddress(address);

        if (address.length !== 34)
            address = this.tronWeb.address.fromHex(address);

        return this.APIClient.get(`v1/accounts/${address}/transactions`, options, callback);
    }

    /**
     * @name TG3 API: /v1/accounts/:address/transactions/trc20
     * @param address
     * @param options
     * @param callback
     * @returns list of transactions
     */
    getTrc20Transactions(address, options = {}, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!callback)
            return this.injectPromise(this.getTrc20Transactions, address, options);

        this.validator.validateAddress(address);

        if (address.length !== 34)
            address = this.tronWeb.address.fromHex(address);

        return this.APIClient.get(`v1/accounts/${address}/transactions/trc20`, options, callback);
    }

}
