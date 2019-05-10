/* @flow */

import { composeWithMongoose } from '../schemaComposer';
import User from '../../models/user';
import { NotificationTC } from "./notification";

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

UserTC.addRelation('notificationConnection', {
  resolver: () => NotificationTC.getResolver('connection'),
  prepareArgs: {
    filter: source => ({ _owner: source.id }),
  },
  projection: { _owner: true },
});