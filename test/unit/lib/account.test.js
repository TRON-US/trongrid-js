const {assert, tronGridBuilder, net} = require('../../helpers/includes')


describe('#account functional unit test', function () {

    let tronGrid;

    before(async function () {
        this.timeout(10000);
        tronGrid = tronGridBuilder.createInstance(net);
        tronGrid.setExperimental('RVg3e7ma');
    });

    after(async function () {
        this.timeout(10000);
    });

    beforeEach(async function () {
        this.timeout(10000);
    });

    afterEach(async function () {
        this.timeout(10000);
    });

    describe('#get account by address', function () {

        const addresses = [
            '4142232ff1bddd5f01c948c9a661e43308648cfeb2'
        ];

        it('should get account by address', async function () {
            for (let address of addresses) {
                const res = await tronGrid.account.get(address, {});
                for (let account of res.data) {
                    assert.equal(account.address, address);
                }
            }
        });
    });

    describe('#get transaction by account address', function () {

        const addresses = [
            '4142232ff1bddd5f01c948c9a661e43308648cfeb2'
        ];

        it('should get transaction by address', async function () {

            for (let address of addresses) {
                const res = await tronGrid.account.getTransactions(address, {});
                for (let tx of res.data) {
                    for (let contract of tx.raw_data.contract) {
                        const ownerAddress = contract.parameter.value.owner_address;
                        const toAddress = contract.parameter.value.to_address;
                        assert.isTrue(ownerAddress === address || toAddress === address);
                    }
                }
            }
        });
    });

})
