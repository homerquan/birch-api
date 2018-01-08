/*
* @Author: Homer
* @Date:   2018-01-04 00:23:03
* @Last Modified by:   Homer
* @Last Modified time: 2018-01-07 20:29:37
*/

import { pubsub } from "../../graphql/subscriptions"; 
import topics from "../../graphql/topics";

module.exports = (request,cb) => {
	var data=JSON.parse(request.data);
	console.log(data);
    pubsub.publish(topics['RECEIVE_SUGGESTION_TOPIC'], {createSuggestion:data, conversation:data.conversation});
	cb(null, { data: "ok" });
};
