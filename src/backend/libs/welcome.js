const figlet = require('figlet');
const config = require('../config');

//Use customer logger later
var welcome = text => {
	console.log(figlet.textSync(process.env.npm_package_name || text, {
		font: 'Standard',
		horizontalLayout: 'default',
		verticalLayout: 'default'
	}));
	console.log('version:' + process.env.npm_package_version);
	console.log('config:');
    console.dir(config,{depth: null, colors: true});
}

module.exports = welcome;