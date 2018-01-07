/*
* @Author: Homer
* @Date:   2018-01-03 23:26:26
* @Last Modified by:   Homer
* @Last Modified time: 2018-01-03 23:39:27
*/

module.exports = (request,cb) => {
	Bot.find()
		.then(items => {
			cb(null, {data:JSON.stringify(items)});
		})
		.catch(cb);
};
