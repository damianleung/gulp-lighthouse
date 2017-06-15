'use strict';
var gutil = require('gulp-util');
var PLUGIN_NAME = 'gulp-lighthouse';

// TODO: Switch when https://github.com/GoogleChrome/lighthouse/pull/916 lands
// const lighthouse = require('lighthouse/lighthouse-cli/bin.js').launchChromeAndRun;
var lighthouse = require('lighthouse');
var chromeLauncher = require('lighthouse/chrome-launcher/chrome-launcher');
var log = require('lighthouse/lighthouse-core/lib/log');
var exec = require('child_process').exec;
var configPath = 'lighthouse/lighthouse-core/config/default.json';

// TODO: Add more options
var defaultOptions = {
	url: '',
	perf: false,
	disableDeviceEmulation: false,
	disableCPUThrottling: true,
	disableNetworkThrottling: false,
	saveAssets: false,
	saveArtifacts: false
};

function validateInput(options) {
	if (typeof options.disableDeviceEmulation === 'string') {
		options.disableDeviceEmulation = String(options.disableDeviceEmulation);
	}
	if (typeof options.disableCPUThrottling === 'string') {
		options.disableCPUThrottling = String(options.disableCPUThrottling);
	}
	if (typeof options.disableNetworkThrottling === 'string') {
		options.disableNetworkThrottling = String(options.disableNetworkThrottling);
	}
	if (typeof options.saveAssets === 'string') {
		options.saveAssets = String(options.saveAssets);
	}
	if (typeof options.saveArtifacts === 'string') {
		options.saveArtifacts = String(options.saveArtifacts);
	}
	if (typeof options.perf === 'string') {
		options.perf = String(options.perf);
	}
	if (options.perf === true) {
		configPath = 'lighthouse/lighthouse-core/config/perf.json';
	}
	return options;
}

function mergeOptions(options, defaults) {
	for (var key in defaults) {
		if (options.hasOwnProperty(key)) {
			defaults[key] = options[key];
		}
	}
	return defaults;
}

function launchChromeAndRunLighthouse(url, flags, config) {
	return chromeLauncher.launch().then(chrome => {
		flags.port = chrome.port;
		return lighthouse(url, flags, config).then(results => chrome.kill().then(() => results));
	});
}

module.exports = function(options, cb) {
	var lighthouseFlags = validateInput(mergeOptions(options, defaultOptions));

	// TODO: add loglevel as an option
	lighthouseFlags.logLevel = 'info'
	log.setLevel(lighthouseFlags.logLevel);

	try {
		if (lighthouseFlags.url.length) {
			// TODO: handle results according to options specified e.g. json, html, domhtml
			launchChromeAndRunLighthouse(lighthouseFlags.url, lighthouseFlags).then(results => console.log(results));
		}
	} catch (err) {
		this.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
	}
};
