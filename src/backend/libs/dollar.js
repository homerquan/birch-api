/**
 *
 * Global object for singleton pattern
 *
 **/


import logger from './logger';
import Promise from 'bluebird';

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
    return instance;
  }
}

const dollar = new Dollar();

export default dollar;