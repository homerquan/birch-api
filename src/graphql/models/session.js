/*
 * @Author: homer
 * @Date:   2019-05-23 14:51:34
 * @Last Modified by:   homer
 * @Last Modified time: 2019-05-23 15:10:14
 */

import { composeWithMongoose } from '../schemaComposer';
import Session from '../../models/session';
import { ActionTC } from "./action";

export const SessionTC = composeWithMongoose(Session);

SessionTC.addRelation('actionConnection', {
  resolver: () => ActionTC.getResolver('connection'),
  prepareArgs: {
    filter: source => ({ _session: source.id }),
  },
  projection: { _session: true },
});