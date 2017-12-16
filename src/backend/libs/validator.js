/**
 * Validator for req
 */
import  expressValidator from 'express-validator';

const customValidators = {
	isArray: function(value) {
		return Array.isArray(value);
	}
};

const validator = expressValidator({
	customValidators: customValidators
});

export default validator;