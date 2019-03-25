# What is TronGridJS?

__[TronGridJS - Developer Document](https://developers.tron.network/docs/trongrid-js-intro)__

TronGridJS is a Javascript library for utilizing TronGrid APIs to retrieve blockchain data from the Tron network.

## Compatibility
- Version built for Node.js v6 and above
- Version built for browsers with more than 0.25% market share

TronGridJS is also compatible with frontend frameworks such as:
- Angular
- React
- Vue

You can also ship TronGridJS in a Chrome extension.

## Installation

__[TronGridJS - NPM Package](https://www.npmjs.com/package/trongrid)__

#### NPM
```bash
> npm install trongrid
```

#### Yarn
```bash
> yarn add trongrid
```

## Build Steps

If you'd like to download and build locally, please follow the steps below.
```bash
git clone https://github.com/TRON-US/trongrid-js.git
cd trongrid-js
yarn install
yarn dev
yarn build
yarn test
```

## Supported APIs

TronGridJS allows to easily access the new v1 API provided by TronGrid.


#### `tronGrid.account.get(accountAddress, options)`
It returns info about the account at `accountAddress`

Options:
```
onlyConfirmed       Show only the situation at latest confirmed block
                        true | false        (default false)
```
It substitutes the following JavaTron API:
* /wallet/getaccount


#### `tronGrid.account.getTransations(accountAddress, options)`
It returns all the transactions related to the account at `accountAddress`.

Options:
```
only_confirmed      Shows only confirmed.
                        true | false        default false
only_unconfirmed    Shows only unconfirmed.
                        true | false        default false
only_to             Only transaction to address.
                        true | false       default false
only_from           Only transaction from address.
                        true | false        default false
limit               The requested number of transaction per page. Default 20. Max 200.
fingerprint         The fingerprint of the last transaction returned by the previous page
order_by            Sorts the results of the query. Example:
                        order_by=timestamp,desc
min_timestamp       The minimum transaction timestamp        default 0
max_timestamp       The maximum transaction timestamp        default now

```
It substitutes the following JavaTron API:
* /walletextension/gettransactionfromthis
* /walletextension/gettransactiontothis



#### `tronGrid.asset.getAll(options)`
It returns all the assets on the TRON platform.

Options:
```
order_by            Sorts the results.
                    Accepted fields:
                        id
                        name
                        total_supply
                        start_time
                        end_time
limit               Number of assets per page
fingerprint         Previous fingerprint. For pagination.
```


#### `tronGrid.asset.get(assetIdentifier, options)`
It returns an asset identified by the address of its owner, or its own ID
It substitutes the following JavaTron API:
* /wallet/getassetissuebyaccount
* /wallet/getassetissuebyid



#### `tronGrid.asset.getList(assetName, options)`
It returns all the asset with the name `assetName`

Options:
```
limit               The requested number of assets per page. Default 20. Max 200.
fingerprint         The fingerprint of the last asset returned by the previous page.
                    When there is a pagination, the minimum limit is set to 20.
order_by            Sorts the results of the query.
                    Accepted fields:
                        id
                        name
                        total_supply
                        start_time
                        end_time
                    Example:
                        order_by=start_time,desc   (starts from the most recent ICO)
                        order_by=id,asc            (starts from the oldest)

only_confirmed      Shows only the situation at latest confirmed block.
                        true | false        default false

```

It substitutes the following JavaTron API:
* /wallet/getassetissuelistbyname
* /wallet/getassetissuelist



#### `tronGrid.block.getEvents(identifier, options)`
It returns all the events of a specific block.
The identifier can be either `latest` or a block number.



#### `tronGrid.contract.getEvents(contractAddress, options)`
It returns all the events emitted by a smart contract.

Options:
```
only_confirmed         Shows only confirmed.
                            true | false                default false
only_unconfirmed       Shows only unconfirmed.
                            true | false                default false
event_name             The name of the event
block_number           The block number for which the events are required
min_timestamp          The minimum block timestamp     default 0
max_timestamp          The maximum block timestamp        default now
order_by               Sort the events. Accepted values:
                            timestamp,asc
                            timestamp,desc         (default)
limit                  For pagination.                 default 20, max 200
fingerprint                The fingerprint of last event retrieved in the page
```



#### `tronGrid.transaction.getEvents(id, options)`
It returns all the events emitted in the transaction specified by `id`


## Responses and pagination

Any API will return a response with a success property, a data array and a meta object.
For example, `await tronGrid.asset.getAll()` will return something like

```
{
    "success": true,
    "data": [
        {
            "confirmed": true,
            "id": "1002225",
            "abbr": "DbDsgVP3GRh",
            "description": "KEYS unlock Cryptocurrency. Keys are a digital asset designed to work as medium of exchange.",
            "frozen_supply": [
                {
                    "forzen_days": 730,
                    "frozen_amount": 75926666666
                }
            ],
            "name": "KEYS",
            "num": 22778,
            "precision": 0,
            "total_supply": 227780000000,
            "trx_num": 22778,
            "url": "www.KEYS.crypto.org",
            "vote_score": 0,
            "owner_address": "4149b3dad5ef9dbab6a059fc95159efcecd5db910e",
            "start_time": 1553538720706,
            "end_time": 1553538960706
        },
        ...
    ],
    "meta": {
        "total": 2,
        "at": 1553548776704,
        "fingerprint": "8xuwf4jd2dpoSms5KzLhxY9fmCm9oJA5164Qd7T2SexRSHYCwvRAr2zJGtwJceEcGWz",
        ...
    }
}

```

As you can see, in the meta fields, there is the fingerprint you must pass to next request as an option in order to get next page.


## Usage

Install [TronWeb](https://github.com/tronprotocol/tron-web) if you don't have done it yet.

```bash
npm install tronweb
```

Initialize TronWeb and create TronGridJS instance

```js
const TronGrid = require('trongrid');
const TronWeb = require('tronweb');

const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io'
});

const tronGrid = new TronGrid(tronWeb);

```

### Example

```js
const TronGrid = require('trongrid');
const TronWeb = require('tronweb');

const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io'
});

const tronGrid = new TronGrid(tronWeb);
tronGrid.setExperimental('your experimental key');

async function getAccount() {
    const address = 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY';

    const options = {
        Show_assets: true,
        only_confirmed: true,
    };

    // awaiting
    const account = await tronGrid.account.get(address, options);
    console.log({account});

    // promise
    tronGrid.account.get(address, options).then(account => {
        console.log({account});
    }).catch(err => console.error(err));

    // callback
    tronGrid.account.get(address, options, (err, account) => {
        if (err)
            return console.error(err);

        console.log({account});
    });
}

async function getTransactions() {
    const address = 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY';

    const options = {
        only_to: true,
        only_confirmed: true,
        limit: 100,
        order_by: 'timestamp,asc',
        min_timestamp: Date.now() - 60000 // from a minute ago to go on
    };

    // awaiting
    const transactions = await tronGrid.account.getTransactions(address, options);
    console.log({transactions});

    // promise
    tronGrid.account.getTransactions(address, options).then(transactions => {
        console.log({transactions});
    }).catch(err => console.error(err));

    // callback
    tronGrid.account.getTransactions(address, options, (err, transactions) => {
        if (err)
            return console.error(err);

        console.log({transactions});
    });
}

async function getAssets() {
    const address = 'TXk39yyhzpfbqtU1BATUzpcfQ37L8Tc4Ht';
    const options = {};

    // awaiting
    const assets = await tronGrid.asset.get(address);
    console.log({assets});

    // promise
    tronGrid.asset.get(address, options).then(assets => {
        console.log({assets});
    }).catch(err => console.error(err));

    // callback
    tronGrid.asset.get(address, options, (err, assets) => {
        if (err)
            return console.error(err);

        console.log({assets});
    });
}

getAccount();
getTransactions();
getAssets();
```

### Version History

__1.0.2__
* Fix example in README using the new parameters min_timestamp, max_timestamp and order_by.

__1.0.1__
* Updates README for TronWeb 2.3.+.


__1.0.0__
* Supports retrieving info, transactions, and assets by identifier.
* Supports retrieving events by contract address. 
* Supports retrieving transaction by ID.
* Supports retrieving events by block number.
