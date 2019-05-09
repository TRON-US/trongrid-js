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

        this.validator.validateAssetIdentifier(identifier);

        if (!callback)
            return this.injectPromise(this.get, identifier, options);

        if (this.tronGrid.experimental)
            options.experimental = this.tronGrid.experimental;

        this.APIClient.get(`v1/assets/${identifier}`, options, callback);
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

        this.validator.validateAssetIdentifier(name);

        this.validator.validateOptions(options);

        if (!callback)
            return this.injectPromise(this.getList, name, options);

        return this.APIClient.get(`v1/assets/${name}/list`, options, callback);
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

        this.validator.validateOptions(options);

        if (!callback)
            return this.injectPromise(this.getAll, options);

        return this.APIClient.get(`v1/assets`, options, callback);
    }
}
