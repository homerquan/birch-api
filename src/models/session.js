/*
 * @Author: homer
 * @Date:   2019-05-09 12:13:09
 * @Last Modified by:   homer
 * @Last Modified time: 2019-05-16 18:26:36
 */
import timestamps from 'mongoose-timestamp';
import $ from '../libs/dollar';

const schema = {
  context: {
    type: Object,
  },
  status: {
    type: String,
    default: 'offline',
    enum: ['online', 'offline'],
  },
  _experience: {
    type: String,
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

export default $.mg.model('Session', Schema);
