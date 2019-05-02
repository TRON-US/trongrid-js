
export default class APIClient {

    constructor(apiNode) {
        this.apiNode = apiNode;
    }

    _httpClient(method = 'get', ...params) {

        const callback = params[2];

        this.apiNode.request(params[0], params[1], method).then(response => {
            if (params[1].only_data_and_fingerprint) {
                callback(null, response.data, response.meta.fingerprint);
            } else {
                callback(null, response);
            }
        }).catch(err => callback(err));

    }

    get(path, options, callback) {
        return this._httpClient('get', path, options, callback);
    }

    //TODO
    post(...params) {}

    //TODO
    put(...params) {}

    //TODO
    del(...params) {}

}
