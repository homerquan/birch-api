/*
 * System activity log
 * @Author: homer
 * @Date:   2019-05-09 12:11:20
 * @Last Modified by:   homer
 * @Last Modified time: 2019-05-16 17:58:18
 */

import timestamps from 'mongoose-timestamp';
import $ from '../libs/dollar';

const schema = {
  text: {
    type: String,
  },
  data: {
    type: Object,
  },
  type: {
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

export default $.mg.model('Activity', Schema);
