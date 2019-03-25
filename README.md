## What is TronGridJS?

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

__[TronGridJS - NPM Package](https://www.npmjs.com/package/trongrid-js)__

### NPM
```bash
> npm install trongrid-js
```

### Yarn
```bash
> yarn add trongrid-js
```

## Build Steps

If you'd like to download and build locally, please follow the steps below.
```bash
> git clone https://github.com/tronprotocol/trongrid-js.git
> cd trongrid-js
> yarn install
> yarn dev
> yarn build
> yarn test
```

## Supported APIs

#### Accounts API

* GET /v1/accounts/:address
* GET /v1/accounts/:address/transactions

#### Assets API

* GET /v1/assets/:identifier

## Usage

### Install [TronWeb](https://github.com/tronprotocol/tron-web)

#### NPM
```bash
> npm install tronweb
```

### Yarn
```bash
> yarn add tronweb
```

### Initialize TronWeb and create TronGridJS instance

```js
const TronGrid = require('trongrid');
const TronWeb = require('tronweb');

const tronWeb = new TronWeb({
        fullHost: 'https://api.trongrid.io',
        privateKey: 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0'
    }
);

const tronGrid = new TronGrid(tronWeb);
```

### Full Example

```js
const TronGrid = require('trongrid');
const TronWeb = require('tronweb');

const tronWeb = new TronWeb({
        fullHost: 'https://api.trongrid.io',
        privateKey: 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0'
    }
);

const tronGrid = new TronGrid(tronWeb);

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

async function getAsset() {
    const address = 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY';

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
* Supports functions for retrieving info, transactions, and assets for a specific account.
* Supports retrieving events by contract address. 
