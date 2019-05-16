/*
* @Author: homer
* @Date:   2019-05-09 12:13:09
* @Last Modified by:   homer
* @Last Modified time: 2019-05-16 12:15:24
*/
import timestamps from 'mongoose-timestamp';
import $ from '../libs/dollar';

const schema = {
  context: {
    type: Object,
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

export default $['mg'].model('Session', Schema);