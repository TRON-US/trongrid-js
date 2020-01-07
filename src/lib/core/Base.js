import TronGrid from '../../index';
import APIClient from '../apis/APIClient';
import validator from '../../utils/Validator';
import injectpromise from 'injectpromise';

class Base {

    constructor(tronGrid) {
        if (!tronGrid || !(tronGrid instanceof TronGrid))
            throw new Error('Expected instance of TronGrid');

        this.tronGrid = tronGrid;
        this.tronWeb = tronGrid.tronWeb;
        this.injectPromise = injectpromise(this);
        this.apiNode = this.tronWeb.eventServer;
        this.utils = this.tronWeb.utils;
        this.validator = new validator(tronGrid);
        this.APIClient = new APIClient(tronGrid);
    }

}

export default Base
