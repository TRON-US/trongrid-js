import Account from 'lib/Account';
import Asset from 'lib/Asset';
import Block from 'lib/Block';
import Contract from 'lib/Contract';
import Transaction from 'lib/Transaction';
import TronWebPlugin from 'lib/TronWebPlugin';

let utils;
let experimental;

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

    setExperimental(code) {
        this.experimental = code;
    }

    pluginInterface(options) {
        if (options.experimental) {
            experimental = options.experimental
        }
        const tronWebPlugin = new TronWebPlugin(this);
        tronWebPlugin.setExperimental(options.experimental);
        return {
            requires: '^2.2.4',
            components: {
                trx: {
                    getTransactionsRelated: tronWebPlugin.getTransactions
                }
            }
        }

    }
}
