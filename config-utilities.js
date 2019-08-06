const urlPartsRegex = /(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/i;

const getSubDomain = (url) => {
	const urlParts = urlPartsRegex.exec(url);
	return urlParts && urlParts.length > 1 ? urlParts[1].toLowerCase() : null;
};

const getEnvironment = (hostname = '', subDomain = '') => {
	if (hostname.indexOf('localhost') > -1) {
		return 'local';
	} else if (subDomain === 'staging') {
		return subDomain;
	} else if (subDomain === 'dev') {
		return 'development';
	} else if (!subDomain || subDomain === 'www') {
		return 'production';
	}
	return 'local';
};

class Config {
	constructor(values) {
		this.values = values;
	}

	GetValue(key) {
		const { href = '', hostname = '' } = window.location;
		const subDomain = getSubDomain(href);
		const environmentKey = getEnvironment(hostname, subDomain);
		const environmentConfig = this.values.hasOwnProperty(environmentKey) ? this.values[environmentKey] : null;

		if (!environmentConfig) {
			console.error(`Unable to retrieve value. The "${environmentKey}" config does not exist.`);
		}

		const environmentValue = environmentConfig[key];

		return environmentConfig && environmentValue
			? environmentValue
			: console.error(
					`Unable to retrieve value. The ${environmentKey} config does not contain the key "${key}".`
				);
	}
}

export { Config };
