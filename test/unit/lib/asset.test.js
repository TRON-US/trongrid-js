const {assert, tronGridBuilder, net} = require('../../helpers/includes')


describe('#asset functional unit test', function () {

    let tronGrid;

    before(async function () {
        this.timeout(10000);
        tronGrid = tronGridBuilder.createInstance(net);
        tronGrid.setExperimental('RVg3e7ma');
    });

    after(async function () {
        this.timeout(10000);
    });

    describe('#get asset by identifier', function () {
        this.timeout(10000);

        const identifiers = [
            '1000001',
            '1000002',
            '1000018',
            'TGzz8gjYiYRqpfmDwnLxfgPuLVNmpCswVp',
            'TB16q6kpSEW2WqvTJ9ua7HAoP9ugQ2HdHZ',
            'TV3NmH1enpu4X5Hur8Z16eCyNymTqKXQDP',
            '41ceeac0188d24b5e91087602c60f324c2fb2a3840',
            '41569852808611a64cd804cf6c242510c29830dcfb',
            '414ae1ad9344d1e393a4d733e03b2ec48f3909002e'
        ];

        it('should get asset by id or address', async function () {
            for (let identifier of identifiers) {
                const res = await tronGrid.asset.get(identifier, {});
                for (let item of res.data) {
                    assert.isTrue(item.id === identifier || tronGrid.tronWeb.address.fromHex(item.owner_address) === tronGrid.tronWeb.address.fromHex(identifier));
                }
            }
        });
    });

    describe('#get asset by name', function () {
        this.timeout(10000);

        const names = [
            '53454544',
            '545258',
            '49504653',
            '426974636f696e',
            '454f53'
        ];

        it('should get asset list by name', async function () {
            for (let name of names) {
                const res = await tronGrid.asset.getList(name, {});
                for (let item of res.data) {
                    assert.equal(item.name, name);
                }
            }
        });
    });

    describe('#get the a list of assets', function () {

        it('should get assets list', async function () {
            const res = await tronGrid.asset.getAll({limit: 1, order_by:'id,asc'});
            assert.equal(res.data[0].name, 'SEED');
        });

    });

})
