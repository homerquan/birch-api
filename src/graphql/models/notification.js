/*
* @Author: homer
* @Date:   2019-05-09 17:13:21
* @Last Modified by:   homer
* @Last Modified time: 2019-05-09 17:34:30
*/
import { composeWithMongoose } from '../schemaComposer';
import Notification from '../../models/notification';

export const NotificationTC = composeWithMongoose(Notification);
