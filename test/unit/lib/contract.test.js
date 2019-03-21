const {assert, tronGridBuilder, net} = require('../../helpers/includes')


describe('#contract functional unit test', function () {

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

    describe('#get events by contract address', function () {

        it('should get events without filter', async function () {
            let contractAddress = 'THCS2G33reng9TyGHARDQHGPAbCkP9xg5q';
            const events = await tronGrid.contract.getEvents(contractAddress, {only_data_and_fingerprint: true});
            for (let event of events) {
                assert.equal(event.contract, contractAddress);
            }
        });
    });

})
