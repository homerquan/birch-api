/**
 * The Util is for thin, globally reusable, utility functions
 */
var uuid = require('node-uuid');

var genUuid = function() {
	return uuid.v1();
};

/**
 * Check object B is part of object A by properties
 * @param  {object}  objA
 * @param  {object}  objB
 * @return {Boolean}
 */
var isPartOf = function(objA, objB) {
	return _.keys(objB).map(function(key) {
		return objB[key] === objA[key];
	}).reduce(function(prev, curr) {
		return prev && curr;
	});
};

module.exports = {
	genUuid: genUuid
}