
export default class TgClient {

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

    get(...params) {
        return this._httpClient(params[0], params[1], params[2], 'get');
    }

    //TODO
    post(...params) {}

    //TODO
    put(...params) {}

    //TODO
    del(...params) {}

}
