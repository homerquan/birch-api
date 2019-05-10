/*
* @Author: homer
* @Date:   2019-05-09 14:27:18
* @Last Modified by:   homer
* @Last Modified time: 2019-05-09 17:09:18
*/

import { NotificationTC } from "../models/notification";

export const load = schemaComposer => {
	schemaComposer.Query.addFields({
		notificationById: NotificationTC.getResolver("findById"),
		notificationByIds: NotificationTC.getResolver("findByIds"),
		notificationOne: NotificationTC.getResolver("findOne"),
		notificationMany: NotificationTC.getResolver("findMany"), // .debug(), // debug info to console for this resolver
		notificationTotal: NotificationTC.getResolver("count"),
		notificationConnection: NotificationTC.getResolver("connection"),
		notificationPagination: NotificationTC.getResolver("pagination")
	});

	// For debug purposes you may display resolver internals in the following manner:
	// console.log(NotificationTC.getResolver('findMany').toString());

	schemaComposer.Mutation.addFields({
		notificationCreate: NotificationTC.getResolver("createOne"),
		notificationCreateMany: NotificationTC.getResolver("createMany"),
		notificationUpdateById: NotificationTC.getResolver("updateById"),
		notificationUpdateOne: NotificationTC.getResolver("updateOne"),
		notificationUpdateMany: NotificationTC.getResolver("updateMany"),
		notificationRemoveById: NotificationTC.getResolver("removeById"),
		notificationRemoveOne: NotificationTC.getResolver("removeOne"),
		notificationRemoveMany: NotificationTC.getResolver("removeMany")
	});

	// add subscription here
};
