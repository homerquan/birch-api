/* eslint-disable max-len */

let config = {};

const envConfig = require('./environment');
// Using RC to read settings in /etc/appnamerc
config = require('rc')(process.env.npm_package_name || 'convospot-console', envConfig);

module.exports = config;
