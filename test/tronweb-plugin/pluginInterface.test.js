const TronWeb = require('../setup/TronWeb');
const {assert} = require('../helpers/includes');
const TronGrid = require('../setup/TronGrid');
const {LOCAL} = require('../helpers/config');

describe('#pluginInterface for walletextension plugin', function () {

    let tronWeb;

    before(async function () {
        tronWeb = new TronWeb({
            fullHost: LOCAL.HOST
        });

        // tronWeb.plugin.register(TronGrid, {experimental: 'RVg3e7ma'});

    });

    describe.skip('#get transaction from this', function () {

        const address = '4142232ff1bddd5f01c948c9a661e43308648cfeb2';

        it('should substitute getTransactionsToAddress', async function () {

            const res = await tronWeb.trx.getTransactionsToAddress(address, 5);
            assert.equal(res.length, 5);
            assert.isNotNull(res[0].txID);
        })

        it('should substitute getTransactionsFromAddress', async function () {

            const res = await tronWeb.trx.getTransactionsFromAddress(address, 5);
            assert.equal(res.length, 5);
            assert.isNotNull(res[0].txID);
        })
    })
})
