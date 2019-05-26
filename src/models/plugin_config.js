/*
 * @Author: homer
 * @Date:   2019-05-09 12:12:40
 * @Last Modified by:   homer
 * @Last Modified time: 2019-05-16 18:23:01
 */

import timestamps from 'mongoose-timestamp';
import $ from '../libs/dollar';

const schema = {
  config: {
    type: Object,
  },
  _plugin: {
    type: String,
    index: true,
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

const Schema = new $.mg.Schema(schema, {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

Schema.plugin(timestamps);

export default $.mg.model('Visitor', Schema);
