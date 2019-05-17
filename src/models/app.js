import timestamps from 'mongoose-timestamp';
import hashids from '../libs/hashids';
import $ from '../libs/dollar';

const schema = {
  name: {
    type: String,
    min: 4,
    max: 30,
    required: true,
  },
  protocol: {
    type: String,
    default: 'auto',
    enum: ['http', 'https', 'auto'],
    required: true,
  },
  hostname: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: true,
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

export default $['mg'].model('App', Schema);
