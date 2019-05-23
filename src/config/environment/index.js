'use strict';

var _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

const config = _.merge(
  require('./common'),
  require('./shared'),
  require('./' + process.env.NODE_ENV + '.js') || {});

// Using RC to read settings in /etc/appnamerc
module.exports = require('rc')(process.env.npm_package_name, config);;