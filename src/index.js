var utils

import Accounts from './lib/Account';

class TronGrid {

    constructor(tronWeb = false) {
        if (!tronWeb)
            throw new Error('Expected instance of TronWeb');

        this.tronWeb = tronWeb;
        this.accounts = new Accounts(this);

        this.injectPromise = tronWeb.utils.promiseInjector(this);
        this.apiNode = tronWeb.eventServer;
        utils = tronWeb.utils
    }

    /**
     * TODO Multiple User-Face Methods
     */


    /**
     * TG API: /v1/accounts/:address
     * @param address (hex or base58 format)
     * @param options (filters: Show_assets, only_confirmed, only_unconfirmed)
     * @param callback
     * @returns account
     */
    getAccountByAddress(address = this.tronWeb.defaultAddress, options = {}, callback = false) {
        if (utils.isString(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress;
        }

        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!callback)
            return this.injectPromise(this.getAccountByAddress, address, options);

        if (!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        this.apiNode.request(`v1/accounts/${address}`, options, 'get').then(account => {
            callback(null, account);
        }).catch(err => callback(err));
    }


    /**
     * TG API: /v1/assets/:identifier
     * @param identifier (asset ID, its name, or issuer address)
     * @param options (is_name, limit, fingerprint, sort, filter)
     * @param callback
     * @returns list of assets
     */
    getAssetsByIdentifier(identifier = false, options = {}, callback = false) {
        if (utils.isString(identifier)) {
            callback = identifier;
        }

        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!callback)
            return this.injectPromise(this.getAssetsByIdentifier, identifier, options);

        this.apiNode.request(`v1/assets/${identifier}`, options, 'get').then(({assetIssue = []}) => {
            callback(null, assetIssue.map(token => this.tronWeb.trx.parseToken(token)))
        }).catch(err => callback(err))
    }


    /**
     * TG3 API: /v1/accounts/:address/transactions
     * @param address
     * @param options
     * @param callback
     * @returns list of transactions
     */
    getTransactionsByAccountAddress(address = this.tronWeb.defaultAddress, options = {}, callback = false) {
        if (utils.isString(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress;
        }

        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!callback)
            return this.injectPromise(this.getTransactionsByAccountAddress, address, options);

        if (!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        this.apiNode.request(`v1/accounts/${address}/transactions`, {
            options
        }, 'get').then(({transaction}) => {
            callback(null, transaction);
        }).catch(err => callback(err));
    }
}
