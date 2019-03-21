const {assert, tronGridBuilder, net} = require('../../helpers/includes')


describe('#transcation functional unit test', function () {

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

    describe('#get events by transaction id', function () {

        it('should get events in single transaction', async function () {
            let transactionId = '896a39021ce7bd9395db606ddeab6a81680deb25089c11fe00802dd4f0f9f03e';
            const response = await tronGrid.transaction.getEvents(transactionId);
            for (let event of response.data) {
                assert.equal(event.transaction, transactionId);
            }
        });
    });

})
