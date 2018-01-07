/*
* @Author: Homer
* @Date:   2018-01-04 00:23:03
* @Last Modified by:   Homer
* @Last Modified time: 2018-01-04 00:24:19
*/

module.exports = (request,cb) => {
	Visitor.find()
		.then(items => {
			cb(null, {data:JSON.stringify(items)});
		})
		.catch(cb);
};
