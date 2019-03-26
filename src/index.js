import Account from 'lib/Account';
import Asset from 'lib/Asset';
import Block from 'lib/Block';
import Contract from 'lib/Contract';
import Transaction from 'lib/Transaction';

let utils;
let experimental;
let self;

export default class TronGrid {

    constructor(tronWeb = false) {
        if (!tronWeb)
            throw new Error('Expected instance of TronWeb');

        this.tronWeb = tronWeb;
        this.utils = utils = tronWeb.utils
        this.account = new Account(this);
        this.asset = new Asset(this);
        this.block = new Block(this);
        this.contract = new Contract(this);
        this.transaction = new Transaction(this);

        this.experimental = undefined;
    }

    async getTransactions(address = this.tronWeb.defaultAddress.hex, direction = 'all', limit = 20, offset = 0, callback = false) {

        if (utils.isFunction(offset)) {
            callback = offset;
        }

        if (utils.isFunction(limit)) {
            callback = limit;
            limit = 20;
        }

        if (utils.isFunction(direction)) {
            callback = direction;
            direction = 'all';
        }

        if (utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;
        }

        const options = {
            limit,
            experimental,
            only_data_and_fingerprint: true
        }
        if (direction === 'to') {
            options.only_to = true
        } else if (direction === 'from') {
            options.only_from = true
        }
        return self.account.getTransactions(address, options, callback)
    }

    pluginInterface(options) {
        self = this;
        if (options.experimental) {
            experimental = options.experimental
        }
        return {
            requires: '^2.2.4',
            components: {
                trx: {
                    getTransactionsRelated: this.getTransactions
                }
            }
        }

    }
}
