/**
 * Validator for req
 */
var expressValidator = require('express-validator');

var customValidators = {
	isArray: function(value) {
		return Array.isArray(value);
	}
};

var validator = expressValidator({
	customValidators: customValidators
});

module.exports = validator;