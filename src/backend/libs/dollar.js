/**
 *
 * Global object for singleton pattern
 *
 **/


import logger from './logger';
import Promise from 'bluebird';

const ms = require('./seneca');
const mongoose = Promise.promisifyAll(require('mongoose'));

let instance = null;

class Dollar {
  constructor() {
    if (!instance) {
      instance = this;
    }
    this.config = require('../config/environment');
    this.mg = mongoose;
    this.log = logger;
    this.ms = ms;
    return instance;
  }
}

const dollar = new Dollar();

export default dollar;