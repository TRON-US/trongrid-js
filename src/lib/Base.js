import TronGrid from '..';

class Base {

    constructor(tronGrid) {
        if (!tronGrid || !(tronGrid instanceof TronGrid))
            throw new Error('Expected instance of TronGrid');

        this.tronGrid = tronGrid;
        this.tronWeb = tronGrid.tronWeb;
        this.injectPromise = this.tronWeb.utils.promiseInjector(this);
        this.apiNode = this.tronWeb.eventServer;
        this.utils = this.tronWeb.utils;
    }

}

export default Base
