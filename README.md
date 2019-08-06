# Baltimore County Javascript Utilities

A group of javascript utilities that have been found to be useful across different projects at Baltimore County.

## Config Utilities

The config utilities help us share configuration values based on the cms environment they are in. Our current cms makes it extremely difficult to manage our config values in our apps.

### SetConfig

The constructor takes one parameter "values" which an object which contains configuration for the following environments: `local, development, staging, production`;


**Usage**

```js
import { SetConfig } from '@baltimorecounty/javascript-utilities';

const configValues = {
	local: {
		apiRoot: 'http://localhost:1919/api'
	},
	development: {
		apiRoot: 'http://testservices.baltimorecountymd.gov/api'
	},
	staging: {
		apiRoot: 'http://stagingservices.baltimorecountymd.gov/api'
	},
	production: {
		apiRoot: 'http://services.baltimorecountymd.gov/api'
	}
};

SetConfig(configValues); // Sets the config for use with either GetValue or Config
```

*Note*: You will want to include this either at the beginning of your script inclusions or your app.js in a React app.

### GetValue

Takes a key of the configuration value you wish to return.

If the config hasn't been set, you are in an environment that doesn't exist, or pass in a key that doesn't exist you will get a console.error describing what went wrong.

**Usage**

```js
import { GetValue } from '@baltimorecounty/javascript-utilities';
const apiRoot = GetValue('apiRoot'); // for local environments returns http://localhost:1919/api
```

### Config

Returns the entire config object

**Usage**

```js
import { Config } from '@baltimorecounty/javascript-utilities';
const apiRoot = console.log(Config);
// Logs
{
	local: {
		apiRoot: 'http://localhost:1919/api'
	},
	development: {
		apiRoot: 'http://testservices.baltimorecountymd.gov/api'
	},
	staging: {
		apiRoot: 'http://stagingservices.baltimorecountymd.gov/api'
	},
	production: {
		apiRoot: 'http://services.baltimorecountymd.gov/api'
	}
}
```

### Environments

- **local** - any url that contains `localhost`
- **development** - any url with `dev` subdomain - *Example*: dev.baltimorecountymd.gov
- **staging** - any url with `staging` subdomain - *Example*: staging.baltimorecountymd.gov
- **production** - any url with `www.` or no subdomain but not localhost - *Example*: www.baltimorecountymd.gov