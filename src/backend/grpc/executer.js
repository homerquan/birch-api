/*
* @Author: Homer
* @Date:   2018-01-03 22:01:31
* @Last Modified by:   Homer
* @Last Modified time: 2018-01-06 22:57:35
*/

const ListBotsHandler = require('./handlers/ListBotsHandler')

const getCode = (code) => {
	return require('../../config/constants').get('codes',code);
}

//TODO: for large data using mongo stream

module.exports = (request,cb) => {
	if(request.typeCode == getCode('SUGGEST_RESPONSE')) {
		ListBotsHandler(request,cb)
	}
}