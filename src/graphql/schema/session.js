/*
* @Author: homer
* @Date:   2019-05-23 14:55:44
* @Last Modified by:   homer
* @Last Modified time: 2019-05-23 15:04:49
*/

import { SessionTC } from "../models/session";

export const load = schemaComposer => {
	schemaComposer.Query.addFields({
		sessionById: SessionTC.getResolver("findById"),
		sessionByIds: SessionTC.getResolver("findByIds"),
		sessionOne: SessionTC.getResolver("findOne"),
		sessionMany: SessionTC.getResolver("findMany"), // .debug(), // debug info to console for this resolver
		sessionTotal: SessionTC.getResolver("count"),
		sessionConnection: SessionTC.getResolver("connection"),
		sessionPagination: SessionTC.getResolver("pagination")
	});

	// For debug purposes you may display resolver internals in the following manner:
	// console.log(SessionTC.getResolver('findMany').toString());

	schemaComposer.Mutation.addFields({
		sessionCreate: SessionTC.getResolver("createOne"),
		sessionCreateMany: SessionTC.getResolver("createMany"),
		sessionUpdateById: SessionTC.getResolver("updateById"),
		sessionUpdateOne: SessionTC.getResolver("updateOne"),
		sessionUpdateMany: SessionTC.getResolver("updateMany"),
		sessionRemoveById: SessionTC.getResolver("removeById"),
		sessionRemoveOne: SessionTC.getResolver("removeOne"),
		sessionRemoveMany: SessionTC.getResolver("removeMany")
	});

	// add subscription here
};
