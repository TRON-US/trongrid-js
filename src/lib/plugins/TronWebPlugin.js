import Base from '../core/Base';

let utils;
let account;

export default class TronWebPlugin extends Base {

    constructor(tronGrid) {
        super(tronGrid);
        utils = this.utils;
        account = this.tronGrid.account;
    }

    setExperimental(experimental) {
        this.tronGrid.setExperimental(experimental);
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
            only_data_and_fingerprint: true
        }
        if (direction === 'to') {
            options.only_to = true
        } else if (direction === 'from') {
            options.only_from = true
        }
        return account.getTransactions(address, options, callback)
    }

}
