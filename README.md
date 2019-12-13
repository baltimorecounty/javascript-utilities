# Baltimore County Javascript Utilities

A group of javascript utilities that have been found to be useful across different projects at Baltimore County.

## Config Utilities

The config utilities help us share configuration values based on the cms environment they are in. Our current cms makes it extremely difficult to manage our config values in our apps.

### import

```js
import { Config } from "@baltimorecounty/javascript-utilities";
import {
  setConfig,
  getValue,
  config
} = Config;
```

### setConfig

The constructor takes one parameter, "values", which is an object which contains configuration for the following environments: `local, development, staging, production`;

This utility will determine which environment is being used based on the contents of the browser URL per the following:

- **local** - any url that contains `localhost`
- **development** - any url with `dev` subdomain - _Example_: dev.baltimorecountymd.gov
- **staging** - any url with `staging` subdomain - _Example_: staging.baltimorecountymd.gov
- **production** - any url with `www.` or no subdomain but not localhost - _Example_: www.baltimorecountymd.gov

**Usage**

```js
import { Config } from "@baltimorecounty/javascript-utilities";
const { setConfig } = Config;

const configValues = {
  local: {
    apiRoot: "http://localhost:1919/api",
    title: "Local - My Awesome App"
  },
  development: {
    apiRoot: "http://testservices.baltimorecountymd.gov/api",
    title: "Development - My Awesome App"
  },
  staging: {
    apiRoot: "http://stagingservices.baltimorecountymd.gov/api",
    title: "Staging - My Awesome App"
  },
  production: {
    apiRoot: "http://services.baltimorecountymd.gov/api",
    title: "My Awesome App"
  }
};

setConfig(configValues); // Sets the config for use with either GetValue or Config
```

_Note_: You will want to include this either at the beginning of your script inclusions or your app.js in a React app.

### getValue

This function takes a parameter of the key of the configuration value you wish to return, _e.g._ `"title"`.

You will get an error in the console describing what went wrong if the config hasn't been set, you are in an environment that doesn't exist, or you pass in a key that doesn't exist.

**Usage**

```js
import { Config } from "@baltimorecounty/javascript-utilities";
const { getValue } = Config;
const apiRoot = getValue("title"); // for local environments returns "Local - My Awesome App" if used with the config object from the above example
```

### config

Returns the entire config object

**Usage**

```js
import { Config } from "@baltimorecounty/javascript-utilities";
const { config } = Config;
const apiRoot = console.log(config);
// The console log will output the below representation of the config object:
{
	local: {
		apiRoot: 'http://localhost:1919/api',
		title: 'Local - My Awesome App'
	},
	development: {
		apiRoot: 'http://testservices.baltimorecountymd.gov/api',
		title: 'Development - My Awesome App'
	},
	staging: {
		apiRoot: 'http://stagingservices.baltimorecountymd.gov/api',
		title: 'Staging - My Awesome App'
	},
	production: {
		apiRoot: 'http://services.baltimorecountymd.gov/api',
		title: 'My Awesome App'
	}
}
```
