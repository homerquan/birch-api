/*
* @Author: Homer
* @Date:   2018-01-04 00:23:03
* @Last Modified by:   Homer
* @Last Modified time: 2018-01-07 13:41:34
*/

import { pubsub } from "../../graphql/subscriptions"; 

module.exports = (request,cb) => {
	console.log(request);
	cb(null, { data: "ok" });
};
