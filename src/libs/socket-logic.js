/**
 * Overall socketio logic
 */

import _ from 'lodash';
import $ from './dollar';
import User from '../models/user';

/**
 * Connect logic
 */
export const connect = decodedToken => {
  if (decodedToken) {
    const userId = decodedToken._id;
    User.findByIdAndUpdateAsync(userId, { $set: { status: 'online' } });
  }
};
/**
 * Disconnect logic
 */
export const disconnect = decodedToken => {
  if (decodedToken) {
    const userId = decodedToken._id;
    User.findByIdAndUpdateAsync(userId, { $set: { status: 'offline' } });
  }
};
