/*
* @Author: homer
* @Date:   2019-05-09 22:26:01
* @Last Modified by:   homer
* @Last Modified time: 2019-05-09 22:33:51
*/
import { AppTC } from "../models/app";

export const load = schemaComposer => {
	schemaComposer.Query.addFields({
		appById: AppTC.getResolver("findById"),
		appByIds: AppTC.getResolver("findByIds"),
		appOne: AppTC.getResolver("findOne"),
		appMany: AppTC.getResolver("findMany"), // .debug(), // debug info to console for this resolver
		appTotal: AppTC.getResolver("count"),
		appConnection: AppTC.getResolver("connection"),
		appPagination: AppTC.getResolver("pagination")
	});

	// For debug purposes you may display resolver internals in the following manner:
	// console.log(AppTC.getResolver('findMany').toString());
	schemaComposer.Mutation.addFields({
		appCreate: AppTC.getResolver("createOne"),
		appCreateMany: AppTC.getResolver("createMany"),
		appUpdateById: AppTC.getResolver("updateById"),
		appUpdateOne: AppTC.getResolver("updateOne"),
		appUpdateMany: AppTC.getResolver("updateMany"),
		appRemoveById: AppTC.getResolver("removeById"),
		appRemoveOne: AppTC.getResolver("removeOne"),
		appRemoveMany: AppTC.getResolver("removeMany")
	});

	// add subscription here
};