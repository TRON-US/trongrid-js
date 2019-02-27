import utils from 'utils';

export default class Trx {
    constructor(trongrid = false) {
        if (!trongrid)
            throw new Error('Expected instance of TronGrid');

        this.trongrid = trongrid;
        this.tronWeb = trongrid.tronweb;
        this.defaultAddress = trongrid.defaultAddress;
        this.injectPromise = utils.promiseInjector(this);
    }

    getAccountByAddress(address = false, options = {}, callback = false) {
        if (utils.isFunction(address)) {
            callback = address;
            address = this.defaultAddress;
        }

        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!callback)
            return this.injectPromise(this.getAccountByAddress, address, options);

        if (!this.trongrid.isAddress(address))
            return callback('Invalid address provided');

        address = this.trongrid.address.toHex(address);

        if (!(typeof options.Show_assets === 'boolean')) options.Show_assets = false;
        if (!(typeof options.only_confirmed === 'boolean')) options.only_confirmed = false;
        if (!(typeof options.only_unconfirmed === 'boolean')) options.only_unconfirmed = false;

        const url = `${this.trongrid.apiVersion}
        /accounts/${address}?filter=Show_assets:${options.Show_assets},only_confirmed:${options.only_confirmed}
        ,only_unconfirmed:${options.only_unconfirmed}`;

        this.tronWeb.fullNode.request(url, 'get').then(account => {
            callback(null, account);
        }).catch(err => callback(err));
    }
};
