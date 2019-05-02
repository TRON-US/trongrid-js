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

    describe('#get events by transaction id', function () {
        this.timeout(10000);

        it('should get events in single transaction', async function () {
            let transactionId = '896a39021ce7bd9395db606ddeab6a81680deb25089c11fe00802dd4f0f9f03e';
            const response = await tronGrid.transaction.getEvents(transactionId, {only_data_and_fingerprint: true});
            for (let event of response) {
                assert.equal(event.transaction_id, transactionId);
            }
        });
    });

})
