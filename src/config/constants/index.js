/**
 * A helper to find constants
 * e.g., foo.in('section_name').CONSTANT
 * @type {Object}
 */
module.exports = { get : (section,name) => {
        try {
        	return require(`./${section}`)[name];
        } catch (e) {
            return null;
        }
    }
}
