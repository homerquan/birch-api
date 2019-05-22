/*
 * @Author: homer
 * @Date:   2019-05-17 09:25:13
 * @Last Modified by:   homer
 * @Last Modified time: 2019-05-22 14:00:44
 */

import {signToken, signRefreshToken, verifyRefreshToken} from '../../auth/auth-service';
import User from '../../models/user';


export const load = schemaComposer => {
  const loginResolver = schemaComposer.createResolver({
    name: 'login',
    type: `type AuthToken { token: String, refreshToken: String }`,
    args: {
      username: 'String!',
      password: 'String!',
    },
    resolve: async ({ source, args, context, info }) => {
      // TODO validate query
      const user = await User.findOneAsync({
        email: args.username.toLowerCase(),
      });
      if (!user) {
        throw new Error('This email is not registered.');
      }
      if (user.password === user.encryptPassword(args.password)) {
        return {
          token: signToken(user._id, user.role),
          refreshToken: signRefreshToken(user._id, user.role),
        };
      } else {
        throw new Error('This password is not correct.');
      }
    },
  });

  const refreshResolver = schemaComposer.createResolver({
    name: 'refresh',
    type: `type AuthToken { token: String, refreshToken: String }`,
    args: {
      refreshToken:'String!',
    },
    resolve: async ({ source, args, context, info }) => {
      const decoded = verifyRefreshToken(args.refreshToken);
      if(!decoded) {
        throw new Error('The token is incorrect.');
      }
      const token = signToken(decoded._id, decoded.role);
      const refreshToken = signRefreshToken(decoded._id, decoded.role);
      return {
          token,
          refreshToken
      };      
    },
  });

  schemaComposer.Mutation.addFields({
    login: loginResolver,
    refresh: refreshResolver,
  });
};
