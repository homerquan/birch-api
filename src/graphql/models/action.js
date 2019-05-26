/*
* @Author: homer
* @Date:   2019-05-23 15:02:51
* @Last Modified by:   homer
* @Last Modified time: 2019-05-23 15:03:14
*/
import { composeWithMongoose } from '../schemaComposer';
import Action from '../../models/action';

export const ActionTC = composeWithMongoose(Action);