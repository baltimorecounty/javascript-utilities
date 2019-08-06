import { SetConfig, GetValue, Config } from './config-utilities';

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

beforeEach(() => {
	SetConfig({}); // reset config
});

test('Initializes an instance of our config class', () => {
	//Arrange
	//Act
	SetConfig(ValidConfig);

	//Assert
	expect(Config).toEqual(ValidConfig);
});

test('Gets a value for localhost and valid key', () => {
	//Arrange
	SetConfig(ValidConfig);
	mockWindowLocation('http://localhost:1919');

	//Act
	const actualApiRoot = GetValue('apiRoot');

	//Assert
	expect(actualApiRoot).toEqual('//localhost/api');
});

test('Gets a value for development and valid key', () => {
	//Arrange
	SetConfig(ValidConfig);
	mockWindowLocation('https://dev.aol.com');

	//Act
	const actualApiRoot = GetValue('apiRoot');

	//Assert
	expect(actualApiRoot).toEqual('//dev.aol.com/myApi');
});

test('Logs an error when an invalid key is used', () => {
	//Arrange
	SetConfig(ValidConfig);
	global.console = { error: jest.fn() };
	mockWindowLocation('https://localhost/api');

	//Act
	GetValue('askfdsljlfds');

	//Assert
	expect(console.error).toHaveBeenCalledWith(
		'Unable to retrieve value. The local config does not contain the key "askfdsljlfds".'
	);
});

test('Logs an error when no config is specified', () => {
	//Arrange
	global.console = { error: jest.fn() };
	mockWindowLocation('https://localhost/api');

	//Act
	GetValue('askfdsljlfds');

	//Assert
	expect(console.error).toHaveBeenCalledWith(
		"It doesn't look like config has been specified, be sure to call SetConfig with your config values."
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
