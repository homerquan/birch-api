const figlet = require("figlet");
const Table = require("cli-table");
const config = require("../config");
const _ = require("lodash");

//Use customer logger later
var welcome = text => {

	console.log(
		figlet.textSync(process.env.npm_package_name || text, {
			font: "Standard",
			horizontalLayout: "default",
			verticalLayout: "default"
		})
	);

	console.log("version:" + process.env.npm_package_version);

	if (config.env === "development") {
		var table = new Table({
			head: ["Key", "value"],
			colWidths: [30, 60]
		});

		console.log("Running under configuration:");
		_.mapKeys(config, function(value, key) {
			table.push({ [key]: value });
		});
		console.log(table.toString());
	}
	
};

module.exports = welcome;