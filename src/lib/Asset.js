import Base from './Base';

let utils;

export default class Asset extends Base {

    constructor(tronGrid) {
        super(tronGrid);
        utils = this.utils;
    }

    /**
     * @name TG API: /v1/assets/:identifier
     * @param identifier (asset ID, or issuer address)
     * @param callback
     * @returns list of assets
     */
    get(identifier = false, options = {}, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!identifier || !(utils.isString(identifier) || utils.isInteger(identifier)))
            return callback('Invalid identifier provided');

        if (!callback)
            return this.injectPromise(this.get, identifier, options);

        if (this.tronGrid.experimental)
            options.experimental = this.tronGrid.experimental;

        this.apiNode.request(`v1/assets/${identifier}`, options, 'get').then(response => {
            if (options.only_data_and_fingerprint) {
                callback(null, response.data, response.meta.fingerprint);
            } else {
                callback(null, response);
            }
        }).catch(err => callback(err));
    }

    /**
     * @name TG API: /v1/assets/:name/list
     * @param name of the asset
     * @param options (limit, fingerprint, sort, filter)
     * @param callback
     * @returns list of assets
     */
    getList(name = false, options = {}, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!name || !utils.isString(name))
            return callback('Invalid identifier provided');

        if (options.limit <= 0)
            return callback('Limit must be greater than 0');
        if (options.limit > 200)
            return callback('Max limit is 200');

        if (!callback)
            return this.injectPromise(this.getList, name, options);

        if (this.tronGrid.experimental)
            options.experimental = this.tronGrid.experimental;

        this.apiNode.request(`v1/assets/${name}/list`, options, 'get').then(response => {
            if (options.only_data_and_fingerprint) {
                callback(null, response.data, response.meta.fingerprint);
            } else {
                callback(null, response);
            }
        }).catch(err => callback(err));
    }

    /**
     * @name TG API: /v1/assets
     * @param lists all the assets
     * @param options (limit, fingerprint, sort, filter)
     * @param callback
     * @returns list of assets
     */
    getAll(options = {}, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (options.limit <= 0)
            return callback('Limit must be greater than 0');
        if (options.limit > 200)
            return callback('Max limit is 200');

        if (!callback)
            return this.injectPromise(this.getAll, options);

        if (this.tronGrid.experimental)
            options.experimental = this.tronGrid.experimental;

        this.apiNode.request(`v1/assets`, options, 'get').then(response => {
            if (options.only_data_and_fingerprint) {
                callback(null, response.data, response.meta.fingerprint);
            } else {
                callback(null, response);
            }
        }).catch(err => callback(err));
    }
}
