const db = require("../models");
const user_role = db.user_role;

module.exports = () => {
	user_role.create({
		userId: 1,
		roleId: 2,
		createdAt: new Date(),
		updatedAt: new Date(),
	});
};