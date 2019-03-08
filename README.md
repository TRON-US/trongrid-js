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
const TronGrid = require('trongrid-js');
const TronWeb = require('tronweb');

const fullNode = 'https://api.trongrid.io';
const solidityNode = 'https://api.trongrid.io';
const eventServer = 'https://api.trongrid.io/';
const privateKey = 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';

const tronWeb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer,
    privateKey
);

const tronGrid = new TronGrid(tronWeb);
```

### Full Example

```js
const TronGrid = require('trongrid-js');
const TronWeb = require('tronweb');

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider('https://api.trongrid.io');
const solidityNode = new HttpProvider('https://api.trongrid.io');
const eventServer = new HttpProvider('https://api.trongrid.io');

const privateKey = 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';

const tronWeb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer,
    privateKey
);

const tronGrid = new TronGrid(tronWeb);

async function getAccount() {
    const address = 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY';
    
    /*
    Options:
    filter			List the filters to be applied. Accepted parameters:
        			Show_assets:			true | false		default false
        			only_confirmed:		true | false		default false
        			only_unconfirmed:		true | false		default false
    */
    const options = {
        Show_assets: true,
        only_confirmed: true,
    };
    
    const account = await tronGrid.account.get(address, options);
    console.log({account});

    tronGrid.account.get(address, options).then(account => {
        console.log({account});
    }).catch(err => console.error(err));

    tronGrid.account.get(address, options, (err, account) => {
        if (err)
            return console.error(err);

        console.log({account});
    });
}

async function getTransactions() {
    const address = 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY';
    
    /*
    Options:
    filter				Filters to be applied to the results. Accepted parameters:
    					only_to: 			true | false   	default false
    					only_from: 		true | false		default false	
    					only_confirmed:		true | false		default false
    					only_unconfirmed:		true | false		default false
    limit				The requested number of transaction per page. Default 20. Max 200.
    fingerprint			The fingerprint of the last transaction returned by the previous page
    fields				The fields to be returned (comma separated). 
    				If not specified, all the fields are returned.
    sort				Pre sorts the results during the query.  
    				It helps to return a better number of items in the first page.
    				Example:
    					sort=-block_number
    					sort=+block_timestamp
    				(The list of the supported parameters has to be decided in accord with 
    				the database structure.)
    from_timestamp		The timestamp from which the search start.
     */
    const options = {
        only_to: true,
        only_confirmed: true,
        limit: 100,
        sort: -block_number
    };
    
    const transactions = await tronGrid.account.getTransactions(address, options);
    console.log({transactions});

    tronGrid.account.getTransactions(address, options).then(transactions => {
        console.log({transactions});
    }).catch(err => console.error(err));

    tronGrid.account.getTransactions(address, options, (err, transactions) => {
        if (err)
            return console.error(err);

        console.log({transactions});
    });
}

async function getAssets() {
    const address = 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY';
    
    /*
    Options:
    is_name			This is mandatory if the identifier is a name but looks like an id
    				or an address.
    				For example, if a token is named "1000562", TG3 won't be able 
    				to recognize which is the case. So, if "1000562" is the name 
    				of the token, the dev can force it adding:
    					?is_name=true
    limit				The requested number of assets per page. Default 20. Max 200.
    fingerprint			The fingerprint of the last asset returned by the previous page.
    				When there is a pagination, the minimum limit is set to 20.
    sort				Pre sorts the results during the query. Example:
    					sort=+total_supply (starts from the rarest token)
    					sort=-start_time (starts from the most recent ICO)
    filter				Filters to be applied to the results. It will be ignored if it is not
    				applicable to the specific case.
    				Accepted parameters:
    					only_confirmed:		true | false		default false
    					only_unconfirmed:		true | false		default false
    */
    const options = {
        is_name: false,
        limit: 100,
        sort: +total_supply,
        only_confirmed: true
    };
    
    const assets = await tronGrid.asset.get(address, options);
    console.log({assets});

    tronGrid.asset.get(address, options).then(assets => {
        console.log({assets});
    }).catch(err => console.error(err));

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

__1.0.0__
* Supports functions for retrieving info, transactions, and assets for a specific account.
* Supports retrieving events by contract address. 
