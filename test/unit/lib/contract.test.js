const {assert, tronGridBuilder, net} = require('../../helpers/includes')


describe('Contract functional unit test', function () {

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
            // let contractAddress = 'TLiXUGoitF1qPM6Z2c8g6fygiawoEyLXWL'; // TRX Kicks for shasta
            // let contractAddress = 'TEEXEWrkMFKapSMJ6mErg39ELFKDqEs6w3'; // TronBet good for main
            // let contractAddress = 'TZ7y9zuk1LMfp4JLFPrs1EcqXuqZukmBYG'; // TronWow good for main also
            let contractAddress = 'THCS2G33reng9TyGHARDQHGPAbCkP9xg5q'; // Equiptment for main also
            const events = await tronGrid.contract.getEvents(contractAddress, {only_data_and_fingerprint: true});
            for (let event of events) {
                assert.equal(event.contract_address, contractAddress);
            }
        });
    });
    
    describe.skip('#contract.watchEvent()', function () {

        // Easiest to test on main net, change setting in config
        it('should watch for an event', async function () {
            // let contractAddress = 'TLiXUGoitF1qPM6Z2c8g6fygiawoEyLXWL'; // TRX Kicks for shasta
            // let contractAddress = 'TEEXEWrkMFKapSMJ6mErg39ELFKDqEs6w3'; // TronBet good for main
            let contractAddress = 'TZ7y9zuk1LMfp4JLFPrs1EcqXuqZukmBYG'; // TronWow good for main also
            // let contractAddress = 'THCS2G33reng9TyGHARDQHGPAbCkP9xg5q'; // Equiptment for main also
            const watchTest = await tronGrid.contract.watchEvent(contractAddress, 'OnPay', {
                only_data_and_fingerprint: true
            }, (err, res) => {
                if(res) {
                    assert.equal(res.event_name, 'OnPay')  
                    watchTest.stop() // calls stop on itself if successful
                }
            });
        });
    });
})