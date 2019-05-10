/*
* @Author: homer
* @Date:   2019-05-09 22:30:20
* @Last Modified by:   homer
* @Last Modified time: 2019-05-09 22:31:06
*/
import { composeWithMongoose } from '../schemaComposer';
import App from '../../models/app';

export const AppTC = composeWithMongoose(App);
