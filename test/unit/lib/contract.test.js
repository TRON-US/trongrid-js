const {assert, tronGridBuilder, net} = require('../../helpers/includes');

describe('#contract functional unit test', function () {

    let tronGrid;
    let tronWeb;

    before(async function () {
        this.timeout(10000);
        tronGrid = tronGridBuilder.createInstance(net);
        tronWeb = tronGrid.tronWeb;
    });

    after(async function () {
        this.timeout(10000);
    });

    describe('#get events by contract address', function () {
        this.timeout(10000);

        it('should get events without filter', async function () {
            let contractAddress = 'TZ7y9zuk1LMfp4JLFPrs1EcqXuqZukmBYG';
            const events = await tronGrid.contract.getEvents(contractAddress, {only_data_and_fingerprint: true});
            for (let event of events) {
                assert.equal(event.contract_address, contractAddress);
            }
        });
    });


    describe('#get trc20 tokens by contract address', function () {
        this.timeout(10000);

        it('should get trc20 tokens without filter', async function () {
            let contractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';
            const tokens = await tronGrid.contract.getTrc20Tokens(contractAddress, {only_data_and_fingerprint: true});
            assert.isArray(tokens)
            for (let token of tokens) {
                let accountAddress = Object.keys(token)[0]
                assert.isTrue(tronWeb.isAddress(accountAddress))
                assert.isNumber(token[accountAddress]);
            }
        });
    });

    describe.skip('#contract.watchEvent()', function () {

        let accounts;
        let contract;
        let contractAddress;

        before(async function () {

            accounts = await tronGridBuilder.getTestAccounts(-1);
            tronWeb.setPrivateKey(accounts.pks[0]);

            const transaction = await tronWeb.transactionBuilder.createSmartContract({
                abi: [
                    {
                        "anonymous": false,
                        "inputs": [
                            {
                                "indexed": true,
                                "name": "_sender",
                                "type": "address"
                            },
                            {
                                "indexed": false,
                                "name": "_receiver",
                                "type": "address"
                            },
                            {
                                "indexed": false,
                                "name": "_amount",
                                "type": "uint256"
                            }
                        ],
                        "name": "SomeEvent",
                        "type": "event"
                    },
                    {
                        "constant": false,
                        "inputs": [
                            {
                                "name": "_receiver",
                                "type": "address"
                            },
                            {
                                "name": "_someAmount",
                                "type": "uint256"
                            }
                        ],
                        "name": "emitNow",
                        "outputs": [],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                    }
                ],
                bytecode: "0x608060405234801561001057600080fd5b50610145806100206000396000f300608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063bed7111f14610046575b600080fd5b34801561005257600080fd5b50610091600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610093565b005b3373ffffffffffffffffffffffffffffffffffffffff167f9f08738e168c835bbaf7483705fb1c0a04a1a3258dd9687f14d430948e04e3298383604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a250505600a165627a7a7230582033629e2b0bba53f7b5c49769e7e360f2803ae85ac80e69dd61c7bb48f9f401f30029"
            });
            const signedTransaction = await tronWeb.trx.sign(transaction, accounts.pks[0]);
            const result = await tronWeb.trx.broadcast(signedTransaction);

            contractAddress = result.transaction.contract_address;
            contract = await tronWeb.contract().at(contractAddress);

        });

        it('should watch for an event', async function () {

            const watchTest = await tronGrid.contract.watchEvent(contractAddress, 'SomeEvent', {
                only_data_and_fingerprint: true
            }, (err, res) => {
                if(res) {
                    assert.equal('41' + res.result._sender.slice(2), accounts.hex[0]);
                    assert.equal(res.result._amount, 1000);
                    assert.equal('41' + res.result._receiver.slice(2), accounts.hex[1]);

                    watchTest.stop();
                }
            });

            contract.emitNow(accounts.hex[1], 1000).send({ from: accounts.hex[0] });

        });

        it('should throw error if invalid callback function passed', async function () {

            try {
                await tronGrid.contract.watchEvent(contractAddress, 'SomeEvent', {
                    only_data_and_fingerprint: true
                })
                assert(false)
            }catch(e) {
                assert(true)
            }

        });
    });

})
