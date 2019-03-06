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
        this.account = new Account(this);
        this.asset = new Asset(this);
        this.block = new Block(this);
        this.contract = new Contract(this);
        this.transaction = new Transaction(this);
    }
}
