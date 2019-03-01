import Base from './Base';

let utils;
let tronWebUtils;

export default class Account extends Base {

    constructor(tronGrid) {
        super(tronGrid);
        utils = this.utils;
        tronWebUtils = this.tronWebUtils
    }

    /**
     * TG API: /v1/accounts/:address
     * @param address (hex or base58 format)
     * @param options (filters: Show_assets, only_confirmed, only_unconfirmed)
     * @param callback
     * @returns account
     */
    get(address = this.tronWeb.defaultAddress, options = {}, callback = false) {

        if (tronWebUtils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (tronWebUtils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress;
            options = {};
        }

        if (!callback)
            return this.injectPromise(this.get, address, options);

        if (!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        options = utils.validateOptions('get', options);

        if (address.length !== 34)
            address = this.tronWeb.address.fromHex(address);

        this.apiNode.request(`v1/accounts/${address}`, options, 'get').then(account => {
            callback(null, account);
        }).catch(err => callback(err));
    }

    /**
     * TG3 API: /v1/accounts/:address/transactions
     * @param address
     * @param options
     * @param callback
     * @returns list of transactions
     */
    getTransactions(address = this.tronWeb.defaultAddress, options = {}, callback = false) {
        if (tronWebUtils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (tronWebUtils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress;
            options = {};
        }

        if (!callback)
            return this.injectPromise(this.getTransactions, address, options);

        // TODO validate the options

        if (!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        if (address.length !== 34)
            address = this.tronWeb.address.fromHex(address);

        this.apiNode.request(`v1/accounts/${address}/transactions`, {
            options
        }, 'get').then(transaction => {
            callback(null, transaction);
        }).catch(err => callback(err));
    }

}
