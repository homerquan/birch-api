/*
* @Author: homer
* @Date:   2019-05-23 15:03:33
* @Last Modified by:   homer
* @Last Modified time: 2019-05-23 15:05:10
*/

import { ActionTC } from "../models/action";

export const load = schemaComposer => {
	schemaComposer.Query.addFields({
		actionById: ActionTC.getResolver("findById"),
		actionByIds: ActionTC.getResolver("findByIds"),
		actionOne: ActionTC.getResolver("findOne"),
		actionMany: ActionTC.getResolver("findMany"), // .debug(), // debug info to console for this resolver
		actionTotal: ActionTC.getResolver("count"),
		actionConnection: ActionTC.getResolver("connection"),
		actionPagination: ActionTC.getResolver("pagination")
	});

	// For debug purposes you may display resolver internals in the following manner:
	// console.log(ActionTC.getResolver('findMany').toString());

	schemaComposer.Mutation.addFields({
		actionCreate: ActionTC.getResolver("createOne"),
		actionCreateMany: ActionTC.getResolver("createMany"),
		actionUpdateById: ActionTC.getResolver("updateById"),
		actionUpdateOne: ActionTC.getResolver("updateOne"),
		actionUpdateMany: ActionTC.getResolver("updateMany"),
		actionRemoveById: ActionTC.getResolver("removeById"),
		actionRemoveOne: ActionTC.getResolver("removeOne"),
		actionRemoveMany: ActionTC.getResolver("removeMany")
	});

	// add subscription here
};
