let utils;

import Account from 'lib/Account';
import Asset from 'lib/Asset'

class TronGrid {

    constructor(tronWeb = false) {
        if (!tronWeb)
            throw new Error('Expected instance of TronWeb');

        this.tronWeb = tronWeb;
        this.account = new Account(this);
        this.asset = new Asset(this);
    }
}
