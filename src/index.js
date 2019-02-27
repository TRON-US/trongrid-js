import utils from 'utils';
import Trx from 'lib/trx';

class TronGrid {
    static Trx = Trx;

    constructor(net) {
        const network = utils.configureNet(net);

        this.tronweb = network.tronweb;
        this.defaultAddress = network.defaultAddress;
        this.utils = utils;
        this.apiVersion = "v1";
        this.trx = new Trx(this);
    }

    static isAddress(address = false) {
        if(!utils.isString(address))
            return false;

        if(address.length === 42) {
            try {
                return this.isAddress(
                    utils.crypto.getBase58CheckAddress(
                        utils.code.hexStr2byteArray(address)
                    )
                );
            } catch (err) {
                return false;
            }
        }
        try {
            return utils.crypto.isAddressValid(address);
        } catch (err) {
            return false;
        }
    }

    static address() {
        return {
            fromHex(address) {
                if(!utils.isHex(address))
                    return address;

                return utils.crypto.getBase58CheckAddress(
                    utils.code.hexStr2byteArray(address.replace(/^0x/,'41'))
                );
            },
            toHex(address) {
                if(utils.isHex(address))
                    return address.toLowerCase().replace(/^0x/, '41');

                return utils.code.byteArray2hexStr(
                    utils.crypto.decodeBase58Address(address)
                ).toLowerCase();
            },
            fromPrivateKey(privateKey) {
                try {
                    return utils.crypto.pkToAddress(privateKey);
                } catch {
                    return false;
                }
            }
        }
    }
}
