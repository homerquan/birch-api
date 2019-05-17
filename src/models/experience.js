/*
* @Author: homer
* @Date:   2019-05-09 12:20:50
* @Last Modified by:   homer
* @Last Modified time: 2019-05-16 18:31:41
*/

import timestamps from 'mongoose-timestamp';
import hashids from '../libs/hashids';
import $ from '../libs/dollar';

const schema = {
  raw: {
  	type: String, //Raw JSON DL of exmperience
  },
  status : {
    type: String,
    default: 'waiting',
    enum: ['ready', 'error', 'waiting'],
  },
  _app: {
    type: String,
    index: true,
  },
  _owner: {
    type: String,
    index: true,
  },
};

const Schema = new $['mg'].Schema(schema, {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

Schema.plugin(timestamps);

export default $['mg'].model('Experience', Schema);
