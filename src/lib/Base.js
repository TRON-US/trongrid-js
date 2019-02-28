class Base {

    constructor(tronGrid) {
        if (!tronGrid)
            throw new Error('Expected instance of TronWeb');

        this.tronWeb = tronGrid.tronWeb;
        this.injectPromise = this.tronWeb.utils.promiseInjector(this);
        this.apiNode = this.tronWeb.eventServer;
        this.utils = this.tronWeb.utils;
    }

}

export default Base
