import Account from 'lib/Account';
import Asset from 'lib/Asset';
import Block from 'lib/Block';
import Contract from 'lib/Contract';
import Transaction from 'lib/Transaction';

class TronGrid {

    constructor(tronWeb = false) {
        if (!tronWeb)
            throw new Error('Expected instance of TronWeb');

        this.tronWeb = tronWeb;
        this.utils = tronWeb.utils
        this.account = new Account(this);
        this.asset = new Asset(this);
        this.block = new Block(this);
        this.contract = new Contract(this);
        this.transaction = new Transaction(this);
    }

    pluginInterface() {
        let self = this
        return {
            requires: '^2.2.2',
            components: {
                trx: {
                    getTransactionsToAddress:
                        (address = this.tronWeb.defaultAddress.hex, limit = 30, offset = 0, callback = false) => {
                            // TODO this should read the result and return only the data array
                            return self.account.getTransactions(address, {
                                size: limit
                            }, callback)
                        }
                }
            }
        }

    }
}
