import TronGrid from '../../index';
import tgClient from '../apis/tgClient';
import validator from '../../utils/validator';

class Base {

    constructor(tronGrid) {
        if (!tronGrid || !(tronGrid instanceof TronGrid))
            throw new Error('Expected instance of TronGrid');

        this.tronGrid = tronGrid;
        this.tronWeb = tronGrid.tronWeb;
        this.injectPromise = this.tronWeb.utils.promiseInjector(this);
        this.apiNode = this.tronWeb.eventServer;
        this.utils = this.tronWeb.utils;
        this.validator = new validator(tronGrid);
        this.tgClient = new tgClient(this.apiNode);
    }

}

export default Base
