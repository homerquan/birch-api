/*
 * @Author: homer
 * @Date:   2019-05-09 12:06:54
 * @Last Modified by:   homer
 * @Last Modified time: 2019-05-09 22:25:02
 */

import timestamps from 'mongoose-timestamp';
import verGen from '../libs/verification.generator';
import $ from '../libs/dollar';
import util from '../libs/util';

const schema = {
  text: {
    type: String,
    index: true,
  },
  action: {
    type: String,
    index: true,
  },
  archived: {
    type: Boolean,
    default: false,
    index: true,
  },
  _client: String,
  _owner: {
    type: String,
    index: true,
  },
};

const Schema = new $.mg.Schema(schema,{
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

Schema.plugin(timestamps);

const Model = $.mg.model('notification', Schema);

export default Model;
