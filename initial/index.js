const company_structure = require("./company_structure");
const company = require("./company");
const role = require("./role");
const user = require("./user");
const user_role = require("./user_role");

module.exports = () => {
	company_structure();
	company();
	role();
	user();
	user_role();
};