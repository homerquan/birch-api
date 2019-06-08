/*
 * @Author: homer
 * @Date:   2019-05-09 14:13:33
 * @Last Modified by:   homer
 * @Last Modified time: 2019-05-09 17:35:52
 */
import { UserTC } from '../models/user';
import pubsub from '../pubsub';

export const load = schemaComposer => {
  schemaComposer.Query.addFields({
    userById: UserTC.getResolver('findById'),
    userByIds: UserTC.getResolver('findByIds'),
    userOne: UserTC.getResolver('findOne'),
    userMany: UserTC.getResolver('findMany'), // .debug(), // debug info to console for this resolver
    userTotal: UserTC.getResolver('count'),
    userConnection: UserTC.getResolver('connection'),
    userPagination: UserTC.getResolver('pagination'),
  });

  // For debug purposes you may display resolver internals in the following manner:
  // console.log(UserTC.getResolver('findMany').toString());

  schemaComposer.Mutation.addFields({
    userCreate: UserTC.getResolver('createOne'),
    userCreateMany: UserTC.getResolver('createMany'),
    userUpdateById: UserTC.getResolver('updateById'),
    userUpdateOne: UserTC.getResolver('updateOne'),
    userUpdateMany: UserTC.getResolver('updateMany'),
    userRemoveById: UserTC.getResolver('removeById'),
    userRemoveOne: UserTC.getResolver('removeOne'),
    userRemoveMany: UserTC.getResolver('removeMany'),
  });

  // add subscription here
  schemaComposer.Subscription.addFields({
    test: {
      type: 'String',
      resolve: payload => {
        return payload;
      },
      subscribe: () => pubsub.asyncIterator('test'),
    },
  });
};
