/*
 * @Author: homer
 * @Date:   2019-05-17 10:37:00
 * @Last Modified by:   homer
 * @Last Modified time: 2019-05-23 09:40:58
 */
import jwt from 'jsonwebtoken';
import config from '../config/environment';

/**
 * Returns a jwt token signed by the app secret
 */
export const signToken = (id, role) => {
  return jwt.sign({ _id: id, role }, config.secrets.session, {
    expiresIn: config.loginTokenExpireIn,
  });
};

/**
 * Returns a refresh token signed by the app secret
 */
export const signRefreshToken = (id, role) => {
  return jwt.sign({ _id: id, role }, config.secrets.session, {
    expiresIn: config.refreshTokenExpireIn,
  });
};

export const verifyRefreshToken = token => {
  return jwt.verify(token, config.secrets.session);
};
