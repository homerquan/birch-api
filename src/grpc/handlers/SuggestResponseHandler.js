/*
* @Author: Homer
* @Date:   2018-01-04 00:23:03
* @Last Modified by:   Homer
* @Last Modified time: 2018-01-16 18:14:11
*/

import { pubsub } from "../../graphql/subscriptions"; 
import topics from "../../graphql/topics";
import {send as slackSend} from "../../config/slack";
module.exports = (request,cb) => {
	var data=JSON.parse(request.data);
	console.log(data);
	slackSend(data);
    pubsub.publish(topics['RECEIVE_SUGGESTION_TOPIC'], {createSuggestion:data, conversation:data.conversation});
	cb(null, { data: "ok" });
};
