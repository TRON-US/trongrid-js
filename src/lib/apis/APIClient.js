
export default class APIClient {

    constructor(apiNode) {
        this.apiNode = apiNode;
    }

    _httpClient(path, options, callback, method = 'get') {

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
