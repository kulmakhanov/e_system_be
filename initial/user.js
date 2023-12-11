const db = require("../models");
const user = db.user;
module.exports = () => {
	user.create({
		username: "admin",
		email: "akulmakhanov@yahoo.com",
		password: "$2a$12$BYbddK2YNWDg42t55ta8Te5/8R9FiTTtCQR5UiTltgUaWjlFWb80O",
		company_id: 1,
		createdAt: new Date(),
		updatedAt: new Date(),
	});
};