import timestamps from 'mongoose-timestamp';
import crypto from 'crypto';
import base64url from 'base64url';
import $ from '../libs/dollar';

const schema = {
  name: {
    type: String,
    min: 4,
    max: 30,
    required: true,
  },
  token: {
    type: String,
    default: () => {
      return base64url(crypto.randomBytes($['config'].appTokenSize));
    },
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

const Schema = new $.mg.Schema(schema, {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

Schema.plugin(timestamps);

export default $.mg.model('App', Schema);
