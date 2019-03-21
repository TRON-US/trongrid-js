import Base from './Base';

let utils;

export default class Asset extends Base {

    constructor(tronGrid) {
        super(tronGrid);
        utils = this.utils;
    }

    /**
     * @name TG API: /v1/assets/:identifier
     * @param identifier (asset ID, its name, or issuer address)
     * @param options (is_name, limit, fingerprint, sort, filter)
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

        const {
            is_name,
            limit,
            only_confirmed,
            only_unconfirmed,
            sort
        } = Object.assign({
            is_name: false,
            limit: 20,
            only_confirmed: false,
            only_unconfirmed: false,
            sort: "-start_time"
        }, options);

        if (options.limit <= 0)
            return callback('Limit must be greater than 0');
        if (options.limit > 200)
            return callback('Max limit is 200');

        if (!callback)
            return this.injectPromise(this.get, identifier, options);

        if (this.tronWeb.experimental)
            options.experimental = this.tronWeb.experimental;

        this.apiNode.request(`v1/assets/${identifier}`, options, 'get').then(({assetIssue = []}) => {
            callback(null, assetIssue.map(token => this.tronWeb.trx.parseToken(token)))
        }).catch(err => callback(err))
    }
}
