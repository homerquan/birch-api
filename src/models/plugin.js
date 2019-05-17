/*
 * @Author: homer
 * @Date:   2019-05-09 12:07:30
 * @Last Modified by:   homer
 * @Last Modified time: 2019-05-16 17:54:45
 */

import timestamps from 'mongoose-timestamp';
import $ from '../libs/dollar';

const schema = {
  name: {
  	type: String,
  },
  desceription: {
  	type: String,
  },
  namespace: {
  	type: String,
  },
  data: {
    type: Object,
  }
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

export default $['mg'].model('Plugin', Schema);