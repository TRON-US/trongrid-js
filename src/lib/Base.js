import utils from "./../utils/index";

class Base {

    constructor(tronGrid) {
        if (!tronGrid)
            throw new Error('Expected instance of TronGrid');

        this.tronWeb = tronGrid.tronWeb;
        this.injectPromise = this.tronWeb.utils.promiseInjector(this);
        this.apiNode = this.tronWeb.eventServer;
        this.utils = utils;
        this.tronWebUtils = this.tronWeb.utils;
    }

}

export default Base
