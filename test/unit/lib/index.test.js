const {assert, assertThrow, tronGridBuilder, net} = require('../../helpers/includes');


describe('#next page test', function () {

    let tronGrid;
    let types = ['links', 'json'];

    before(async function () {
        this.timeout(10000);
        tronGrid = tronGridBuilder.createInstance(net);
        tronGrid.setExperimental('RVg3e7ma');
    });

    after(async function () {
        this.timeout(10000);
    });


    describe('#asset next page test', function () {
        this.timeout(10000);

        it('should get all assets with pagination', async function () {
            for (let type of types) {
                let res = await tronGrid.asset.getAll({limit: 200});
                let i = 1;
                while (res.meta && res.meta.fingerprint) {
                    res = await tronGrid.nextPage(type === 'links' ? res.meta.links.next : res);
                    ++i;
                }
                assert.isTrue(i >= 1);
            }
        });

    });


    describe('#transaction next page test', function () {
        this.timeout(10000);

        const addresses = [
            '4142232ff1bddd5f01c948c9a661e43308648cfeb2'
        ];

        it('should get transactions with pagination', async function () {
            for (let type of types) {
                for (let address of addresses) {
                    let res = await tronGrid.account.getTransactions(address);
                    let totalPage = 3;
                    let i = 1;
                    while (res.meta && res.meta.fingerprint && i < 3) {
                        res = await tronGrid.nextPage(type === 'links' ? res.meta.links.next : res);
                        ++i;
                    }
                    assert.equal(totalPage, i);
                }
            }
        });

    });


    describe.skip('#events by contract address next page test', function () {
        this.timeout(10000);

        it('should get events by contract address with pagination', async function () {
            for (let type of types) {
                let contractAddress = 'TZ7y9zuk1LMfp4JLFPrs1EcqXuqZukmBYG';
                let res = await tronGrid.contract.getEvents(contractAddress);
                let totalPage = 3;
                let i = 1;
                while (res.meta && res.meta.fingerprint && i < 3) {
                    res = await tronGrid.nextPage(type === 'links' ? res.meta.links.next : res);
                    ++i;
                }
                assert.equal(totalPage, i);
            }
        });

    });


    describe('#validation for next page', function () {
        this.timeout(10000);

        it('should throw invalid data provided error', async function () {
            await assertThrow(
                tronGrid.nextPage(null),
                'Invalid data provided.'
            );
        });

        it('should throw invalid data format provided error', async function () {
            await assertThrow(
                tronGrid.nextPage(12345678),
                'Invalid data format provided.'
            );
        });

        it('should throw it\'s the last page or missed fingerprint in the links error', async function () {
            let res = await tronGrid.account.getTransactions('4142232ff1bddd5f01c948c9a661e43308648cfeb2');
            delete res.meta.fingerprint;
            await assertThrow(
                tronGrid.nextPage(res.meta.links.next),
                'It\'s the last page or missed fingerprint in the links.'
            );
        });

        it('should throw it\'s the last page or missed fingerprint in the json error', async function () {
            let res = await tronGrid.account.getTransactions('4142232ff1bddd5f01c948c9a661e43308648cfeb2');
            delete res.meta.fingerprint;
            await assertThrow(
                tronGrid.nextPage(res),
                'It\'s the last page or missed fingerprint in the json.'
            );
        });

    });



})
