/* @flow */

import { Schema, model, type ObjectId } from 'mongoose';
import { composeWithMongoose } from '../schemaComposer';
import User from '../../model/user';

export const UserTC = composeWithMongoose(User);

// Add a virutal field
UserTC.addFields({
  fullName: {
    type: 'String',
    args: {
      lang: 'String',
    },
    resolve: (source, args, context, info) => {
      // following vars have autocompletion (excepts args in Flow)
      return source.firstname+' '+source.lastname;
    },
  },
});