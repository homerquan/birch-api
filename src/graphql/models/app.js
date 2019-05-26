/*
* @Author: homer
* @Date:   2019-05-09 22:30:20
* @Last Modified by:   homer
* @Last Modified time: 2019-05-23 15:08:34
*/
import { composeWithMongoose } from '../schemaComposer';
import App from '../../models/app';
import { SessionTC } from "./session";

export const AppTC = composeWithMongoose(App);

AppTC.addRelation('sessionConnection', {
  resolver: () => SessionTC.getResolver('connection'),
  prepareArgs: {
    filter: source => ({ _app: source.id }),
  },
  projection: { _app: true },
});