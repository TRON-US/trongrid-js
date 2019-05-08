
export default class APIClient {

    constructor(tronGrid) {
        this.tronGrid = tronGrid;
        this.apiNode = tronGrid.tronWeb.eventServer;
        this.authWhitelist = [
            'v1/accounts',
            'v1/assets',
            'v1/blocks',
            'v1/contracts',
            'v1/transactions'
        ];
        this.authBlacklist = [];
    }

    _httpClient(path, options, callback, method = 'get') {

        const pathPrefix = path.slice(0, path.indexOf('/', 3));
        if (this.tronGrid.experimental) {
            options.experimental = this.tronGrid.experimental;
        } else if (this.authWhitelist.indexOf(pathPrefix) === -1) {
            throw new Error('This API requires an experimental code.');
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
