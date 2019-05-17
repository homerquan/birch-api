import timestamps from 'mongoose-timestamp';
import verGen from '../libs/verification-generator';
import $ from '../libs/dollar';

const User = require('./user');

const schema = {
  token: {
    type: String,
    index: true,
    default: verGen($['config'].verificationTokenSize),
  },
  type: {
    type: String,
    index: true,
  },
  email: {
    type: String,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: $['config'].verificationExpire },
  },
  uid: String,
  used: {
    type: Boolean,
    default: false,
    index: true,
  },
};

const Schema = new $['mg'].Schema(schema);
Schema.plugin(timestamps);

export default $['mg'].model('verification', Schema);
