
export default class APIClient {

    constructor(tronGrid) {
        this.tronGrid = tronGrid;
        this.apiNode = tronGrid.tronWeb.eventServer;
    }

    _httpClient(path, options, callback, method = 'get') {

        if (!options.experimental && this.tronGrid.experimental) {
            options.experimental = this.tronGrid.experimental;
        }

        this.apiNode.request(path, options, method).then(response => {
            if (options.only_data_and_fingerprint) {
                callback(null, response.data, response.meta.fingerprint);
            } else {
                callback(null, response);
            }
        }).catch(err => callback(err));

    }

    get(path, options, callback) {
        return this._httpClient(path, options, callback, 'get');
    }

    //TODO
    post(...params) {}

    //TODO
    put(...params) {}

    //TODO
    del(...params) {}

}
