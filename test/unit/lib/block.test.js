const chai = require('chai');
const assert = chai.assert;
const tronGridBuilder = require('../../helpers/tronGridBuilder');
const { NET } = require('../../helpers/config');


describe('#block functional test', function () {

    let tronGrid;

    before(async function () {
        tronGrid = tronGridBuilder.createInstance(NET);
    });

    beforeEach(async function () {
        this.timeout(10000)
    })

    after(async function () {
        this.timeout(10000)
    })

    describe('#get events by block number', function () {

        it('should get all events info in one block', async function () {
            let blockNumber = 7296697;
            const events = await tronGrid.block.getEvents(blockNumber);
            for (event of events) {
                assert.equal(event.block, blockNumber);
            }
        });
    });

})
