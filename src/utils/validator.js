module.exports = {
    isValidAddress: address =>  {
        return !(!address || address.length !== 34 || /[^a-zA-Z0-9]/.test(address));

    },
    isValidEventName: eventName => {
        return !(!eventName || /[^a-zA-Z0-9_]+/.test(eventName));

    },
    isValidTransactionId: txId => {
        return /^[a-z0-9]{64}/.test(txId)
    },
    isValidBlockNumber: blockNumber => {
        return !/[^0-9]/.test(blockNumber.toString())
    }
};
