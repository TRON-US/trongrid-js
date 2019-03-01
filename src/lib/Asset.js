import Base from './Base';

let utils;
let tronWebUtils;

export default class Asset extends Base {

    constructor(tronGrid) {
        super(tronGrid);
        utils = this.utils;
        tronWebUtils = this.tronWebUtils
    }

    /**
     * TG API: /v1/assets/:identifier
     * @param identifier (asset ID, its name, or issuer address)
     * @param options (is_name, limit, fingerprint, sort, filter)
     * @param callback
     * @returns list of assets
     */
    get(identifier = false, options = {}, callback = false) {
        if (tronWebUtils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!identifier || !(tronWebUtils.isString(identifier) || tronWebUtils.isInteger(identifier)))
            return callback('Invalid identifier provided');

        // TODO validate the options
        if (!callback)
            return this.injectPromise(this.get, identifier, options);

        this.apiNode.request(`v1/assets/${identifier}`, options, 'get').then(({assetIssue = []}) => {
            callback(null, assetIssue.map(token => this.tronWeb.trx.parseToken(token)))
        }).catch(err => callback(err))
    }


}
