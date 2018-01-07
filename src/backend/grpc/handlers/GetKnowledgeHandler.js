/*
* @Author: Homer
* @Date:   2018-01-06 00:33:41
* @Last Modified by:   Homer
* @Last Modified time: 2018-01-06 00:36:30
*/

module.exports = (request, cb) => {
	Knowledge.findOne({ bot: request.data })
		.then(item => {
			cb(null, { data: item.text });
		})
		.catch(cb);
};
