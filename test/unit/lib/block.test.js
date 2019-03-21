const {assert, tronGridBuilder, net} = require('../../helpers/includes')


describe('#block functional unit test', function () {

    let tronGrid;

    before(async function () {
        this.timeout(10000);
        tronGrid = tronGridBuilder.createInstance(net);
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

    describe('#get events by block number', function () {

        it('should get events in single block', async function () {
            let blockNumber = 7296697;
            const events = await tronGrid.block.getEvents(blockNumber, {only_data_and_fingerprint: true});
            for (let event of events) {
                assert.equal(event.block, blockNumber);
            }
        });
    });

})
