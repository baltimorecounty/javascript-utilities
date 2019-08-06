import { Config } from './config-utilities';

const ValidConfig = {
	local: {
		apiRoot: '//localhost/api'
	},
	development: {
		apiRoot: '//dev.aol.com/myApi'
	},
	staging: {
		apiRoot: '//staging.aol.com/api'
	},
	production: {
		apiRoot: '//production.cloudflare.com/api'
	}
};

test('Initializes an instance of our config class', () => {
	//Arrange
	//Act
	const config = new Config(ValidConfig);

	//Assert
	expect(config.values).toEqual(ValidConfig);
});

test('Gets a value for localhost and valid key', () => {
	//Arrange
	const config = new Config(ValidConfig);
	mockWindowLocation('http://localhost:1919', 'localhost:1919');

	//Act
	const actualApiRoot = config.GetValue('apiRoot');

	//Assert
	expect(actualApiRoot).toEqual('//localhost/api');
});

test('Gets a value for development and valid key', () => {
	//Arrange
	const config = new Config(ValidConfig);
	mockWindowLocation('https://dev.aol.com');

	//Act
	const actualApiRoot = config.GetValue('apiRoot');

	//Assert
	expect(actualApiRoot).toEqual('//dev.aol.com/myApi');
});

test('Logs an error when an invalid key is used', () => {
	//Arrange
	const config = new Config(ValidConfig);
	global.console = { error: jest.fn() };
	mockWindowLocation('https://localhost/api');

	//Act
	config.GetValue('askfdsljlfds');

	//Assert
	expect(console.error).toHaveBeenCalledWith(
		'Unable to retrieve value. The local config does not contain the key "askfdsljlfds".'
	);
});

const mockWindowLocation = (href) => {
	delete global.window.location;
	global.window = Object.create(window);
	const parser = document.createElement('a');
	parser.href = href;

	global.window.location = {
		href: parser.href,
		hostname: parser.hostname
	};
};
