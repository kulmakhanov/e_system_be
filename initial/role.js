const db = require("../models");
const role = db.role;

module.exports = () => {
	role.create({
		id: 1,
		name: "moderator",
	});
	role.create({
		id: 2,
		name: "admin",
	});
};  